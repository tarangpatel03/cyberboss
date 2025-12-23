import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import normalize from '../../utils/normalize/normalize';
import { appColors } from '../../config/colors/colors';
import FastImage from 'react-native-fast-image';

type primaryButtonWithIconComponentProps = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  buttonStyle: StyleProp<ViewStyle>;
  icon?: number | { uri: string } | undefined;
  onPress: () => void;
};

export const PrimaryButtonWithIconComponent = ({
  obj,
}: {
  obj: primaryButtonWithIconComponentProps;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={obj.buttonStyle}
      onPress={obj.onPress}
    >
      <MediumTextComponent text={obj.text} textStyle={obj.textStyle} />
      <FastImage source={obj.icon} style={styles.iconStyle} />
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
