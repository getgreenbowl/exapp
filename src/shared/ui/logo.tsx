import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Text } from './Text';

function Logo() {
  return (
    <View style={logoContainer$}>
      <Text className="text-xl text-white" text="gb" style={logoText$} />
    </View>
  );
}

const logoContainer$: ViewStyle = {
  width: 50,
  height: 50,
  backgroundColor: '#064e3b',
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
};

const logoText$: TextStyle = { color: 'white', fontSize: 27 };

export default Logo;
