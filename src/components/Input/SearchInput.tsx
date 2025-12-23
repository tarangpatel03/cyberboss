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
import { Theme } from '../../config/themes/themes';
import normalize from '../../utils/normalize/normalize';
import { appColors } from '../../config/colors/colors';
import { Dispatch, SetStateAction } from 'react';
import { appIcons } from '../../config/icons/iconPath';
import FastImage from 'react-native-fast-image';

type borderInputComponentProps = {
  placeholder: string;
  value: string;
  autoFocus?: boolean;
  icon?: ImageSourcePropType | undefined;
  onIconPress?: () => void;
  setValue: Dispatch<SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
};

export const SearchBorderInputComponent = ({
  obj,
}: {
  obj: borderInputComponentProps;
}) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View
      style={StyleSheet.flatten([
        staticStyles.container,
        styles.container,
        obj.style,
      ])}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={obj.onIconPress}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={obj.icon ?? appIcons.ic_search}
          tintColor={theme.colors.textPrimary}
          style={staticStyles.icon}
        />
      </TouchableOpacity>
      <TextInput
        autoFocus={obj.autoFocus ?? false}
        placeholder={obj.placeholder}
        autoCapitalize="none"
        style={StyleSheet.flatten([staticStyles.input, styles.input])}
        value={obj.value}
        onChangeText={obj.setValue}
        placeholderTextColor={appColors.app_8C8694}
      />
    </View>
  );
};

const staticStyles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: normalize(12),
    alignItems: 'center',
    flexDirection: 'row',
    height: normalize(40, 'height'),
    paddingHorizontal: normalize(12),
  },
  icon: {
    width: normalize(24),
    height: normalize(24),
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    fontSize: normalize(16),
    fontWeight: '400',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(8),
    justifyContent: 'center',
  },
  placeHolder: {
    position: 'absolute',
    top: normalize(0),
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
