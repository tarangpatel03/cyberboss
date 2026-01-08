import { useTheme } from '@shopify/restyle';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { Theme } from '@config/themes/themes';
import {Utils} from '@utils/index';
import { Dispatch, SetStateAction, useState } from 'react';
import { Components } from '@components/index';
import { Config } from '@config/index';

type BorderInputComponentProps = {
  placeholder: string;
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
  secureText?: boolean;
  borderStyle?: StyleProp<ViewStyle> | null;
  onSubmit?: (serviceText: string) => void;
  showPlaceholderOnFocus?: boolean;
};

export const BorderInput = ({
  borderStyle,
  placeholder,
  value,
  setValue,
  secureText,
  onSubmit,
  showPlaceholderOnFocus = true,
}: BorderInputComponentProps) => {
  const [isFocus, setIsFocus] = useState(value && value.length > 0);
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View
      style={StyleSheet.flatten([
        staticStyle.container,
        styles.container,
        borderStyle,
      ])}
    >
      {showPlaceholderOnFocus && isFocus && (
        <Components.TextComponent
          family={'regular'}
          textStyle={StyleSheet.flatten([
            staticStyle.placeHolder,
            styles.placeHolder,
            borderStyle,
          ])}
          text={placeholder}
        />
      )}
      <TextInput
        placeholder={!isFocus ? placeholder : ''}
        style={StyleSheet.flatten([
          staticStyle.input,
          styles.input,
          borderStyle,
        ])}
        autoCapitalize="none"
        onSubmitEditing={() => (onSubmit ? onSubmit(value ?? '') : null)}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => setIsFocus(false)}
        value={value ?? ''}
        onChangeText={setValue}
        secureTextEntry={secureText ? secureText : false}
        placeholderTextColor={
          Utils.isDarkMode(theme) ? Config.appColors.app_FFFFFF : Config.appColors.app_212121
        }
      />
    </View>
  );
};

const staticStyle = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: Utils.normalize(12),
    height: Utils.normalize(50),
    paddingHorizontal: Utils.normalize(12),
  },
  input: {
    paddingHorizontal: Utils.normalize(0),
    paddingTop: Utils.normalize(20),
    justifyContent: 'center',
  },
  placeHolder: {
    position: 'absolute',
    top: Utils.normalize(-1),
    fontSize: Utils.normalize(12),
    fontWeight: '400',
    left: Utils.normalize(12),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderColor: theme.colors.borderPrimary,
    },
    input: {
      color: theme.colors.textPrimary,
    },
    placeHolder: {
      color: theme.colors.textPrimary,
    },
  });
