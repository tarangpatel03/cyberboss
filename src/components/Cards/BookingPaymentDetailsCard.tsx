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
import { IBillDetailsModal } from '../../models/formattedAPI/formatedModals';

type bookingPaymentDetailsCardProps = {
  role: string;
  billData: IBillDetailsModal;
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
        style={StyleSheet.flatten([staticStyle.saperator, styles.saperator])}
      />
      <BillDetailsComponent
        obj={{
          amount: props.billData.hourlyRate,
          title: t('hourlyRate'),
        }}
      />
      <BillDetailsComponent
        obj={{
          isHour: true,
          amount: props.billData.hours,
          title: t('hoursBooked'),
        }}
      />
      <BillDetailsComponent
        obj={{
          amount: props.billData.total,
          title: t('total'),
        }}
      />
      <BillDetailsComponent
        obj={{
          amount: props.billData.platformFee,
          title: `${t('platformFee')} (${props.role === 'client' ? 10 : 25}%)`,
        }}
      />
      <BillDetailsComponent
        obj={{
          amount: props.billData.tax,
          title: t('tax'),
        }}
      />
      <View
        style={StyleSheet.flatten([
          staticStyle.totalContainer,
          styles.bgSecondary,
        ])}
      >
        <BillDetailsComponent
          obj={{
            isGrandTotal: true,
            amount: props.billData.grandTotal,
            title: t('grandTotal'),
          }}
        />
      </View>
    </View>
  );
};
