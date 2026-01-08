import { Utils } from '@utils/index';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

type RegularTextComponentProps = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  noOfLines?: number;
};

export const RegularTextComponent = ({
  text,
  textStyle,
  noOfLines,
}: RegularTextComponentProps) => {
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
    fontFamily: Utils.getFontFamily('regular'),
  },
});
