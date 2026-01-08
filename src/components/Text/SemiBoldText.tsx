import { Utils } from '@utils/index';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

type SemiBoldTextComponentProps = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  noOfLines?: number;
};

export const SemiBoldTextComponent = ({
  text,
  textStyle,
  noOfLines,
}: SemiBoldTextComponentProps) => {
  return (
    <Text
      numberOfLines={noOfLines ?? 1}
      style={StyleSheet.flatten([styles.text, textStyle])}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Utils.getFontFamily('semiBold'),
  },
});
