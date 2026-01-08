import { Utils } from '@utils/index';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

type MediumTextComponentProps = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  noOfLines?: number;
};

export const MediumTextComponent = (props: MediumTextComponentProps) => {
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
    fontFamily: Utils.getFontFamily('medium'),
  },
});
