import {StyleSheet, View} from 'react-native';
import {Theme} from '@config/themes/themes';
import {useTheme} from '@shopify/restyle';
import {Utils} from '@utils/index';
import {Components} from '@components/index';
import FastImage from 'react-native-fast-image';
import {memo} from 'react';
import {TNotificationModel} from '@models/formattedAPI/tNotification';
import {Config} from '@config/index';

export const NotificationCard = memo(
    ({data}: { data: TNotificationModel }) => {
        const theme = useTheme<Theme>();
        const styles = createStyles(theme);
        return (
            <View style={staticStyle.container}>
                {data.image ? (
                    <FastImage source={{uri: data.image}} style={staticStyle.image}/>
                ) : (
                    <View
                        style={StyleSheet.flatten([
                            staticStyle.image,
                            staticStyle.defaultNotificationBell,
                            styles.defaultNotificationBell,
                        ])}
                    >
                        <FastImage
                            source={Config.appIcons.ic_bellFill}
                            style={staticStyle.bellIcon}
                        />
                    </View>
                )}
                <View style={staticStyle.text}>
                    <Components.TextComponent
                        family={'regular'}
                        text={data.body}
                        noOfLines={2}
                        textStyle={StyleSheet.flatten([
                            staticStyle.notificationText,
                            styles.textPrimary,
                        ])}
                    />
                    <Components.TextComponent
                        family={'regular'}
                        text={Utils.getDate(data.createdAt)}
                        textStyle={StyleSheet.flatten([
                            staticStyle.time,
                            styles.textSecondary,
                        ])}
                    />
                </View>
            </View>
        );
    },
);

const staticStyle = StyleSheet.create({
    container: {
        gap: Utils.normalize(10),
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: Utils.normalize(30),
        marginVertical: Utils.normalize(10),
    },
    text: {
        width: '90%',
    },
    image: {
        borderRadius: Utils.normalize(30),
        width: Utils.normalize(48),
        height: Utils.normalize(48),
    },
    notificationText: {
        fontSize: Utils.normalize(16),
        fontWeight: '400',
    },
    time: {
        fontSize: Utils.normalize(14),
        fontWeight: '400',
    },
    defaultNotificationBell: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bellIcon: {
        width: Utils.normalize(24),
        height: Utils.normalize(24),
    },
});

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        textPrimary: {
            color: theme.colors.textPrimary,
        },
        textSecondary: {
            color: theme.colors.textSecondary,
        },
        defaultNotificationBell: {
            backgroundColor: theme.colors.bgSecondary,
        },
    });
