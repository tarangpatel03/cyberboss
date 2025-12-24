import { StyleSheet, View } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import normalize from '../../utils/normalize/normalize';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { appIcons } from '../../config/icons/iconPath';
import { getDate } from '../../utils/format/formatDate';
import FastImage from 'react-native-fast-image';
import { memo } from 'react';
import { INotificationModel } from '../../models/formattedAPI/tNotificationModel';

export const NotificationCard = memo(
  ({ data }: { data: INotificationModel }) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    return (
      <View style={staticStyle.container}>
        {data.image ? (
          <FastImage source={{ uri: data.image }} style={staticStyle.image} />
        ) : (
          <View
            style={StyleSheet.flatten([
              staticStyle.image,
              staticStyle.defaultNotificationBell,
              styles.defaultNotificationBell,
            ])}
          >
            <FastImage
              source={appIcons.ic_bellFill}
              style={staticStyle.bellIcon}
            />
          </View>
        )}
        <View style={staticStyle.text}>
          <RegularTextComponent
            text={data.body}
            noOfLines={2}
            textStyle={StyleSheet.flatten([
              staticStyle.notificationText,
              styles.textPrimary,
            ])}
          />
          <RegularTextComponent
            text={getDate(data.createdAt)}
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
    gap: normalize(10),
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: normalize(30),
    marginVertical: normalize(10),
  },
  text: {
    width: '90%',
  },
  image: {
    borderRadius: normalize(30),
    width: normalize(48),
    height: normalize(48),
  },
  notificationText: {
    fontSize: normalize(16),
    fontWeight: '400',
  },
  time: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  defaultNotificationBell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    width: normalize(24),
    height: normalize(24),
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
