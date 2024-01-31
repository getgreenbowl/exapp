import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import Config from '../config';
import { MainNavigator, MainTabParamList } from './main.navigator';
import { navigationRef, useBackButtonHandler } from './navigationUtilities';
import { LoginScreen } from '../screens/auth';
import { authStore } from '../store/auth.store';

export type AppStackParamList = {
  Login: undefined;
  main: NavigatorScreenParams<MainTabParamList>;
};

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = function AppStack() {
  const { authenticated } = authStore();
  console.log(authenticated);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={authenticated ? 'main' : 'Login'}
    >
      {authenticated ? (
        <Stack.Screen name="main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme();

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  );
};
