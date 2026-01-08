import {
  createStyles,
  staticStyle,
} from '@screens/client/BookingDetails/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Components } from '@components/index';
import { TBillDetailsModel } from '@models/formattedAPI/tBilling';

type BookingPaymentDetailsCardProps = {
  role: string | undefined;
  billData: TBillDetailsModel;
};

export const BookingPaymentDetailsCard = (
  props: BookingPaymentDetailsCardProps,
) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={StyleSheet.flatten([staticStyle.card, styles.bgPrimary])}>
      <Components.TextComponent
        family={'medium'}
        textStyle={StyleSheet.flatten([
          staticStyle.titleText,
          styles.textSecondary,
        ])}
        text={t('billDetails')}
      />
      <View
        style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
      />
      <Components.BillDetailsComponent
        amount={props.billData.hourlyRate}
        title={t('hourlyRate')}
      />
      <Components.BillDetailsComponent
        isHour={true}
        amount={props.billData.hours}
        title={t('hoursBooked')}
      />
      <Components.BillDetailsComponent amount={props.billData.total} title={t('total')} />
      <Components.BillDetailsComponent
        amount={props.billData.platformFee}
        title={`${t('platformFee')} (${props.billData.platformPercentage}%)`}
      />
      <Components.BillDetailsComponent amount={props.billData.tax} title={t('tax')} />
      <View
        style={StyleSheet.flatten([
          staticStyle.totalContainer,
          styles.bgSecondary,
        ])}
      >
        <Components.BillDetailsComponent
          isGrandTotal={true}
          amount={props.billData.grandTotal}
          title={t('grandTotal')}
        />
      </View>
    </View>
  );
};
