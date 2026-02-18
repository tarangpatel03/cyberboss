import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Components } from '@components/index';
import { Utils } from '@utils/index';
import { Config } from '@config/index';
import FastImage from 'react-native-fast-image';

type BottomTabHeaderProp = {
  name: string;
  onPress: () => void;
};

export const BottomTabHeader = ({ name, onPress }: BottomTabHeaderProp) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={StyleSheet.flatten([staticStyle.container, styles.container])}>
      <Components.TextComponent
        family={'medium'}
        text={name}
        textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
      />
      <TouchableOpacity onPress={onPress}>
        <FastImage
          source={Config.appIcons.ic_notificationBell}
          tintColor={theme.colors.textPrimary}
          style={staticStyle.icon}
        />
        {/* <View
                    style={StyleSheet.flatten([
                        staticStyle.notificationDot,
                        styles.container,
                    ])}
                >
                    <View style={staticStyle.notificationDotInner} />
                </View> */}
      </TouchableOpacity>
    </View>
  );
};

const staticStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Utils.normalize(12),
  },
  title: {
    fontSize: Utils.normalize(20),
    fontWeight: '500',
  },
  icon: {
    width: Utils.normalize(20),
    height: Utils.normalize(20),
  },
  notificationDot: {
    top: 0,
    right: 0,
    zIndex: 10,
    width: Utils.normalize(8),
    height: Utils.normalize(8),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Utils.normalize(5),
  },
  notificationDotInner: {
    width: Utils.normalize(5),
    height: Utils.normalize(5),
    borderRadius: Utils.normalize(5),
    backgroundColor: Config.appColors.app_F20000,
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
