import { RefObject } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';

type circularIconButtonProps = {
  iconPath: number | { uri: string } | undefined;
  iconStyle: StyleProp<ImageStyle>;
  tintColor?: string;
  buttonStyle: StyleProp<ViewStyle>;
  onPress: () => void;
};

export const CircularIconButtonComponent = ({
  props,
  ref,
}: {
  props: circularIconButtonProps;
  ref?: RefObject<View | null>;
}) => {
  return (
    <TouchableOpacity
      ref={ref}
      activeOpacity={0.7}
      style={props.buttonStyle}
      onPress={props.onPress}
    >
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        tintColor={props.tintColor}
        source={props.iconPath}
        style={props.iconStyle}
      />
    </TouchableOpacity>
  );
};
