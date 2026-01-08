import { useTheme } from '@shopify/restyle';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import {Utils} from '@utils/index';
import { Components } from '@components/index';
import { width } from '@config/constants/variables';
import FastImage from 'react-native-fast-image';
import { memo } from 'react';
import { THomeBookingModel } from '@models/formattedAPI/tBookings';
import { Config } from '@config/index';

type BookingHistoryCardProps = {
  data: THomeBookingModel;
  navigateToChat: ({
    bookingId,
    id,
    image,
    name,
  }: {
    bookingId: string;
    id: string;
    image: string | number | { uri: string } | undefined;
    name: string;
  }) => void;
};

export const BookingHistoryCard = memo((props: BookingHistoryCardProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={StyleSheet.flatten([staticStyle.container, styles.container])}>
      <View style={StyleSheet.flatten([staticStyle.header, styles.header])}>
        <FastImage
          style={staticStyle.image}
          source={Config.appImages.img_defaultProfile}
        />
        <View style={staticStyle.topText}>
          <Components.TextComponent
            family={'medium'}
            text={props.data.userName}
            textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
          />
          <Components.TextComponent
            family={'regular'}
            text={Utils.getFullDate(props.data.bookingDate)}
            textStyle={StyleSheet.flatten([
              staticStyle.subTitle,
              styles.subTitle,
            ])}
          />
        </View>
      </View>
      <View style={staticStyle.detail}>
        <View style={staticStyle.header}>
          <FastImage style={staticStyle.icons} source={Config.appIcons.ic_suitcase} />
          <Components.TextComponent
            family={'regular'}
            text={props.data.categoryName}
            textStyle={StyleSheet.flatten([
              staticStyle.subTitle,
              styles.subTitle,
            ])}
          />
        </View>
        <View style={staticStyle.header}>
          <FastImage style={staticStyle.icons} source={Config.appIcons.ic_cash} />
          <Components.TextComponent
            family={'regular'}
            text={`$${props.data.grandTotal}`}
            textStyle={StyleSheet.flatten([
              staticStyle.subTitle,
              styles.subTitle,
            ])}
          />
        </View>
      </View>
      {props.data.status === 'In progress' && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            props.navigateToChat({
              bookingId: props.data.bookingId,
              id: props.data.userId,
              image: props.data.userProfilePicture,
              name: props.data.userName,
            })
          }
          style={StyleSheet.flatten([staticStyle.button, styles.button])}
        >
          <FastImage
            tintColor={theme.colors.primary}
            source={Config.appIcons.ic_fillChat}
            style={staticStyle.chat}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});

const staticStyle = StyleSheet.create({
  container: {
    gap: Utils.normalize(16),
    width: Utils.normalize(width * 0.6),
    borderRadius: Utils.normalize(12),
    padding: Utils.normalize(12),
    borderWidth: 1,
  },
  topText: {
    gap: Utils.normalize(4),
  },
  header: {
    gap: Utils.normalize(8, 'height'),
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: Utils.normalize(36),
    height: Utils.normalize(36),
    borderRadius: Utils.normalize(18),
  },
  title: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
  icons: {
    width: Utils.normalize(14),
    height: Utils.normalize(14),
  },
  subTitle: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  detail: {
    gap: Utils.normalize(12),
  },
  button: {
    borderWidth: 1,
    width: Utils.normalize(32),
    height: Utils.normalize(32),
    borderRadius: Utils.normalize(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chat: {
    width: Utils.normalize(16),
    height: Utils.normalize(16),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderPrimary,
    },
    header: {},
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
    button: {
      borderColor: theme.colors.borderPrimary,
      backgroundColor: theme.colors.bgBookingHistory,
    },
    chat: {
      tintColor: theme.colors.primary,
    },
  });
