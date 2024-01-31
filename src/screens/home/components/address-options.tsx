import { TUserAddress, v_user_address } from 'greenbowl-schema';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useForm } from '../../../shared/hooks/use-form/user-form';
import { Fetcher } from '../../../shared/api/fetcher';
import { spacing } from '../../../theme/spacing';
import { colors } from '../../../theme/colors';
import { Text } from '../../../shared/ui/Text';
import { Icon } from '../../../shared/ui/icon';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { InputNumber } from '../../../shared/ui/input-number';

type AddressOptionType = {
  cancel: () => void;
  select: (address: any) => void;
  getAddress: () => {};
  addresses: TUserAddress[];
  for: 'lunch' | 'dinner';
};

export const AddressOptions = ({
  cancel,
  select,
  getAddress,
  addresses = [],
  for: _for,
}: AddressOptionType) => {
  const [formActive, setformActive] = useState(false);
  const { getRnInputProps, ...form } = useForm({
    initialValues: {
      title: null,
      pinCode: null,
      address: null,
    },
    rules: v_user_address.pick({ title: true, pinCode: true, address: true }),
  });

  useEffect(() => {
    if (!addresses.length) {
      setformActive(true);
    } else {
      setformActive(false);
    }

    return () => {};
  }, [addresses]);

  const handleAddAddress = async () => {
    try {
      if (!form.isValid) {
        return;
      }
      await Fetcher.post('/user-address', form.values);
      getAddress();
      setformActive(false);
      form.reset();
    } catch (error) {
      console.log(error, 'this is error');
    }
  };

  return (
    <ScrollView style={$container}>
      <View className="flex flex-row justify-between mb-4">
        <Text className="text-lg font-semibold">
          Choose delivery address for {_for}
        </Text>
        <Pressable onPress={cancel}>
          <Icon icon="x" size={20} />
        </Pressable>
      </View>
      <View className="text-lg flex flex-row gap-x-2 item-center mb-4">
        <Icon icon="plusCircle" size={26} />
        <Text
          onPress={() => setformActive((prev) => !prev)}
          className="text-lg"
        >
          Add new address
        </Text>
      </View>

      {formActive ? (
        <>
          <Input label="Title" {...getRnInputProps('title')} />
          <Input label="Address" {...getRnInputProps('address')} />
          <InputNumber label="Pincode" {...getRnInputProps('pinCode')} />
          <Button
            text="Add Address"
            className="w-full mt-4"
            onPress={handleAddAddress}
          />
        </>
      ) : (
        <View className="gap-y-4">
          {addresses.map((add) => {
            return (
              <Pressable key={add.id} onPress={() => select(add)}>
                <View>
                  <Text className="font-semibold text-lg">{add.title}</Text>
                  <Text>
                    {add.address}, {add.pinCode}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

const $container: ViewStyle = {
  paddingHorizontal: spacing.medium,
  backgroundColor: colors.background,
  borderTopRightRadius: spacing.borderRadius,
  borderTopLeftRadius: spacing.borderRadius,
  paddingTop: spacing.large,
  paddingBottom: spacing.massive,
};

const $spacing: ViewStyle = {
  paddingTop: spacing.large,
  alignSelf: 'stretch',
};

const $spacingLeft: TextStyle = {
  paddingLeft: spacing.small,
  textTransform: 'capitalize',
};
