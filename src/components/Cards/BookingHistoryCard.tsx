import { useTheme } from '@shopify/restyle';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../config/themes/themes';
import normalize from '../../utils/normalize/normalize';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { appIcons } from '../../config/icons/iconPath';
import { width } from '../../config/constants/variables';
import FastImage from 'react-native-fast-image';
import { memo } from 'react';
import { tHomeBookingModel } from '../../models/formattedAPI/tBookings';
import { getFullDate } from '../../utils/format/formatDate';
import { getProfilePicture } from '../../utils/extractURI/extractImageURI';
import { appImages } from '../../config/images/imagePath';
import { useTranslation } from 'react-i18next';

export const BookingHistoryCard = memo((props: tHomeBookingModel) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={StyleSheet.flatten([staticStyle.container, styles.container])}>
      <View style={StyleSheet.flatten([staticStyle.header, styles.header])}>
        <FastImage
          style={staticStyle.image}
          source={
            getProfilePicture(props.consultantProfilePicture) ??
            appImages.img_defaultProfile
          }
        />
        <View>
          <MediumTextComponent
            text={props.consultantName ?? t('unknownName')}
            textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
          />
          <RegularTextComponent
            text={getFullDate(props.bookingDate)}
            textStyle={StyleSheet.flatten([
              staticStyle.subTitle,
              styles.subTitle,
            ])}
          />
        </View>
      </View>
      <View style={staticStyle.detail}>
        <View style={staticStyle.header}>
          <FastImage style={staticStyle.icons} source={appIcons.ic_suitcase} />
          <RegularTextComponent
            text={props.categoryName}
            textStyle={StyleSheet.flatten([
              staticStyle.subTitle,
              styles.subTitle,
            ])}
          />
        </View>
        <View style={staticStyle.header}>
          <FastImage style={staticStyle.icons} source={appIcons.ic_cash} />
          <RegularTextComponent
            text={`$${props.grandTotal}`}
            textStyle={StyleSheet.flatten([
              staticStyle.subTitle,
              styles.subTitle,
            ])}
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={StyleSheet.flatten([staticStyle.button, styles.button])}
      >
        <FastImage
          tintColor={theme.colors.primary}
          source={appIcons.ic_fillChat}
          style={staticStyle.chat}
        />
      </TouchableOpacity>
    </View>
  );
});

const staticStyle = StyleSheet.create({
  container: {
    gap: normalize(16, 'height'),
    width: normalize(width * 0.7),
    borderRadius: normalize(12),
    padding: normalize(12),
    marginLeft: normalize(12),
    borderWidth: 1,
  },
  header: {
    gap: normalize(8, 'height'),
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
  },
  title: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  icons: {
    width: normalize(14),
    height: normalize(14),
  },
  subTitle: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  detail: {
    gap: normalize(12),
  },
  button: {
    borderWidth: 1,
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chat: {
    width: normalize(16),
    height: normalize(16),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderPrimary,
    },
    header: {},
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
    button: {
      borderColor: theme.colors.borderPrimary,
      backgroundColor: theme.colors.bgBookingHistory,
    },
    chat: {
      tintColor: theme.colors.primary,
    },
  });
