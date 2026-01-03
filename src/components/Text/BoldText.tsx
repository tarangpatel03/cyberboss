import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { getFontFamily } from '@utils/fonts/getFontFamily';

type BoldTextComponentProps = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  noOfLines?: number;
};

export const BoldTextComponent = ({
  text,
  textStyle,
  noOfLines,
}: BoldTextComponentProps) => {
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
    fontFamily: getFontFamily('bold'),
  },
});
