import {Utils} from '@utils/index.ts';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

type TextComponentProps = {
    text: string;
    textStyle: StyleProp<TextStyle>;
    noOfLines?: number;
    family: "regular" | "medium" | "bold" | "light" | "semiBold"
};

export const TextComponent = (props: TextComponentProps) => {
    return (
        <Text
            numberOfLines={props.noOfLines ?? 1}
            style={StyleSheet.flatten([{fontFamily: Utils.getFontFamily(props.family)}, props.textStyle])}
        >
            {props.text}
        </Text>
    );
};
