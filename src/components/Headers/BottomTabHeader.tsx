import { useTheme } from '@shopify/restyle';
import { Theme } from '../../config/themes/themes';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import normalize from '../../utils/normalize/normalize';
import { appIcons } from '../../config/icons/iconPath';
import { appColors } from '../../config/colors/colors';
import FastImage from 'react-native-fast-image';

type bottomTabHeaderProp = {
  name: string;
  onPress: () => void;
};

export const BottomTabHeader = ({ name, onPress }: bottomTabHeaderProp) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={StyleSheet.flatten([staticStyle.container, styles.container])}>
      <MediumTextComponent
        text={name}
        textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
      />
      <TouchableOpacity onPress={onPress}>
        <FastImage
          source={appIcons.ic_notificationBell}
          tintColor={theme.colors.textPrimary}
          style={staticStyle.icon}
        />
        <View
          style={StyleSheet.flatten([
            staticStyle.notificationDot,
            styles.container,
          ])}
        >
          <View style={staticStyle.notificatinDotInner} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const staticStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(12),
  },
  title: {
    fontSize: normalize(20),
    fontWeight: '500',
  },
  icon: {
    width: normalize(20),
    height: normalize(20),
  },
  notificationDot: {
    top: 0,
    right: 0,
    zIndex: 10,
    width: normalize(8),
    height: normalize(8),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(5),
  },
  notificatinDotInner: {
    width: normalize(5),
    height: normalize(5),
    borderRadius: normalize(5),
    backgroundColor: appColors.app_F20000,
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    title: {
      color: theme.colors.textPrimary,
    },
  });
