import { StyleSheet, View } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import normalize from '../../utils/normalize/normalize';
import { appIcons } from '../../config/icons/iconPath';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import FastImage from 'react-native-fast-image';
import { memo } from 'react';

type messageCardProps = {
  type: 'send' | 'receive';
  image?: number | { uri: string } | undefined;
  message: string;
  time: string;
};

export const OneOnOneCard = memo((props: messageCardProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View
      style={
        props.type === 'send'
          ? staticStyle.sendContainer
          : staticStyle.receiveContainer
      }
    >
      {props.type === 'receive' && (
        <FastImage
          tintColor={theme.colors.bgPrimary}
          source={appIcons.ic_reply}
          style={staticStyle.receiveIcon}
        />
      )}
      <View
        style={StyleSheet.flatten([
          staticStyle.centerContainer,
          props.type === 'send'
            ? staticStyle.sendRadius
            : staticStyle.receiveRadius,
          props.type === 'send'
            ? styles.sendContainer
            : styles.receiveContainer,
        ])}
      >
        {props.image && (
          <FastImage source={props.image} style={staticStyle.image} />
        )}
        <RegularTextComponent
          text={props.message}
          noOfLines={Infinity}
          textStyle={StyleSheet.flatten([
            staticStyle.messageText,
            props.type === 'send' ? styles.sendMessageText : styles.messageText,
          ])}
        />
        <RegularTextComponent
          text={props.time}
          textStyle={StyleSheet.flatten([
            staticStyle.timeText,
            props.type === 'send' ? styles.timeText : styles.receiveTime,
          ])}
        />
      </View>
      {props.type === 'send' && (
        <FastImage
          source={appIcons.ic_yourSend}
          tintColor={theme.colors.primary}
          style={staticStyle.sendIcon}
        />
      )}
    </View>
  );
});

const staticStyle = StyleSheet.create({
  sendContainer: {
    paddingLeft: normalize(24),
    paddingBottom: normalize(12, 'height'),
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  receiveContainer: {
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
  receiveRadius: {
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
  receiveIcon: {
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
