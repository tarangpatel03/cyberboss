import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import normalize from '../../utils/normalize/normalize';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { appIcons } from '../../config/icons/iconPath';
import { formatBooking } from '../../utils/format/formatDate';
import { appImages } from '../../config/images/imagePath';
import FastImage from 'react-native-fast-image';
import { memo, useState } from 'react';
import { tConsultantModel } from '../../models/formattedAPI/tConsultant';
import { getProfilePicture } from '../../utils/extractURI/extractImageURI';

type consultantListCardProps = {
  data: tConsultantModel;
  onPress: (consultantId: string) => void;
};

export const ConsultantListCard = memo(
  ({ data, onPress }: consultantListCardProps) => {
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
                ? appImages.img_defaultProfile
                : getProfilePicture(data.profilePicture) ??
                  appImages.img_defaultProfile
            }
            onError={() => setProfilePictureError(true)}
          />
          <View
            style={StyleSheet.flatten([
              staticStyle.ratingContainer,
              styles.ratingContainer,
            ])}
          >
            <FastImage source={appIcons.ic_star} style={staticStyle.starIcon} />
            <MediumTextComponent
              text={`${data.rating}`}
              textStyle={StyleSheet.flatten([
                staticStyle.ratingText,
                styles.ratingText,
              ])}
            />
          </View>
        </View>
        <View style={staticStyle.detailContainer}>
          <MediumTextComponent
            text={data.name}
            textStyle={StyleSheet.flatten([staticStyle.name, styles.name])}
          />
          <View style={staticStyle.detailLineContainer}>
            {data.bookings > 0 && (
              <View style={staticStyle.detailLine}>
                <FastImage
                  source={appIcons.ic_check}
                  style={staticStyle.icons}
                />
                <RegularTextComponent
                  text={formatBooking(data.bookings)}
                  textStyle={StyleSheet.flatten([
                    staticStyle.detailText,
                    styles.detailText,
                  ])}
                />
              </View>
            )}
            <View style={staticStyle.detailLine}>
              <FastImage
                source={appIcons.ic_experience}
                style={staticStyle.icons}
              />
              <RegularTextComponent
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
    borderRadius: normalize(12),
    padding: normalize(12),
    gap: normalize(16),
    borderWidth: 0.75,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePictureContainer: {
    width: normalize(80),
    height: normalize(89),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    borderWidth: 1,
    bottom: normalize(0, 'height'),
    gap: normalize(3),
    borderRadius: normalize(27),
    paddingVertical: normalize(3, 'height'),
    paddingHorizontal: normalize(8),
  },
  profilePicture: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
  },
  name: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  detailText: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  detailContainer: {
    gap: normalize(12, 'height'),
  },
  detailLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  ratingText: {
    fontSize: normalize(10),
    fontWeight: '500',
  },
  detailLineContainer: {
    gap: normalize(8),
  },
  starIcon: { width: normalize(10), height: normalize(10) },
  icons: { width: normalize(14), height: normalize(14) },
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
