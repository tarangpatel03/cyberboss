import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Components } from '@components/index';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import {Utils} from '@utils/index';
import FastImage from 'react-native-fast-image';
import { Config } from '@config/index';

type SettingOptionsButtonProps = {
  title: string;
  icon: number | { uri: string } | undefined;
  navigate: () => void;
};

export const SettingOptionsButton = (props: SettingOptionsButtonProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.navigate}
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
            source={props.icon}
            style={staticStyle.icon}
          />
        </View>
        <Components.TextComponent
          text={props.title}
          family={'regular'}
          textStyle={StyleSheet.flatten([staticStyle.text, styles.primaryText])}
        />
      </View>
      <FastImage
        style={staticStyle.nextIcon}
        resizeMode={FastImage.resizeMode.contain}
        tintColor={theme.colors.textSecondary}
        source={Config.appIcons.ic_rightArrow}
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
    paddingRight: Utils.normalize(8),
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Utils.normalize(12),
  },
  text: {
    fontSize: Utils.normalize(16),
    fontWeight: '400',
  },
  iconContainer: {
    width: Utils.normalize(28),
    alignItems: 'center',
    height: Utils.normalize(28),
    justifyContent: 'center',
    borderRadius: Utils.normalize(20),
  },
  icon: {
    width: Utils.normalize(16),
    height: Utils.normalize(16),
  },
  nextIcon: {
    width: Utils.normalize(7),
    height: Utils.normalize(14),
    borderRadius: Utils.normalize(20),
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
