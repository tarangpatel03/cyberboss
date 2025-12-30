import {
  createStyles,
  staticStyle,
} from '../../screens/client/BookingDetails/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { BillDetailsComponent } from '../BillDetailComponent';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { tBillDetailsModel } from '../../models/formattedAPI/tBilling';

type bookingPaymentDetailsCardProps = {
  role: string | undefined;
  billData: tBillDetailsModel;
};

export const BookingPaymentDetailsCard = (
  props: bookingPaymentDetailsCardProps,
) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={StyleSheet.flatten([staticStyle.card, styles.bgPrimary])}>
      <MediumTextComponent
        textStyle={StyleSheet.flatten([
          staticStyle.titleText,
          styles.textSecondary,
        ])}
        text={t('billDetails')}
      />
      <View
        style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
      />
      <BillDetailsComponent
        amount={props.billData.hourlyRate}
        title={t('hourlyRate')}
      />
      <BillDetailsComponent
        isHour={true}
        amount={props.billData.hours}
        title={t('hoursBooked')}
      />
      <BillDetailsComponent amount={props.billData.total} title={t('total')} />
      <BillDetailsComponent
        amount={props.billData.platformFee}
        title={`${t('platformFee')} (${props.billData.platformPercentage}%)`}
      />
      <BillDetailsComponent amount={props.billData.tax} title={t('tax')} />
      <View
        style={StyleSheet.flatten([
          staticStyle.totalContainer,
          styles.bgSecondary,
        ])}
      >
        <BillDetailsComponent
          isGrandTotal={true}
          amount={props.billData.grandTotal}
          title={t('grandTotal')}
        />
      </View>
    </View>
  );
};
