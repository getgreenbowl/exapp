import React from 'react';
import { ToastAndroid, View } from 'react-native';
import { useForm } from '../../shared/hooks/use-form/user-form';
import { v_user } from 'greenbowl-schema';
import { loginUser } from '../../shared/api/auth/auth.api';
import { Storage } from '../../shared/utils/storage';
import { Screen } from '../../shared/ui/screen';
import Logo from '../../shared/ui/logo';
import { InputNumber } from '../../shared/ui/input-number';
import { Input } from '../../shared/ui/input';
import { Text } from '../../shared/ui/Text';
import { Button } from '../../shared/ui/button';
import { authStore } from '../../store/auth.store';

export const LoginScreen = () => {
  const { getRnInputProps, ...form } = useForm({
    initialValues: {
      mobile: null,
      password: null,
    },
    rules: v_user.pick({ mobile: true, password: true }),
  });

  const { changeAuthentication } = authStore();

  const login = async () => {
    try {
      const valid = form.validate();
      if (!valid) {
        return;
      }

      const { data } = await loginUser(form.values);
      form.reset();

      Storage.set('token', data.data.token);
      Storage.set('user', data.data.user);
      changeAuthentication(true);
    } catch (error: any) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  return (
    <Screen
      preset="auto"
      safeAreaEdges={['top', 'bottom']}
      className="py-5 px-3"
    >
      <View className="flex mb-7">
        <Logo />
        {/* <Text className="text-3xl tracking-widest pl-2">greenbowl</Text> */}
        <View className="mt-5">
          <Text className="text-3xl">Greenbowl</Text>
          <Text className="text-xl mt-2">
            Welcome back. Login to your account.
          </Text>
        </View>
      </View>
      <View className="py-3">
        <InputNumber
          label="Mobile No."
          {...getRnInputProps('mobile')}
          placeholder="Enter your mobile number"
        />
        <Input
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={true}
          label="Password"
          {...getRnInputProps('password')}
          placeholder="Enter your password"
        />
      </View>
      <Button text="Login" className="w-full" onPress={login} />
    </Screen>
  );
};
