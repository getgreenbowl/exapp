import React, { useState } from 'react';
import { Text } from '../../../shared/ui/Text';
import { Screen } from '../../../shared/ui/screen';
import { colors } from '../../../theme/colors';
import { Platform, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { spacing } from '../../../theme/spacing';
import { useCurrentUser } from '../../../shared/hooks/use-current-user';
import { AddressOptions } from './address-options';
import { TUserAddress } from 'greenbowl-schema';
import { Icon } from '../../../shared/ui/icon';
import { Badge } from '../../../shared/ui/badge';
import { Button } from '../../../shared/ui/button';
import Toast from 'react-native-toast-message';
import { Fetcher } from '../../../shared/api/fetcher';
import BaseApi from '../../../shared/api/base';
import DateTimePicker from '@react-native-community/datetimepicker';
export const InitialForm = () => {
  const [showAddress, setshowAddress] = useState(false);
  const currentUser = useCurrentUser();
  const [address, setadress] = useState<{
    lunch?: TUserAddress | null;
    dinner?: TUserAddress | null;
  }>({
    lunch: null,
    dinner: null,
  });
  const [openAddressFor, setOpenAddressFor] = useState<'lunch' | 'dinner'>(
    'lunch'
  );
  const [preference, setpreference] = useState({ lunch: true, dinner: true });
  const [addresses, setaddresses] = useState<TUserAddress[]>([]);
  const [showDate, setShowDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const closeSheet = () => {
    setshowAddress(false);
  };

  const selectAddress = (add: TUserAddress) => {
    setadress((prev) => ({ ...prev, [openAddressFor]: add }));
    closeSheet();
  };

  const getAddress = async () => {
    try {
      const { data } = await Fetcher.get<TUserAddress[]>('/user-address');
      setaddresses([...data.data]);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const openAddressSelection = (openFor: 'lunch' | 'dinner') => {
    if (!addresses.length) {
      getAddress();
    }
    setshowAddress(true);
    setOpenAddressFor(openFor);
  };

  const confirmPurchase = async () => {
    try {
      if (preference.lunch && !address.lunch) {
        Toast.show({
          type: 'success',
          text1: 'ERROR',
          text2: 'Please select address for Lunch',
          position: 'bottom',
        });
        return;
      }
      if (preference.dinner && !address.dinner) {
        Toast.show({
          type: 'error',
          text1: 'ERROR',
          text2: 'Please select address for Dinner',
          position: 'bottom',
        });
        return;
      }
      console.log(address, 'check me');

      const { data } = await BaseApi.post('/subscription/new', address);
      console.log(address, 'address');

      Toast.show({
        type: 'success',
        text1: 'Subscribed!',
        text2: 'You have subscribed successfully',
        position: 'bottom',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event: any, selectedDate: any) => {
    if (Platform.OS === 'android') {
      setShowDate(false);
    }

    if (event.type === 'neutralButtonPressed') {
      setStartDate(new Date(0));
    } else {
      setStartDate(selectedDate);
    }
  };

  return (
    <>
      <View className="flex flex-col justify-between h-full">
        <View>
          <View className="mt-7">
            <View className="flex flex-row gap-x-1.5">
              <Icon icon="calendar" size={16} className="mt-1" />
              <Text className="text-xl font-medium">Select preferences</Text>
            </View>
            <View className="flex flex-row mt-3 gap-x-4">
              <Badge
                variant={'outline'}
                className="px-3 py-0.5 flex flex-row items-center"
                onPress={() =>
                  setpreference((pref) => ({ ...pref, lunch: !pref.lunch }))
                }
              >
                <Text className="text-[17px] mr-2">Lunch</Text>
                {preference.lunch ? <Icon icon="check" size={18} /> : null}
              </Badge>
              <Badge
                className="px-3 py-0.5 flex flex-row items-center"
                variant={'outline'}
                onPress={() =>
                  setpreference((pref) => ({ ...pref, dinner: !pref.dinner }))
                }
              >
                <Text className="text-[17px] mr-2">Dinner</Text>
                {preference.dinner ? <Icon icon="check" size={18} /> : null}
              </Badge>
            </View>
          </View>

          {preference.lunch || preference.dinner ? (
            <View className="mt-8">
              <View className="flex flex-row gap-x-1.5 mb-3">
                <Icon icon="home" size={16} className="mt-1" />
                <Text className="text-xl font-medium">
                  Choose delivery address
                </Text>
              </View>
              <View className="flex flex-column gap-y-3">
                {preference.lunch ? (
                  <Badge
                    variant={'outline'}
                    className="items-start flex flex-column"
                    onPress={() => openAddressSelection('lunch')}
                  >
                    <View className="flex flex-row items-center justify-center">
                      <Text className="text-[17px] mr-2">
                        Select address for lunch
                      </Text>
                      <Icon icon="caretRight" size={16} />
                    </View>
                    {address.lunch?.title ? (
                      <Text className="font-semibold text-lg">
                        selected: {address.lunch?.title}
                      </Text>
                    ) : null}
                  </Badge>
                ) : null}

                {preference.dinner ? (
                  <Badge
                    variant={'outline'}
                    className="items-start flex flex-column"
                    onPress={() => openAddressSelection('dinner')}
                  >
                    <View className="flex flex-row items-center justify-center">
                      <Text className="text-[17px] mr-2">
                        Select address for dinner
                      </Text>
                      <Icon icon="caretRight" size={16} />
                    </View>
                    {address.dinner?.title ? (
                      <Text className="font-semibold text-lg">
                        selected: {address.dinner?.title}
                      </Text>
                    ) : null}
                  </Badge>
                ) : null}
              </View>
            </View>
          ) : null}
          <View className="flex flex-row gap-x-1.5 mt-8">
            <Icon icon="calendar" size={16} className="mt-1" />
            <Text className="text-xl font-medium">Select start date</Text>
          </View>
          <Badge
            variant={'outline'}
            className="mt-3"
            onPress={() => setShowDate(true)}
          >
            <View className="flex flex-row items-center justify-center">
              <Text className="text-[17px] mr-2">Select subscription</Text>
              <Icon icon="caretRight" size={16} />
            </View>
            {startDate ? (
              <Text className="font-semibold text-lg">
                selected: {startDate.toLocaleDateString()}
              </Text>
            ) : null}
          </Badge>

          <View className="mt-5">
            <Text className="text-muted-foreground">
              Note: You will be charged on last date of month. You can
              skip/cancel the meals 3 hours prior to delivery from the app.
            </Text>
          </View>
          {showDate ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              is24Hour
              negativeButton={{ label: 'Cancel', textColor: 'red' }}
              onChange={onChange}
            />
          ) : null}
        </View>

        {preference.dinner || preference.lunch ? (
          <Button
            text="CONFIRM"
            textClass="tracking-wide"
            className="w-full mt-10"
            onPress={confirmPurchase}
          />
        ) : null}
      </View>

      <Modal
        isVisible={showAddress}
        className="flex-1 items-end flex-row m-0"
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setshowAddress(false)}
        onBackButtonPress={() => setshowAddress(false)}
        animationInTiming={100}
        animationOutTiming={50}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionInTiming={50}
        useNativeDriverForBackdrop
        hideModalContentWhileAnimating
        useNativeDriver={true}
      >
        <AddressOptions
          select={selectAddress}
          cancel={closeSheet}
          for={openAddressFor}
          getAddress={getAddress}
          addresses={addresses}
        />
      </Modal>
    </>
  );
};
