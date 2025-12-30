import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { Theme } from '../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import { appIcons } from '../../config/icons/iconPath';
import normalize from '../../utils/normalize/normalize';
import FastImage from 'react-native-fast-image';

type settingOptionsButtonProps = {
  title: string;
  icon: number | { uri: string } | undefined;
  navigate: () => void;
};

export const SettingOptionsButton = ({
  icon,
  navigate,
  title,
}: settingOptionsButtonProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={navigate}
      style={staticStyle.container}
    >
      <View style={staticStyle.mainContainer}>
        <View
          style={StyleSheet.flatten([
            staticStyle.iconContainer,
            styles.iconContainer,
          ])}
        >
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={icon}
            style={staticStyle.icon}
          />
        </View>
        <RegularTextComponent
          text={title}
          textStyle={StyleSheet.flatten([staticStyle.text, styles.primaryText])}
        />
      </View>
      <FastImage
        style={staticStyle.nextIcon}
        resizeMode={FastImage.resizeMode.contain}
        tintColor={theme.colors.textSecondary}
        source={appIcons.ic_rightArrow}
      />
    </TouchableOpacity>
  );
};

const staticStyle = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: normalize(8),
  },
  mainContainer: {
    flexDirection: 'row',
    gap: normalize(12),
  },
  text: {
    fontSize: normalize(16),
    fontWeight: '400',
  },
  iconContainer: {
    width: normalize(28),
    alignItems: 'center',
    height: normalize(28),
    justifyContent: 'center',
    borderRadius: normalize(20),
  },
  icon: {
    width: normalize(16),
    height: normalize(16),
  },
  nextIcon: {
    width: normalize(7),
    height: normalize(14),
    borderRadius: normalize(20),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.textSecondary,
    },
    primaryText: {
      color: theme.colors.textPrimary,
    },
    icon: {
      tintColor: theme.colors.textSecondary,
    },
    iconContainer: {
      backgroundColor: theme.colors.borderPrimary,
    },
  });
