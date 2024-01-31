import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { Pressable, PressableProps, Text } from 'react-native';
import { styled } from 'nativewind';

const buttonVariants = cva(
  'inline-flex self-start items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary-500',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariant = cva('', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructuve-foreground',
      outline: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-black',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'text-lg',
      sm: 'text-md',
      lg: 'text-xl',
      icon: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  className?: string;
  text: string;
  textClass?: string;
}

const Button = React.forwardRef<PressableProps, ButtonProps>(
  ({ className, variant, size, text, textClass, ...props }, ref) => {
    const ButtonText = styled(Text, 'text-primary-foreground text-lg');

    return (
      <Pressable
        {...props}
        className={cn(buttonVariants({ className, variant, size }))}
      >
        <Text
          className={cn(
            buttonTextVariant({ variant, size, className: textClass })
          )}
        >
          {text}
        </Text>
      </Pressable>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
