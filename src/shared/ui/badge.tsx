import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { Pressable, View, ViewProps } from 'react-native';

const badgeVariants = cva(
  'inline-flex self-start items-center rounded border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
      size: {
        sm: 'px-2.5 py-0.5',
        md: 'px-3 py-1',
        lg: 'px-3.5 py-1.5',
        xl: 'px-4 py-2',
        '2xl': 'px-4.5 py-2.5',
        '3xl': 'px-5 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export interface BadgeProps
  extends ViewProps,
    VariantProps<typeof badgeVariants> {
  onPress?: any;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  if (props.onPress) {
    return (
      <Pressable onPress={props.onPress}>
        <View
          className={cn(badgeVariants({ variant }), className)}
          {...props}
        />
      </Pressable>
    );
  }
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
