import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, KeyboardTypeOptions} from 'react-native';
import {Config} from "@config/index.ts";
import {Utils} from "@utils/index.ts";
import {Theme} from "@config/themes/themes.ts";
import {useTheme} from "@shopify/restyle";
import FastImage from "react-native-fast-image";
import {Components} from "@components/index.ts";

type Props = {
    value: string;
    setValue: (value: string) => void;
    keyboardType?: KeyboardTypeOptions | undefined;
    onSubmit?: (serviceText: string) => void;
    placeholder: string;
    isPassword?: boolean;
};

export const CustomInput: React.FC<Props> = (props) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const [showPassword, setShowPassword] = useState(false);
    const onEyeClick = () => {
        setShowPassword(!showPassword);
    }
    return (
        <View style={StyleSheet.flatten([staticStyles.inputContainer, styles.inputContainer])}>
            {props.value.length > 0 &&
                <Components.TextComponent text={props.placeholder} textStyle={staticStyles.placeholder}
                                          family={'light'}/>

            }
            <TextInput
                style={StyleSheet.flatten([props.value.length > 0 ? staticStyles.input : staticStyles.emptyInput, styles.input])}
                value={props.value} onSubmitEditing={() => (props.onSubmit ? props.onSubmit(props.value ?? '') : null)}
                onChangeText={props.setValue} keyboardType={props.keyboardType}
                secureTextEntry={props.isPassword && !showPassword} placeholder={props.placeholder}
                placeholderTextColor={theme.colors.textSecondary} autoCapitalize={'none'}
            />
            {props.isPassword && (
                <TouchableOpacity onPress={onEyeClick} style={staticStyles.eye}>
                    <FastImage resizeMode={'contain'} style={staticStyles.eyeIcon}
                               tintColor={theme.colors.textPrimary}
                               source={showPassword ? Config.appIcons.ic_hiddenPassword : Config.appIcons.ic_showPassword}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const staticStyles = StyleSheet.create({
    emptyInput: {
        flex: 1,
        fontWeight: '400',
        fontSize: Utils.normalize(16),
        paddingVertical: Utils.normalize(13),
    },
    input: {
        flex: 1,
        fontWeight: '400',
        top: Utils.normalize(6),
        fontSize: Utils.normalize(16),
        paddingVertical: Utils.normalize(13),
    },
    eye: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Utils.normalize(24),
        height: Utils.normalize(24),
    },
    placeholder: {
        color: 'white',
        fontWeight: '400',
        position: 'absolute',
        top: Utils.normalize(6),
        left: Utils.normalize(12),
        fontSize: Utils.normalize(12),
    },
    eyeIcon: {
        right: 0,
        position: 'absolute',
        width: Utils.normalize(18),
        height: Utils.normalize(18),
    },
    inputContainer: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Utils.normalize(12),
        paddingHorizontal: Utils.normalize(12),
    },
});

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        label: {
            color: theme.colors.textPrimary,
        },
        input: {
            color: theme.colors.textPrimary,
        },
        inputContainer: {
            borderColor: theme.colors.borderPrimary,
        },
    })