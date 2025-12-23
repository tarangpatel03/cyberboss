import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import normalize from '../../utils/normalize/normalize';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { appIcons } from '../../config/icons/iconPath';
import { PrimaryButtonComponent } from '../Buttons/PrimaryButton';
import { CircularIconButtonComponent } from '../Buttons/CircularIconButton';
import LinearGradient from 'react-native-linear-gradient';
import { BookingHistoryDataProp } from '../../demoData/bookingHistory';
import { appColors } from '../../config/colors/colors';
import FastImage from 'react-native-fast-image';
import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

type bookingCardProps = {
  obj: BookingHistoryDataProp;
  onMorePress: (x: number, y: number) => void;
  navigateToDetails: (item: BookingHistoryDataProp) => void;
};

export const BookingCard = memo(
  ({ obj, onMorePress, navigateToDetails }: bookingCardProps) => {
    const { t } = useTranslation();
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const moreButtonRef = useRef<View>(null);

    const handleMorePress = () => {
      if (moreButtonRef.current) {
        moreButtonRef.current.measureInWindow((x, y, width, height) => {
          onMorePress(x, y + height);
        });
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigateToDetails(obj)}
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.row}>
          <MediumTextComponent
            text={`${t('bookingId')}: ${obj.id}`}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              styles.secondaryText,
            ])}
          />
          <View
            style={StyleSheet.flatten([
              staticStyle.statusContainer,
              obj.status === t('completed') ? styles.greenBG : styles.redBG,
            ])}
          >
            <FastImage
              source={
                obj.status === t('completed')
                  ? appIcons.ic_completed
                  : appIcons.ic_inProgress
              }
              style={staticStyle.icon}
            />
            <MediumTextComponent
              text={obj.status}
              textStyle={StyleSheet.flatten([
                staticStyle.tinyText,
                obj.status === t('completed')
                  ? styles.greenText
                  : styles.redText,
              ])}
            />
          </View>
        </View>
        <View
          style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
        />
        <View style={staticStyle.rowLine}>
          <FastImage
            source={obj.profileImage}
            style={staticStyle.profileImage}
          />
          <View style={staticStyle.fullLengthView}>
            <MediumTextComponent
              text={obj.name}
              textStyle={StyleSheet.flatten([
                staticStyle.titleText,
                styles.primaryText,
              ])}
            />
            <RegularTextComponent
              text={`${obj.time}hr`}
              textStyle={StyleSheet.flatten([
                staticStyle.subtitleText,
                styles.secondaryText,
              ])}
            />
          </View>
          <MediumTextComponent
            text={`$${obj.cost}`}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              staticStyle.text,
              styles.primaryText,
            ])}
          />
        </View>
        <LinearGradient
          colors={[appColors.app_2A71ED12, appColors.app_2A71ED00]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={staticStyle.gradient}
        >
          <View style={staticStyle.rowLine}>
            <FastImage
              style={staticStyle.categoryIcon}
              source={obj.category.image}
            />
            <RegularTextComponent
              text={obj.category.text}
              textStyle={StyleSheet.flatten([
                staticStyle.subtitleText,
                styles.primaryText,
              ])}
            />
          </View>
        </LinearGradient>
        <View style={staticStyle.rowLine}>
          <PrimaryButtonComponent
            obj={{
              onPress: () => {},
              text: t('message'),
              buttonStyle: StyleSheet.flatten([
                staticStyle.button,
                styles.button,
              ]),
              textStyle: StyleSheet.flatten([
                staticStyle.subtitleText,
                styles.primaryText,
              ]),
            }}
          />
          <CircularIconButtonComponent
            obj={{
              onPress: handleMorePress,
              buttonStyle: StyleSheet.flatten([
                staticStyle.iconButton,
                styles.button,
              ]),
              iconPath: appIcons.ic_more,
              tintColor: theme.colors.textPrimary,
              iconStyle: staticStyle.moreIcon,
            }}
            ref={moreButtonRef}
          />
        </View>
      </TouchableOpacity>
    );
  },
);

const staticStyle = StyleSheet.create({
  container: {
    borderRadius: normalize(12),
    borderWidth: 0.75,
    padding: normalize(12),
    gap: normalize(16, 'height'),
  },
  titleText: {
    fontSize: normalize(14),
    fontWeight: '500',
  },
  subtitleText: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  fullLengthView: {
    paddingLeft: normalize(2),
    gap: normalize(8),
    flex: 1,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    left: normalize(-12),
    width: '107.5%',
    borderWidth: 0.75,
  },
  text: {
    alignSelf: 'flex-end',
  },
  gradient: {
    padding: normalize(8),
    borderRadius: normalize(8),
  },
  profileImage: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(25),
    marginRight: normalize(8),
  },
  rowLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
  iconButton: {
    marginLeft: normalize(8),
    width: normalize(45),
    height: normalize(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(8),
  },
  moreIcon: {
    width: normalize(17),
    height: normalize(4),
  },
  statusContainer: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    gap: normalize(6),
    borderRadius: normalize(24),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: normalize(14),
    height: normalize(14),
    borderRadius: normalize(10),
  },
  categoryIcon: {
    width: normalize(16),
    height: normalize(16),
    resizeMode: 'contain',
    marginRight: normalize(12),
  },
  tinyText: {
    fontSize: normalize(12),
    fontWeight: '500',
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderPrimary,
    },
    secondaryText: {
      color: theme.colors.textSecondary,
    },
    primaryText: {
      color: theme.colors.textPrimary,
    },
    separator: {
      borderColor: theme.colors.borderPrimary,
    },
    redBG: {
      backgroundColor: theme.colors.pureTransparentOrange,
    },
    greenBG: {
      backgroundColor: theme.colors.pureTransparentGreen,
    },
    redText: {
      color: theme.colors.pureOrange,
    },
    greenText: {
      color: theme.colors.pureGreen,
    },
    button: {
      backgroundColor: theme.colors.borderPrimary,
    },
  });
