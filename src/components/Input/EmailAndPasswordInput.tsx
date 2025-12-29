import { useTheme } from '@shopify/restyle';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../config/themes/themes';
import normalize from '../../utils/normalize/normalize';
import { appColors } from '../../config/colors/colors';
import { Dispatch, SetStateAction, useState } from 'react';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { isDarkMode } from '../../utils/theme/darkMode';

type borderInputComponentProps = {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  secureText?: boolean;
  borderStyle?: StyleProp<ViewStyle> | null;
  showPlaceholderOnFocus?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
};

export const CustomInputComponent = ({
  borderStyle,
  placeholder,
  keyboardType,
  value,
  setValue,
  secureText,
  showPlaceholderOnFocus = true,
}: borderInputComponentProps) => {
  const [isFocus, setIsFocus] = useState(value && value.length > 0);
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View
      style={StyleSheet.flatten([
        staticStyles.container,
        styles.container,
        borderStyle,
      ])}
    >
      {showPlaceholderOnFocus && (isFocus || value.length !== 0) && (
        <RegularTextComponent
          textStyle={StyleSheet.flatten([
            staticStyles.placeHolder,
            styles.placeHolder,
            borderStyle,
          ])}
          text={placeholder}
        />
      )}
      <TextInput
        placeholder={isFocus ? '' : placeholder}
        style={StyleSheet.flatten([
          staticStyles.input,
          styles.input,
          borderStyle,
        ])}
        autoCapitalize="none"
        keyboardType={keyboardType}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => setIsFocus(false)}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureText ? secureText : false}
        placeholderTextColor={
          isDarkMode(theme) ? appColors.app_FFFFFF : appColors.app_212121
        }
      />
    </View>
  );
};

const staticStyles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: normalize(12),
    height: normalize(50),
    paddingHorizontal: normalize(12),
  },
  input: {
    paddingHorizontal: normalize(0),
    paddingTop: normalize(20),
    justifyContent: 'center',
  },
  placeHolder: {
    position: 'absolute',
    top: normalize(-1),
    fontSize: normalize(12),
    fontWeight: '400',
    left: normalize(12),
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
