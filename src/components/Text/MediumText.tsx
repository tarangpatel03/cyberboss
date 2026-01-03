import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { getFontFamily } from '@utils/fonts/getFontFamily';

type MediumTextComponentProps = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  noOfLines?: number;
};

export const MediumTextComponent = ({
  text,
  textStyle,
  noOfLines,
}: MediumTextComponentProps) => {
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
    fontFamily: getFontFamily('medium'),
  },
});
