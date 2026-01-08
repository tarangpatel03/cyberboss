import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Components } from '@components/index';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import {Utils} from '@utils/index';

type PrimaryButtonComponentProps = {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  isButtonActive?: boolean;
};

export const PrimaryButton = (props: PrimaryButtonComponentProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      disabled={props.isButtonActive || false}
      activeOpacity={0.7}
      style={StyleSheet.flatten([
        staticStyle.button,
        styles.button,
        props.buttonStyle,
      ])}
      onPress={props.onPress}
    >
      <Components.TextComponent
        text={props.text}
        family={'medium'}
        textStyle={StyleSheet.flatten([
          staticStyle.text,
          styles.text,
          props.textStyle,
        ])}
      />
    </TouchableOpacity>
  );
};

const staticStyle = StyleSheet.create({
  button: {
    borderRadius: Utils.normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    height: Utils.normalize(36, 'height'),
  },
  text: {
    fontSize: Utils.normalize(16),
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
