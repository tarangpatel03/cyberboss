import {
  createStyles,
  staticStyle,
} from '@screens/client/BookingDetails/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Components } from '@components/index';
import { ApiBillDetailsModel } from '@models/api/billing';

type BookingPaymentDetailsCardProps = {
  role: string | undefined;
  billData: ApiBillDetailsModel;
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
        amount={props.billData?.hourly_rate ?? 0}
        title={t('hourlyRate')}
      />
      <Components.BillDetailsComponent
        isHour={true}
        amount={props.billData?.hours ?? 0}
        title={t('hoursBooked')}
      />
      <Components.BillDetailsComponent
        amount={props.billData?.total ?? 0}
        title={t('total')}
      />
      <Components.BillDetailsComponent
        amount={props.billData?.platform_fee ?? 0}
        title={`${t('platformFee')} (${
          props.billData?.platform_percentage ?? 0
        }%)`}
      />
      <Components.BillDetailsComponent
        amount={props.billData?.tax ?? 0}
        title={t('tax')}
      />
      <View
        style={StyleSheet.flatten([
          staticStyle.totalContainer,
          styles.bgSecondary,
        ])}
      >
        <Components.BillDetailsComponent
          isGrandTotal={true}
          amount={props.billData?.grand_total ?? 0}
          title={t('grandTotal')}
        />
      </View>
    </View>
  );
};
