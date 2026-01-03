import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { MediumTextComponent } from '@components/Text/MediumText';
import normalize from '@utils/normalize/normalize';
import { appColors } from '@config/colors/colors';
import FastImage from 'react-native-fast-image';

type PrimaryButtonWithIconComponentProps = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  buttonStyle: StyleProp<ViewStyle>;
  icon?: number | { uri: string } | undefined;
  onPress: () => void;
};

export const PrimaryButtonWithIconComponent = (
  props: PrimaryButtonWithIconComponentProps,
) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={props.buttonStyle}
      onPress={props.onPress}
    >
      <MediumTextComponent text={props.text} textStyle={props.textStyle} />
      <FastImage source={props.icon} style={styles.iconStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: normalize(16),
    height: normalize(16),
    position: 'absolute',
    right: normalize(16),
    tintColor: appColors.app_FFFFFF,
  },
});
