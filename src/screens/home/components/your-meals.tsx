import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../shared/ui/Text';
import { Card } from '../../../shared/ui/card';
import { Icon } from '../../../shared/ui/icon';

export const YourMeals = () => {
  return (
    <View className="h-5/6 justify-center items-center">
      <Card className="p-5">
        <Text className="mb-4">YOUR MEALS</Text>
        <Card className="p-5 bg-red-200 border-0 mb-3">
          <View>
            <Text className="text-lg font-semibold ">Punjabi lunch</Text>
            <Text>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Incidunt, excepturi?
            </Text>
          </View>
          <View className="flex-row justify-between mt-3">
            <View></View>
            <View className="flex-row items-center">
              <Icon icon="skip" size={12} />
              <Text text="Skip" />
            </View>
          </View>
        </Card>
        <Card className="p-5 bg-blue-200 border-0 mt-3">
          <View>
            <Text className="text-lg font-semibold ">Green Salad</Text>
            <Text>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Incidunt, excepturi?
            </Text>
          </View>
          <View className="flex-row justify-between mt-3">
            <View></View>
            <View className="flex-row items-center">
              <Icon icon="skip" size={12} />
              <Text text="Skip" />
            </View>
          </View>
        </Card>
      </Card>
    </View>
  );
};
