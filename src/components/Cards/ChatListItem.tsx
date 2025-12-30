import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import normalize from '../../utils/normalize/normalize';
import FastImage from 'react-native-fast-image';
import { memo } from 'react';
import { appImages } from '../../config/images/imagePath';

type chatListItemProps = {
  name: string;
  uid: string;
  lastMessage: string;
  // time: string;
  unread: {
    [symbol: string]: number;
  };
  onPress: () => void;
};

export const ChatListItem = memo((props: chatListItemProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPress}
      style={StyleSheet.flatten([staticStyle.container, styles.container])}
    >
      <FastImage
        source={appImages.img_defaultProfile}
        style={staticStyle.image}
      />
      <View style={staticStyle.info}>
        <View style={staticStyle.line}>
          <MediumTextComponent
            text={props.name}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              styles.titleText,
            ])}
          />
          {/* <MediumTextComponent
            text={props.time}
            textStyle={StyleSheet.flatten([
              staticStyle.timeText,
              props.unread > 0 ? styles.timeUnreadText : styles.timeText,
            ])}
          /> */}
        </View>
        <View style={staticStyle.line}>
          <RegularTextComponent
            text={props.lastMessage}
            noOfLines={1}
            textStyle={StyleSheet.flatten([
              staticStyle.msgText,
              styles.msgText,
            ])}
          />
          {props.unread.uid > 0 && (
            <View
              style={StyleSheet.flatten([
                staticStyle.unReadContainer,
                styles.unReadContainer,
              ])}
            >
              <RegularTextComponent
                text={`${props.unread.uid}`}
                textStyle={StyleSheet.flatten([
                  staticStyle.unReadText,
                  styles.unReadText,
                ])}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});

const staticStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(16, 'height'),
    borderBottomWidth: 0.5,
    gap: normalize(8),
  },
  info: {
    gap: normalize(4, 'height'),
  },
  line: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  msgText: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  timeText: {
    fontSize: normalize(12),
    fontWeight: '500',
  },
  unReadContainer: {
    width: normalize(23),
    height: normalize(17, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(18),
  },
  unReadText: {
    fontSize: normalize(12),
    fontWeight: '400',
  },
  image: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(24),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderBottomColor: theme.colors.borderPrimary,
    },
    titleText: {
      color: theme.colors.textPrimary,
    },
    msgText: {
      color: theme.colors.textSecondary,
    },
    timeText: {
      color: theme.colors.textSecondary,
    },
    timeUnreadText: {
      color: theme.colors.primary,
    },
    unReadContainer: {
      backgroundColor: theme.colors.primary,
    },
    unReadText: {
      color: theme.colors.pureWhite,
    },
  });
