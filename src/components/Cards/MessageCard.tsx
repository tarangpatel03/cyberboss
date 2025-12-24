import { StyleSheet, View } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import normalize from '../../utils/normalize/normalize';
import { appIcons } from '../../config/icons/iconPath';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { getTime } from '../../utils/format/formatDate';
import { memo } from 'react';
import FastImage from 'react-native-fast-image';
import { IChatBotChatModel } from '../../models/formattedAPI/tChatbot';

export const MessageCard = memo(({ data }: { data: IChatBotChatModel }) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <>
      <View style={staticStyle.recieveContainer}>
        <FastImage
          tintColor={theme.colors.bgPrimary}
          source={appIcons.ic_reply}
          style={staticStyle.recieveIcon}
        />
        <View
          style={StyleSheet.flatten([
            staticStyle.centerContainer,
            staticStyle.recieveRadius,
            styles.recieveContainer,
          ])}
        >
          <RegularTextComponent
            text={data.response}
            noOfLines={Infinity}
            textStyle={StyleSheet.flatten([
              staticStyle.messageText,
              styles.messageText,
            ])}
          />
          <RegularTextComponent
            text={getTime(data.createdAt)}
            textStyle={StyleSheet.flatten([
              staticStyle.timeText,
              styles.recieveTime,
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
          <RegularTextComponent
            text={data.request}
            noOfLines={Infinity}
            textStyle={StyleSheet.flatten([
              staticStyle.messageText,
              styles.sendMessageText,
            ])}
          />
          <RegularTextComponent
            text={getTime(data.createdAt)}
            textStyle={StyleSheet.flatten([
              staticStyle.timeText,
              styles.timeText,
            ])}
          />
        </View>
        <FastImage
          tintColor={theme.colors.primary}
          source={appIcons.ic_yourSend}
          style={staticStyle.sendIcon}
        />
      </View>
    </>
  );
});

const staticStyle = StyleSheet.create({
  sendContainer: {
    paddingLeft: normalize(24),
    paddingBottom: normalize(12, 'height'),
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  recieveContainer: {
    paddingRight: normalize(24),
    paddingBottom: normalize(12, 'height'),
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  image: {
    alignSelf: 'center',
  },
  centerContainer: {
    paddingVertical: normalize(8, 'height'),
    paddingHorizontal: normalize(12),
    gap: normalize(6, 'height'),
  },
  sendRadius: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  recieveRadius: {
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  messageText: {
    fontSize: normalize(16),
    fontWeight: '400',
  },
  timeText: {
    fontSize: normalize(12),
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
  sendIcon: {
    top: 0,
    left: normalize(-1),
    width: normalize(8),
    height: normalize(8),
  },
  recieveIcon: {
    top: 0,
    right: normalize(-1),
    width: normalize(8),
    height: normalize(8),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    sendContainer: {
      backgroundColor: theme.colors.primary,
    },
    recieveContainer: {
      backgroundColor: theme.colors.bgPrimary,
    },
    sendMessageText: {
      color: theme.colors.pureWhite,
    },
    messageText: {
      color: theme.colors.textPrimary,
    },
    recieveTime: {
      color: theme.colors.textSecondary,
    },
    timeText: {
      color: theme.colors.bottomTabActiveBar,
    },
  });
