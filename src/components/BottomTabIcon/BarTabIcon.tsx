import { Platform, StyleSheet, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { TourGuideZone } from 'rn-tourguide';
import FastImage from 'react-native-fast-image';
import normalize from '@utils/normalize/normalize';
import { RegularTextComponent } from '@components/Text/RegularText';
import { Theme } from '@config/themes/themes';
import { useTranslation } from 'react-i18next';

type BarTabIconProps = {
  icon: number | { uri: string } | undefined;
  title: string;
  isFocus: boolean;
  zone: number;
};

export const BarTabIconComponent = (props: BarTabIconProps) => {
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
        borderRadius={normalize(4)}
        text={t(`tour${props.zone}`)}
        style={staticStyle.tour}
      >
        <FastImage source={props.icon} style={staticStyle.tabIcon} />
        <RegularTextComponent
          text={props.title}
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
    width: normalize(40),
  },
  tabIcon: {
    width: normalize(24),
    height: normalize(24),
  },
  text: {
    fontSize: normalize(10),
    fontWeight: '400',
  },
  tour: {
    paddingTop: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    top: Platform.OS === 'ios' ? normalize(12) : normalize(14),
    width: normalize(64),
    height: normalize(4),
    marginBottom: normalize(8),
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
