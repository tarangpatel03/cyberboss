import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import { Utils } from '@utils/index';
import { Components } from '@components/index';
import FastImage from 'react-native-fast-image';
import { memo, useState } from 'react';
import { TConsultantModel } from '@models/formattedAPI/tConsultant';
import { Config } from '@config/index';

type ConsultantListCardProps = {
  data: TConsultantModel;
  onPress: (consultantId: string) => void;
};

export const ConsultantListCard = memo(
  ({ data, onPress }: ConsultantListCardProps) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const [profilePictureError, setProfilePictureError] =
      useState<boolean>(false);

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          onPress ? onPress(data.id) : null;
        }}
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.profilePictureContainer}>
          <FastImage
            style={staticStyle.profilePicture}
            source={
              profilePictureError
                ? Config.appImages.img_defaultProfile
                : Utils.getProfilePicture(data.profilePicture) ??
                  Config.appImages.img_defaultProfile
            }
            onError={() => setProfilePictureError(true)}
          />
          <View
            style={StyleSheet.flatten([
              staticStyle.ratingContainer,
              styles.ratingContainer,
            ])}
          >
            <FastImage
              source={Config.appIcons.ic_star}
              style={staticStyle.starIcon}
            />
            <Components.TextComponent
              family={'medium'}
              text={`${data.rating}`}
              textStyle={StyleSheet.flatten([
                staticStyle.ratingText,
                styles.ratingText,
              ])}
            />
          </View>
        </View>
        <View style={staticStyle.detailContainer}>
          <Components.TextComponent
            family={'medium'}
            text={data.name}
            textStyle={StyleSheet.flatten([staticStyle.name, styles.name])}
          />
          <View style={staticStyle.detailLineContainer}>
            {data.bookings > 0 && (
              <View style={staticStyle.detailLine}>
                <FastImage
                  source={Config.appIcons.ic_check}
                  style={staticStyle.icons}
                />
                <Components.TextComponent
                  family={'regular'}
                  text={Utils.formatBooking(data.bookings)}
                  textStyle={StyleSheet.flatten([
                    staticStyle.detailText,
                    styles.detailText,
                  ])}
                />
              </View>
            )}
            <View style={staticStyle.detailLine}>
              <FastImage
                source={Config.appIcons.ic_experience}
                style={staticStyle.icons}
              />
              <Components.TextComponent
                family={'regular'}
                text={`Exp: ${data.experienceYear} Years`}
                textStyle={StyleSheet.flatten([
                  staticStyle.detailText,
                  styles.detailText,
                ])}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const staticStyle = StyleSheet.create({
  container: {
    borderRadius: Utils.normalize(12),
    padding: Utils.normalize(12),
    gap: Utils.normalize(16),
    borderWidth: 0.75,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePictureContainer: {
    width: Utils.normalize(80),
    height: Utils.normalize(89),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    borderWidth: 1,
    bottom: Utils.normalize(0, 'height'),
    gap: Utils.normalize(3),
    borderRadius: Utils.normalize(27),
    paddingVertical: Utils.normalize(3, 'height'),
    paddingHorizontal: Utils.normalize(8),
  },
  profilePicture: {
    width: Utils.normalize(80),
    height: Utils.normalize(80),
    borderRadius: Utils.normalize(40),
  },
  name: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
  detailText: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  detailContainer: {
    gap: Utils.normalize(12, 'height'),
  },
  detailLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Utils.normalize(8),
  },
  ratingText: {
    fontSize: Utils.normalize(10),
    fontWeight: '500',
  },
  detailLineContainer: {
    gap: Utils.normalize(8),
  },
  starIcon: { width: Utils.normalize(10), height: Utils.normalize(10) },
  icons: { width: Utils.normalize(14), height: Utils.normalize(14) },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
      borderColor: theme.colors.borderPrimary,
    },
    ratingContainer: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.bgPrimary,
    },
    name: {
      color: theme.colors.textPrimary,
    },
    detailText: {
      color: theme.colors.textSecondary,
    },
    ratingText: {
      color: theme.colors.pureWhite,
    },
  });
