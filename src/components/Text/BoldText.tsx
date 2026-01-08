import { Utils } from '@utils/index';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

type BoldTextComponentProps = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  noOfLines?: number;
};

export const BoldTextComponent = (props: BoldTextComponentProps) => {
  return (
    <Text
      numberOfLines={props.noOfLines ?? 1}
      style={StyleSheet.flatten([styles.text, props.textStyle])}
    >
      {props.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Utils.getFontFamily('bold'),
  },
});
