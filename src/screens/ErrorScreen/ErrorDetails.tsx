import React, { ErrorInfo } from 'react';
import { ScrollView, Text, TextStyle, View, ViewStyle } from 'react-native';

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo;
  onReset(): void;
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <ScrollView>
      <Text>{`${props.error}`.trim()}</Text>
      <Text>{`${props.errorInfo.componentStack}`.trim()}</Text>
    </ScrollView>
  );
}
