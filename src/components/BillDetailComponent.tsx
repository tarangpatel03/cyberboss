import { StyleSheet, View } from 'react-native';
import { RegularTextComponent } from './Text/RegularTextComponent';
import { Theme } from '../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import normalize from '../utils/normalize/normalize';

type billDetailsComponentProps = {
  title: string;
  amount: number;
  isHour?: boolean;
  isGrandTotal?: boolean;
};

export const BillDetailsComponent = ({
  obj,
}: {
  obj: billDetailsComponentProps;
}) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={staticStyle.container}>
      <RegularTextComponent
        text={obj.title}
        textStyle={StyleSheet.flatten([
          obj.isGrandTotal ? staticStyle.totalText : staticStyle.text,
          styles.text,
        ])}
      />
      <RegularTextComponent
        text={obj.isHour ? `${obj.amount}h` : `$${obj.amount}`}
        textStyle={StyleSheet.flatten([
          obj.isGrandTotal ? staticStyle.totalText : staticStyle.text,
          styles.text,
        ])}
      />
    </View>
  );
};

const staticStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  totalText: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.textPrimary,
    },
  });
