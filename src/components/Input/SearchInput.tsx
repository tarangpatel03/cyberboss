import { useTheme } from '@shopify/restyle';
import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';
import { Dispatch, SetStateAction } from 'react';
import FastImage from 'react-native-fast-image';
import { Config } from '@config/index';

type BorderInputComponentProps = {
  placeholder: string;
  value: string;
  autoFocus?: boolean;
  icon?: ImageSourcePropType | undefined;
  onIconPress?: () => void;
  setValue: Dispatch<SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
};

export const SearchBorderInputComponent = (
  props: BorderInputComponentProps,
) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View
      style={StyleSheet.flatten([
        staticStyle.container,
        styles.container,
        props.style,
      ])}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={props.onIconPress}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={props.icon ?? Config.appIcons.ic_search}
          tintColor={theme.colors.textPrimary}
          style={staticStyle.icon}
        />
      </TouchableOpacity>
      <TextInput
        autoFocus={props.autoFocus ?? false}
        placeholder={props.placeholder}
        autoCapitalize="none"
        style={StyleSheet.flatten([staticStyle.input, styles.input])}
        value={props.value}
        onChangeText={props.setValue}
        placeholderTextColor={Config.appColors.app_8C8694}
      />
    </View>
  );
};

const staticStyle = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: Utils.normalize(12),
    alignItems: 'center',
    flexDirection: 'row',
    height: Utils.normalize(40, 'height'),
    paddingHorizontal: Utils.normalize(12),
  },
  icon: {
    width: Utils.normalize(24),
    height: Utils.normalize(24),
  },
  input: {
    width: '100%',
    fontSize: Utils.normalize(16),
    fontWeight: '400',
    paddingHorizontal: Utils.normalize(12),
    paddingVertical: Utils.normalize(8),
    justifyContent: 'center',
  },
  placeHolder: {
    position: 'absolute',
    top: Utils.normalize(0),
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
