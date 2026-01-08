import { Platform, StyleSheet, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { TourGuideZone } from 'rn-tourguide';
import FastImage from 'react-native-fast-image';
import {Utils} from '@utils/index';
import { Components } from '@components/index';
import { Theme } from '@config/themes/themes';
import { useTranslation } from 'react-i18next';

type BarTabIconProps = {
  icon: number | { uri: string } | undefined;
  title: string;
  isFocus: boolean;
  zone: number;
};

export const BarTabIcon = (props: BarTabIconProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.container}>
      <View
        style={StyleSheet.flatten([
          staticStyle.topBar,
          props.isFocus ? styles.topBar : styles.inactiveTab,
        ])}
      />
      <TourGuideZone
        zone={props.zone}
        borderRadius={Utils.normalize(4)}
        text={t(`tour${props.zone}`)}
        style={staticStyle.tour}
      >
        <FastImage source={props.icon} style={staticStyle.tabIcon} />
        <Components.TextComponent
          text={props.title}
          family={'regular'}
          textStyle={StyleSheet.flatten([staticStyle.text, styles.text])}
        />
      </TourGuideZone>
    </View>
  );
};

const staticStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Utils.normalize(40),
  },
  tabIcon: {
    width: Utils.normalize(24),
    height: Utils.normalize(24),
  },
  text: {
    fontSize: Utils.normalize(10),
    fontWeight: '400',
  },
  tour: {
    paddingTop: Utils.normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    top: Platform.OS === 'ios' ? Utils.normalize(12) : Utils.normalize(14),
    width: Utils.normalize(64),
    height: Utils.normalize(4),
    marginBottom: Utils.normalize(8),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.pureWhite,
    },
    topBar: {
      backgroundColor: theme.colors.bottomTabActiveBar,
    },
    inactiveTab: {
      backgroundColor: 'transparent',
    },
  });
