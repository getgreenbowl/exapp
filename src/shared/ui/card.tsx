import React from 'react';
import { View } from 'react-native';
import { cn } from '../utils/cn';
import { Text } from './Text';

export const Card = ({ className, ...props }: any) => {
  return (
    <View
      className={cn(
        'rounded border border-slate-200 text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  );
};

export const CardHeader = ({ className, text, ...props }: any) => {
  const children = props.children || <Text className="text-lg">{text}</Text>;
  return (
    <View className={cn('flex flex-col space-y-1.5 p-5', className)} {...props}>
      {children}
    </View>
  );
};

export const CardTitle = ({ className, ...props }: any) => {
  return (
    <Text
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  );
};

export const CardDescription = ({ className, ...props }: any) => {
  return (
    <Text
      className={cn('text-md text-muted-foreground', className)}
      {...props}
    />
  );
};

export const CardContent = ({ className, ...props }: any) => {
  return <View className={cn('p-6 pt-0', className)} {...props} />;
};

export const CardFooter = ({ className, ...props }: any) => {
  return (
    <View className={cn('flex items-center p-6 pt-0', className)} {...props} />
  );
};
