import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import normalize from '../../utils/normalize/normalize';
import { MediumTextComponent } from '../Text/MediumText';
import { RegularTextComponent } from '../Text/RegularText';
import { appIcons } from '../../config/icons/iconPath';
import { formatBooking } from '../../utils/format/formatDate';
import FastImage from 'react-native-fast-image';
import { memo, useState } from 'react';
import { TExpertiseModel } from '../../models/formattedAPI/tConsultant';
import { getProfilePicture } from '../../utils/extractURI/extractImageURI';

type ServiceCardProps = {
  data: TExpertiseModel;
  onPress: (id: string, name: string) => void;
};

export const ServiceCard = memo(({ data, onPress }: ServiceCardProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <TouchableOpacity
      onPress={() => onPress(data.id, data.name)}
      activeOpacity={0.7}
      style={StyleSheet.flatten([staticStyle.container, styles.container])}
    >
      <View style={staticStyle.heading}>
        <FastImage
          source={
            imageError ? appIcons.ic_noImage : getProfilePicture(data.image)
          }
          onError={() => setImageError(true)}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={imageError ? theme.colors.textPrimary : ''}
          style={staticStyle.image}
        />
        <MediumTextComponent
          text={data.name}
          textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
        />
      </View>
      <View style={staticStyle.details}>
        <View style={staticStyle.heading}>
          <FastImage source={appIcons.ic_cash} style={staticStyle.icon} />
          <RegularTextComponent
            text={`$${Number(data.rate)}/hr`}
            textStyle={StyleSheet.flatten([
              staticStyle.subTitle,
              styles.subTitle,
            ])}
          />
        </View>
        {data.bookingCount !== 0 && (
          <View style={staticStyle.heading}>
            <FastImage source={appIcons.ic_check} style={staticStyle.icon} />
            <RegularTextComponent
              text={formatBooking(data.bookingCount ?? 0)}
              textStyle={StyleSheet.flatten([
                staticStyle.subTitle,
                styles.subTitle,
              ])}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});

const staticStyle = StyleSheet.create({
  container: {
    gap: normalize(16, 'height'),
    width: '93%',
    alignSelf: 'center',
    borderRadius: normalize(12),
    padding: normalize(12),
    borderWidth: 1,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  title: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  subTitle: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  details: {
    gap: normalize(12),
  },
  image: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(8),
  },
  icon: {
    width: normalize(14),
    height: normalize(14),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderPrimary,
    },
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
  });
