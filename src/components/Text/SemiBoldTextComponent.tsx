import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { getFontFamily } from '../../utils/fonts/getFontFamily';

type SemiBoldTextComponent = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  noOfLines?: number;
};

export const SemiBoldTextComponent = ({
  text,
  textStyle,
  noOfLines,
}: SemiBoldTextComponent) => {
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
    fontFamily: getFontFamily('semiBold'),
  },
});
