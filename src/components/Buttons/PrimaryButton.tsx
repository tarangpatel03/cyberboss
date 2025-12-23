import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { Theme } from '../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import normalize from '../../utils/normalize/normalize';

type primaryButtonComponenProps = {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  isButtonActive?: boolean;
};

export const PrimaryButtonComponent = ({
  obj,
}: {
  obj: primaryButtonComponenProps;
}) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      disabled={obj.isButtonActive || false}
      activeOpacity={0.7}
      style={StyleSheet.flatten([
        staticStyles.button,
        styles.button,
        obj.buttonStyle,
      ])}
      onPress={obj.onPress}
    >
      <MediumTextComponent
        text={obj.text}
        textStyle={StyleSheet.flatten([
          staticStyles.text,
          styles.text,
          obj.textStyle,
        ])}
      />
    </TouchableOpacity>
  );
};

const staticStyles = StyleSheet.create({
  button: {
    borderRadius: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(36, 'height'),
  },
  text: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
});
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.pureWhite,
    },
    button: {
      backgroundColor: theme.colors.primary,
    },
  });
