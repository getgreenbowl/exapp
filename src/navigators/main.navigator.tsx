import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppStackParamList, AppStackScreenProps } from './app.navigator';
import { HomeScreen } from '../screens/home/home.screen';
import { Icon } from '../shared/ui/icon';
import { AnalyticsScreen } from '../screens/analytics/analytics.screen';

export type MainTabParamList = {
  home: undefined;
  analytics: undefined;
};

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainNavigator() {
  // const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Icon icon="home" color={focused ? 'grey' : 'black'} />
          ),
        }}
      />
      <Tab.Screen
        name="analytics"
        component={AnalyticsScreen}
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({ focused }) => (
            <Icon icon="analytics" color={focused ? 'grey' : 'black'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
