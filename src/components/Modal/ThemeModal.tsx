import {useTheme} from '@shopify/restyle';
import {Modal, StyleSheet, View} from 'react-native';
import {Theme} from '@config/themes/themes';
import {Utils} from '@utils/index';
import {Components} from '@components/index';
import {useState} from 'react';
import {setThemeMode, ThemeMode} from '@redux/features/themeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@redux/store';
import {useTranslation} from 'react-i18next';
import {Config} from '@config/index';

type ThemeModalProps = {
    isVisible: boolean;
    onclose: () => void;
};

export const ThemeModal = ({isVisible, onclose}: ThemeModalProps) => {
    const {t} = useTranslation();
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const currentTheme = useSelector((state: RootState) => state.theme.themeMode);
    const dispatch = useDispatch();
    const [selectedTheme, setSelectedTheme] = useState<ThemeMode>(currentTheme);

    const updateTheme = () => {
        dispatch(setThemeMode(selectedTheme));
    };
    const changeTheme = () => {
        updateTheme();
        onclose();
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent
            statusBarTranslucent
        >
            <View
                style={StyleSheet.flatten([staticStyle.container, styles.container])}
            >
                <Components.Buttons.CircularIconButton
                    iconPath={Config.appIcons.ic_cancel}
                    buttonStyle={StyleSheet.flatten([
                        staticStyle.exitBtn,
                        styles.exitBtn,
                    ])}
                    iconStyle={staticStyle.icon}
                    onPress={onclose}
                />
                <View
                    style={StyleSheet.flatten([
                        StyleSheet.flatten([staticStyle.menu, styles.menu]),
                    ])}
                >
                    <View style={StyleSheet.flatten([staticStyle.title, styles.title])}>
                        <Components.TextComponent
                            family={'medium'}
                            text={t('appearance')}
                            textStyle={StyleSheet.flatten([
                                staticStyle.titleText,
                                styles.titleText,
                            ])}
                        />
                    </View>
                    <View style={staticStyle.themeOptions}>
                        <Components.Cards.ThemeSelectionCard
                            isSelected={selectedTheme === ThemeMode.Light}
                            onPress={() => setSelectedTheme(ThemeMode.Light)}
                            title={t('lightTheme')}
                        />
                        <View
                            style={StyleSheet.flatten([staticStyle.separator, styles.title])}
                        />
                        <Components.Cards.ThemeSelectionCard
                            isSelected={selectedTheme === ThemeMode.Dark}
                            onPress={() => setSelectedTheme(ThemeMode.Dark)}
                            title={t('darkTheme')}
                        />
                        <View
                            style={StyleSheet.flatten([staticStyle.separator, styles.title])}
                        />
                        <Components.Cards.ThemeSelectionCard
                            isSelected={selectedTheme === ThemeMode.Device}
                            onPress={() => setSelectedTheme(ThemeMode.Device)}
                            title={t('deviceTheme')}
                        />
                    </View>
                    <View style={staticStyle.button}>
                        <Components.Buttons.PrimaryButton
                            onPress={changeTheme}
                            text={t('savePreference')}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const staticStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: Utils.normalize(16, 'height'),
    },
    menu: {
        width: '100%',
        gap: Utils.normalize(12),
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    titleText: {
        fontSize: Utils.normalize(18),
        fontWeight: '500',
    },
    title: {
        borderBottomWidth: 1,
        paddingHorizontal: Utils.normalize(12),
        paddingVertical: Utils.normalize(16, 'height'),
    },
    button: {
        paddingBottom: Utils.normalize(40),
        paddingHorizontal: Utils.normalize(12),
    },
    themeOptions: {
        alignItems: 'center',
        gap: Utils.normalize(8, 'height'),
        paddingHorizontal: Utils.normalize(12),
    },
    separator: {
        width: '100%',
        borderWidth: 0.5,
    },
    exitBtn: {
        borderRadius: Utils.normalize(30),
        alignSelf: 'center',
        alignItems: 'center',
        width: Utils.normalize(40),
        height: Utils.normalize(40),
        justifyContent: 'center',
    },
    icon: {
        width: Utils.normalize(12),
        height: Utils.normalize(12),
    },
});

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.backgroundTransparent,
        },
        menu: {
            backgroundColor: theme.colors.bgPrimary,
        },
        title: {
            borderColor: theme.colors.borderPrimary,
        },
        titleText: {
            color: theme.colors.textPrimary,
        },
        separator: {
            borderColor: theme.colors.textSecondary,
        },
        exitBtn: {
            backgroundColor: theme.colors.pureBlack,
        },
    });
