import { StyleSheet, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import {Utils} from '@utils/index';
import { Components } from '@components/index';

type BillDetailsComponentProps = {
  title: string;
  amount: number;
  isHour?: boolean;
  isGrandTotal?: boolean;
};

export const BillDetailsComponent = (props: BillDetailsComponentProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={staticStyle.container}>
      <Components.TextComponent
        family={'regular'}
        text={props.title}
        textStyle={StyleSheet.flatten([
          props.isGrandTotal ? staticStyle.totalText : staticStyle.text,
          styles.text,
        ])}
      />
      <Components.TextComponent
        family={'regular'}
        text={props.isHour ? `${props.amount}h` : `$${props.amount}`}
        textStyle={StyleSheet.flatten([
          props.isGrandTotal ? staticStyle.totalText : staticStyle.text,
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
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  totalText: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.textPrimary,
    },
  });
