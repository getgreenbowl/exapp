import React from 'react';
import { useCurrentUser } from '../../shared/hooks/use-current-user';
import { InitialForm } from './components/initial-form';
import { Text } from '../../shared/ui/Text';
import { Screen } from '../../shared/ui/screen';
import { colors } from '../../theme/colors';
import { ViewStyle } from 'react-native';
import { spacing } from '../../theme/spacing';
import { YourMeals } from './components/your-meals';

export const HomeScreen = () => {
  const currentUser = useCurrentUser();

  return (
    <>
      <Screen
        preset="scroll"
        StatusBarProps={{
          backgroundColor: colors.background,
          style: 'dark',
        }}
        safeAreaEdges={['top']}
        contentContainerStyle={$container}
      >
        <Text className="text-2xl">Hi, {currentUser?.name}</Text>
        <Text className="text-md mt-2 text-muted-foreground">
          Don't forget to drink water today :)
        </Text>
        {/* <InitialForm /> */}
        <YourMeals />
      </Screen>
    </>
  );
};

const $container: ViewStyle = {
  paddingVertical: spacing.large + spacing.extraLarge,
  paddingHorizontal: spacing.large,
  backgroundColor: colors.background,
  minHeight: '100%',
};
