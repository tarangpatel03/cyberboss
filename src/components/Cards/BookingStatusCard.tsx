import {
  createStyles,
  staticStyle,
} from '../../screens/common/BookingSummary/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Theme } from '../../config/themes/themes';
import { appIcons } from '../../config/icons/iconPath';
import { MediumTextComponent } from '../Text/MediumText';
import { RegularTextComponent } from '../Text/RegularText';
import { TBookingDetailsModel } from '../../models/formattedAPI/tBookings';
import { getFullDate } from '../../utils/format/formatDate';

type BookingStatusCardProps = {
  props: TBookingDetailsModel | undefined;
};

export const BookingStatusCard = ({ props }: BookingStatusCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View
      style={StyleSheet.flatten([
        staticStyle.card,
        staticStyle.horizontalCard,
        styles.container,
      ])}
    >
      <View style={staticStyle.id}>
        <MediumTextComponent
          textStyle={StyleSheet.flatten([
            staticStyle.titleText,
            styles.secondaryText,
          ])}
          text={`${t('bookingId')}: ${props?.bookingId}`}
        />
        <RegularTextComponent
          textStyle={StyleSheet.flatten([
            staticStyle.subtitleText,
            styles.primaryText,
          ])}
          text={getFullDate(props?.bookingDate ?? '')}
        />
      </View>
      <View
        style={StyleSheet.flatten([
          staticStyle.statusContainer,
          props?.status === 'Completed' ? styles.greenBG : styles.redBG,
        ])}
      >
        <FastImage
          source={
            props?.status === 'Completed'
              ? appIcons.ic_completed
              : appIcons.ic_inProgress
          }
          style={staticStyle.icon}
        />
        <MediumTextComponent
          text={props?.status ?? ''}
          textStyle={StyleSheet.flatten([
            staticStyle.tinyText,
            props?.status === 'Completed' ? styles.greenText : styles.redText,
          ])}
        />
      </View>
    </View>
  );
};
