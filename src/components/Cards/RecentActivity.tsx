import {StyleSheet, View} from 'react-native';
import {Theme} from '@config/themes/themes';
import {useTheme} from '@shopify/restyle';
import {Utils} from '@utils/index';
import {Components} from '@components/index';
import FastImage from 'react-native-fast-image';
import {memo} from 'react';
import {TConsultantHomeNotificationModel} from '@models/formattedAPI/tHome';
import {Config} from '@config/index';

export const RecentActivity = memo(
    (props: TConsultantHomeNotificationModel) => {
        const theme = useTheme<Theme>();
        const styles = createStyles(theme);
        return (
            <View
                style={StyleSheet.flatten([staticStyle.container, styles.container])}
            >
                <FastImage
                    source={Config.appImages.img_defaultProfile}
                    style={staticStyle.image}
                />
                <View style={staticStyle.row}>
                    <Components.TextComponent
                        family={'regular'}
                        text={props.title}
                        noOfLines={2}
                        textStyle={StyleSheet.flatten([
                            staticStyle.title,
                            styles.primaryText,
                        ])}
                    />
                    <Components.TextComponent
                        family={'regular'}
                        text={props.createdAt}
                        textStyle={StyleSheet.flatten([
                            staticStyle.subtitle,
                            styles.secondaryText,
                        ])}
                    />
                </View>
            </View>
        );
    },
);

const staticStyle = StyleSheet.create({
    container: {
        borderRadius: Utils.normalize(12),
        borderWidth: 0.5,
        gap: Utils.normalize(12),
        flexDirection: 'row',
        padding: Utils.normalize(12),
        marginHorizontal: Utils.normalize(12),
    },
    row: {
        width: '80%',
        gap: Utils.normalize(4),
    },
    image: {
        borderRadius: Utils.normalize(30),
        width: Utils.normalize(48),
        height: Utils.normalize(48),
    },
    title: {
        fontSize: Utils.normalize(16),
        fontWeight: '600',
    },
    subtitle: {
        fontSize: Utils.normalize(14),
        fontWeight: '400',
    },
});

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.bgPrimary,
            borderColor: theme.colors.borderPrimary,
        },
        primaryText: {
            color: theme.colors.textPrimary,
        },
        secondaryText: {
            color: theme.colors.textSecondary,
        },
    });
