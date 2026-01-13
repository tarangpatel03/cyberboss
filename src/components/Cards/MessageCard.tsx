import {StyleSheet, View} from 'react-native';
import {Theme} from '@config/themes/themes';
import {useTheme} from '@shopify/restyle';
import {Utils} from '@utils/index';
import {Components} from '@components/index';
import {memo} from 'react';
import FastImage from 'react-native-fast-image';
import {TChatBotChatModel} from '@models/formattedAPI/tChatbot';
import {Config} from '@config/index';
import {createStyles, staticStyle} from "@components/Cards/OneToOneChatCard.tsx";


export const MessageCard = memo(({data}: { data: TChatBotChatModel }) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    return (
        <>
            <View style={staticStyle.receiveContainer}>
                <FastImage
                    tintColor={theme.colors.bgPrimary}
                    source={Config.appIcons.ic_reply}
                    style={staticStyle.receiveIcon}
                />
                <View
                    style={StyleSheet.flatten([
                        staticStyle.centerContainer,
                        staticStyle.receiveRadius,
                        styles.receiveContainer,
                    ])}
                >
                    <Components.TextComponent
                        family={'regular'}
                        text={data.response}
                        noOfLines={Infinity}
                        textStyle={StyleSheet.flatten([
                            staticStyle.messageText,
                            styles.messageText,
                        ])}
                    />
                    <Components.TextComponent
                        family={'regular'}
                        text={Utils.getTime(data.createdAt)}
                        textStyle={StyleSheet.flatten([
                            staticStyle.timeText,
                            styles.receiveTime,
                        ])}
                    />
                </View>
            </View>
            <View style={staticStyle.sendContainer}>
                <View
                    style={StyleSheet.flatten([
                        staticStyle.centerContainer,
                        staticStyle.sendRadius,
                        styles.sendContainer,
                    ])}
                >
                    <Components.TextComponent
                        family={'regular'}
                        text={data.request}
                        noOfLines={Infinity}
                        textStyle={StyleSheet.flatten([
                            staticStyle.messageText,
                            styles.sendMessageText,
                        ])}
                    />
                    <Components.TextComponent
                        family={'regular'}
                        text={Utils.getTime(data.createdAt)}
                        textStyle={StyleSheet.flatten([
                            staticStyle.timeText,
                            styles.timeText,
                        ])}
                    />
                </View>
                <FastImage
                    tintColor={theme.colors.primary}
                    source={Config.appIcons.ic_yourSend}
                    style={staticStyle.sendIcon}
                />
            </View>
        </>
    );
});
