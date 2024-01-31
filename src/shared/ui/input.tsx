import React from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { cn } from '../utils/cn';
import { VariantProps, cva } from 'class-variance-authority';

const InputVariant = cva(
  'flex border border-input rounded text-lg px-3 py-3 ring-offset-2 focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      errored: {
        true: 'border-red-700',
        false: 'border-input',
      },
    },
    defaultVariants: {
      errored: false,
    },
  }
);

export interface InputProps
  extends TextInputProps,
    VariantProps<typeof InputVariant> {
  className?: string;
  label?: string;
  error: string;
}

export const Input = ({ className, label, error, ...props }: InputProps) => {
  return (
    <View className="my-2">
      <Text className="text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pb-1 pl-1">
        {label} {}
        <Text className="text-red-700">*</Text>
      </Text>
      <TextInput
        {...props}
        className={cn(InputVariant({ className, errored: !!error }))}
      />
      {error ? <Text className="text-red-700">{error}</Text> : null}
    </View>
  );
};
