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
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { BookingHistoryDataProp } from '../../demoData/bookingHistory';

type bookingStatusCardProps = {
  data: Readonly<BookingHistoryDataProp>;
};

export const BookingStatusCard = (props: bookingStatusCardProps) => {
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
          text={`${t('bookingId')}: ${props.data.id}`}
        />
        <RegularTextComponent
          textStyle={StyleSheet.flatten([
            staticStyle.subtitleText,
            styles.primaryText,
          ])}
          text={props.data.date}
        />
      </View>
      <View
        style={StyleSheet.flatten([
          staticStyle.statusContainer,
          props.data.status === 'Completed' ? styles.greenBG : styles.redBG,
        ])}
      >
        <FastImage
          source={
            props.data.status === 'Completed'
              ? appIcons.ic_completed
              : appIcons.ic_inProgress
          }
          style={staticStyle.icon}
        />
        <MediumTextComponent
          text={props.data.status}
          textStyle={StyleSheet.flatten([
            staticStyle.tinyText,
            props.data.status === 'Completed'
              ? styles.greenText
              : styles.redText,
          ])}
        />
      </View>
    </View>
  );
};
