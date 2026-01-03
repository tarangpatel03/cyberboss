import { useTheme } from '@shopify/restyle';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../config/themes/themes';
import normalize from '../../utils/normalize/normalize';
import { appColors } from '../../config/colors/colors';
import { Dispatch, SetStateAction, useState } from 'react';
import { RegularTextComponent } from '../Text/RegularText';
import { isDarkMode } from '../../utils/theme/darkMode';
import { appImages } from '../../config/images/imagePath';
import FastImage from 'react-native-fast-image';

type MultiLineInputComponentProps = {
  placeholder: string;
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
  secureText?: boolean;
  borderStyle?: StyleProp<ViewStyle> | null;
  onSubmit?: (serviceText: string) => void;
  isNotBio?: boolean;
};

export const BioInputComponent = (props: MultiLineInputComponentProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View
      style={StyleSheet.flatten([
        staticStyles.container,
        styles.container,
        props.borderStyle,
      ])}
    >
      {isFocus && (
        <RegularTextComponent
          textStyle={StyleSheet.flatten([
            staticStyles.placeHolder,
            styles.placeHolder,
            props.borderStyle,
          ])}
          text={props.placeholder}
        />
      )}
      <TextInput
        placeholder={!isFocus ? props.placeholder : ''}
        multiline={true}
        style={StyleSheet.flatten([
          staticStyles.input,
          props.isNotBio && staticStyles.boiInput,
          styles.input,
          props.borderStyle,
        ])}
        autoCapitalize="none"
        onSubmitEditing={() =>
          props.onSubmit ? props.onSubmit(props.value ?? '') : null
        }
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => setIsFocus(false)}
        value={props.value ?? ''}
        onChangeText={props.setValue}
        secureTextEntry={props.secureText ? props.secureText : false}
        placeholderTextColor={
          isDarkMode(theme) ? appColors.app_FFFFFF : appColors.app_212121
        }
      />
      <TouchableOpacity activeOpacity={0.7} style={staticStyles.askAi}>
        <FastImage source={appImages.img_askAi} style={staticStyles.askAi} />
      </TouchableOpacity>
    </View>
  );
};

const staticStyles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: normalize(12),
    minHeight: normalize(80),
    paddingHorizontal: normalize(6),
  },
  input: {
    left: 3,
    fontSize: normalize(14),
    fontWeight: '400',
  },
  boiInput: {
    top: normalize(-20),
  },
  placeHolder: {
    top: normalize(0),
    fontSize: normalize(12),
    fontWeight: '400',
    left: normalize(8),
  },
  askAi: {
    width: normalize(76),
    height: normalize(27),
    position: 'absolute',
    bottom: normalize(4),
    right: normalize(4),
    paddingBottom: normalize(8),
    resizeMode: 'contain',
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
