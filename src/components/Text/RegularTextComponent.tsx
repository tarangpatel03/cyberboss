import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { getFontFamily } from '../../utils/fonts/getFontFamily';

type RegularTextComponent = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  noOfLines?: number;
};

export const RegularTextComponent = ({
  text,
  textStyle,
  noOfLines,
}: RegularTextComponent) => {
  return (
    <Text
      numberOfLines={noOfLines ?? 1}
      style={StyleSheet.flatten([textStyle, styles.text])}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: getFontFamily('regular'),
  },
});
