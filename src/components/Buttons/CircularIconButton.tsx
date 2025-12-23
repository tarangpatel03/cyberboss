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
  obj,
  ref,
}: {
  obj: circularIconButtonProps;
  ref?: RefObject<View | null>;
}) => {
  return (
    <TouchableOpacity
      ref={ref}
      activeOpacity={0.7}
      style={obj.buttonStyle}
      onPress={obj.onPress}
    >
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        tintColor={obj.tintColor}
        source={obj.iconPath}
        style={obj.iconStyle}
      />
    </TouchableOpacity>
  );
};
