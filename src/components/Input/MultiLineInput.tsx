import {useTheme} from '@shopify/restyle';
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import {Theme} from '@config/themes/themes';
import {Utils} from '@utils/index';
import {Dispatch, SetStateAction, useState} from 'react';
import {Components} from '@components/index';
import FastImage from 'react-native-fast-image';
import {Config} from '@config/index';

type MultiLineInputComponentProps = {
    placeholder: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    secureText?: boolean;
    borderStyle?: StyleProp<ViewStyle> | null;
    onSubmit?: (serviceText: string) => void;
    isNotBio?: boolean;
};

export const BioInputComponent = (props: MultiLineInputComponentProps) => {
    const [isFocus, setIsFocus] = useState(false);
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    return (
        <View
            style={StyleSheet.flatten([
                staticStyle.container,
                styles.container,
                props.borderStyle,
            ])}
        >
            {(props?.value ?? false) && (
                <Components.TextComponent
                    family={'regular'}
                    textStyle={StyleSheet.flatten([
                        staticStyle.placeHolder,
                        styles.placeHolder,
                        props.borderStyle,
                    ])}
                    text={props.placeholder}
                />
            )}
            <TextInput
                placeholder={!isFocus ? props.placeholder : ''}
                multiline={true}
                style={StyleSheet.flatten([
                    staticStyle.input,
                    props.isNotBio && staticStyle.boiInput,
                    styles.input,
                    props.borderStyle,
                ])}
                autoCapitalize="none"
                onSubmitEditing={() =>
                    props.onSubmit ? props.onSubmit(props.value ?? '') : null
                }
                onFocus={() => {
                    setIsFocus(true);
                }}
                onBlur={() => setIsFocus(false)}
                value={props.value ?? ''}
                onChangeText={props.setValue}
                secureTextEntry={props.secureText ? props.secureText : false}
                placeholderTextColor={
                    Utils.isDarkMode(theme) ? Config.appColors.app_FFFFFF : Config.appColors.app_212121
                }
            />
            <TouchableOpacity activeOpacity={0.7} style={staticStyle.askAi}>
                <FastImage source={Config.appImages.img_askAi} style={staticStyle.askAi}/>
            </TouchableOpacity>
        </View>
    );
};

const staticStyle = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        borderRadius: Utils.normalize(12),
        minHeight: Utils.normalize(80),
        paddingHorizontal: Utils.normalize(6),
    },
    input: {
        left: Utils.normalize(8),
        fontSize: Utils.normalize(14),
        fontWeight: '400',
    },
    boiInput: {
        top: Utils.normalize(-20),
    },
    placeHolder: {
        top: Utils.normalize(6),
        fontSize: Utils.normalize(12),
        fontWeight: '400',
        left: Utils.normalize(8),
    },
    askAi: {
        width: Utils.normalize(76),
        height: Utils.normalize(27),
        position: 'absolute',
        bottom: Utils.normalize(4),
        right: Utils.normalize(4),
        paddingBottom: Utils.normalize(8),
        resizeMode: 'contain',
    },
});

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            borderColor: theme.colors.borderPrimary,
        },
        input: {
            color: theme.colors.textPrimary,
        },
        placeHolder: {
            color: theme.colors.textPrimary,
        },
    });
