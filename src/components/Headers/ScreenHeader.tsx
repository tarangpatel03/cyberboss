import {useTheme} from '@shopify/restyle';
import {StyleSheet, View} from 'react-native';
import {Components} from '@components/index';
import {Utils} from '@utils/index';
import {Theme} from '@config/themes/themes';
import {Config} from '@config/index';

type ScreenHeaderComponentProps = {
    iconPath?: number | { uri: string } | undefined;
    onPress: () => void;
    headerText?: string;
};

export const ScreenHeader = ({
                                 headerText,
                                 onPress,
                                 iconPath,
                             }: ScreenHeaderComponentProps) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);

    return (
        <>
            <View style={staticStyle.container}>
                <Components.Buttons.CircularIconButton
                    iconPath={Config.appIcons.ic_backIcon}
                    iconStyle={staticStyle.backIcon}
                    tintColor={theme.colors.textPrimary}
                    buttonStyle={staticStyle.backButton}
                    onPress={onPress}
                />
                {headerText && (
                    <Components.TextComponent
                        family={'medium'}
                        text={headerText}
                        textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
                    />
                )}
                {iconPath ? (
                    <Components.Buttons.CircularIconButton
                        buttonStyle={staticStyle.backButton}
                        iconPath={iconPath}
                        tintColor={theme.colors.textPrimary}
                        iconStyle={staticStyle.backIcon}
                        onPress={() => {
                        }}
                    />
                ) : (
                    <View style={staticStyle.backButton}/>
                )}
            </View>
        </>
    );
};

const staticStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: Utils.normalize(12),
        paddingHorizontal: Utils.normalize(20),
        height: Utils.normalize(32, 'height'),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        width: '70%',
        textAlign: 'center',
        fontSize: Utils.normalize(18),
        fontWeight: '500',
    },
    backIcon: {
        width: Utils.normalize(20),
        height: Utils.normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    backButton: {
        width: Utils.normalize(16),
        height: Utils.normalize(12, 'height'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    moreIcon: {
        width: Utils.normalize(16),
        height: Utils.normalize(12, 'height'),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        title: {
            color: theme.colors.textPrimary,
        },
    });
