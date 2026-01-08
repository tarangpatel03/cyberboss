import { StyleSheet, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import {Utils} from '@utils/index';
import { Components } from '@components/index';
import { memo } from 'react';
import FastImage from 'react-native-fast-image';
import { TChatBotChatModel } from '@models/formattedAPI/tChatbot';
import { Config } from '@config/index';

export const MessageCard = memo(({ data }: { data: TChatBotChatModel }) => {
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
          <Components.Text.RegularTextComponent
            text={data.response}
            noOfLines={Infinity}
            textStyle={StyleSheet.flatten([
              staticStyle.messageText,
              styles.messageText,
            ])}
          />
          <Components.Text.RegularTextComponent
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
          <Components.Text.RegularTextComponent
            text={data.request}
            noOfLines={Infinity}
            textStyle={StyleSheet.flatten([
              staticStyle.messageText,
              styles.sendMessageText,
            ])}
          />
          <Components.Text.RegularTextComponent
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

const staticStyle = StyleSheet.create({
  sendContainer: {
    paddingLeft: Utils.normalize(24),
    paddingBottom: Utils.normalize(12, 'height'),
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  receiveContainer: {
    paddingRight: Utils.normalize(24),
    paddingBottom: Utils.normalize(12, 'height'),
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  image: {
    alignSelf: 'center',
  },
  centerContainer: {
    paddingVertical: Utils.normalize(8, 'height'),
    paddingHorizontal: Utils.normalize(12),
    gap: Utils.normalize(6, 'height'),
  },
  sendRadius: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  receiveRadius: {
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  messageText: {
    fontSize: Utils.normalize(16),
    fontWeight: '400',
  },
  timeText: {
    fontSize: Utils.normalize(12),
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
  sendIcon: {
    top: 0,
    left: Utils.normalize(-1),
    width: Utils.normalize(8),
    height: Utils.normalize(8),
  },
  receiveIcon: {
    top: 0,
    right: Utils.normalize(-1),
    width: Utils.normalize(8),
    height: Utils.normalize(8),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    sendContainer: {
      backgroundColor: theme.colors.primary,
    },
    receiveContainer: {
      backgroundColor: theme.colors.bgPrimary,
    },
    sendMessageText: {
      color: theme.colors.pureWhite,
    },
    messageText: {
      color: theme.colors.textPrimary,
    },
    receiveTime: {
      color: theme.colors.textSecondary,
    },
    timeText: {
      color: theme.colors.bottomTabActiveBar,
    },
  });
