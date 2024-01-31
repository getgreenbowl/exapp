import * as React from 'react';
import { ComponentType } from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

export type IconTypes = keyof typeof iconRegistry;

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes;

  /**
   * An optional tint color for the icon
   */
  color?: string;

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number;

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps['onPress'];
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size = 20,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const Wrapper: any = WrapperProps?.onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      accessibilityRole={isPressable ? 'imagebutton' : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image
        source={iconRegistry[icon]}
        style={[$imageStyle, { width: size, height: size }, props.style]}
      />
    </Wrapper>
  );
}

export const iconRegistry = {
  back: require('../../../assets/icons/back.png'),
  bell: require('../../../assets/icons/bell.png'),
  caretLeft: require('../../../assets/icons/caretLeft.png'),
  caretRight: require('../../../assets/icons/caretRight.png'),
  check: require('../../../assets/icons/check.png'),
  clap: require('../../../assets/icons/clap.png'),
  community: require('../../../assets/icons/community.png'),
  components: require('../../../assets/icons/components.png'),
  debug: require('../../../assets/icons/debug.png'),
  github: require('../../../assets/icons/github.png'),
  heart: require('../../../assets/icons/heart.png'),
  hidden: require('../../../assets/icons/hidden.png'),
  ladybug: require('../../../assets/icons/ladybug.png'),
  lock: require('../../../assets/icons/lock.png'),
  menu: require('../../../assets/icons/menu.png'),
  more: require('../../../assets/icons/more.png'),
  pin: require('../../../assets/icons/pin.png'),
  podcast: require('../../../assets/icons/podcast.png'),
  settings: require('../../../assets/icons/settings.png'),
  slack: require('../../../assets/icons/slack.png'),
  view: require('../../../assets/icons/view.png'),
  x: require('../../../assets/icons/x.png'),
  location: require('../../../assets/icons/location.png'),
  calendar: require('../../../assets/icons/calendar.png'),
  mealFastFood: require('../../../assets/icons/meal-fast-food.png'),
  plusCircle: require('../../../assets/icons/plus-circle.png'),
  home: require('../../../assets/icons/home.png'),
  work: require('../../../assets/icons/briefcase.png'),
  edit: require('../../../assets/icons/edit.png'),
  analytics: require('../../../assets/icons/analytics.png'),
  star: require('../../../assets/icons/star.png'),
  add: require('../../../assets/icons/add.png'),
  delete: require('../../../assets/icons/delete.png'),
  swap: require('../../../assets/icons/swap.png'),
  skip: require('../../../assets/icons/skip.png'),
  leaf: require('../../../assets/icons/leaf.png'),
};

const $imageStyle: ImageStyle = {
  resizeMode: 'contain',
};
