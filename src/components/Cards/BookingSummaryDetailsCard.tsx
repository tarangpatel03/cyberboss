import {
  createStyles,
  staticStyle,
} from '../../screens/common/BookingSummary/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Theme } from '../../config/themes/themes';
import LinearGradient from 'react-native-linear-gradient';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import {
  getGradientColor,
  getServiceImage,
} from '../../utils/gradientColor/gradientColor';
import { tBookingDetailsModel } from '../../models/formattedAPI/tBookings';
import { getProfilePicture } from '../../utils/extractURI/extractImageURI';
import { appImages } from '../../config/images/imagePath';
import { useState } from 'react';
import { Rating } from 'react-native-ratings';

type bookingSummaryDetailsCardProps = {
  userRole: 'consultant' | 'client';
  data: tBookingDetailsModel | undefined;
  review: any;
  navigateToConsultantProfile: () => void;
};

export const BookingSummaryDetailsCard = (
  props: bookingSummaryDetailsCardProps,
) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <View style={StyleSheet.flatten([staticStyle.card, styles.container])}>
      <MediumTextComponent
        textStyle={StyleSheet.flatten([
          staticStyle.titleText,
          styles.secondaryText,
        ])}
        text={t('bookingDetails')}
      />
      <View
        style={StyleSheet.flatten([
          staticStyle.separator,
          staticStyle.fullWidth,
          styles.separator,
        ])}
      />
      <View style={staticStyle.rowLine}>
        <TouchableOpacity
          disabled={props.userRole === 'consultant'}
          activeOpacity={0.9}
          onPress={props.navigateToConsultantProfile}
        >
          <FastImage
            source={
              imageError
                ? appImages.img_defaultProfile
                : getProfilePicture(props.data?.userProfilePicture)
            }
            onError={() => setImageError(true)}
            style={staticStyle.profileImage}
          />
        </TouchableOpacity>
        <View style={staticStyle.fullLengthView}>
          <MediumTextComponent
            text={props.data?.userName ?? ''}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              styles.primaryText,
            ])}
          />
          <RegularTextComponent
            text={`${props.data?.hours}hr`}
            textStyle={StyleSheet.flatten([
              staticStyle.subtitleText,
              styles.secondaryText,
            ])}
          />
        </View>
        <MediumTextComponent
          text={`$${props.data?.total}`}
          textStyle={StyleSheet.flatten([
            staticStyle.titleText,
            staticStyle.text,
            styles.primaryText,
          ])}
        />
      </View>
      <LinearGradient
        end={{
          x: 1,
          y: 0.5,
        }}
        start={{
          x: 0,
          y: 0.5,
        }}
        colors={getGradientColor(props.data?.expertise?.name)}
        style={staticStyle.gradient}
      >
        <View
          style={StyleSheet.flatten([
            staticStyle.rowLine,
            staticStyle.padding8,
          ])}
        >
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={getServiceImage(props.data?.expertise?.name)}
            style={staticStyle.categoryIcon}
          />
          <RegularTextComponent
            text={props.data?.expertise?.name ?? ''}
            textStyle={StyleSheet.flatten([
              styles.primaryText,
              staticStyle.subtitleText,
            ])}
          />
        </View>
      </LinearGradient>
      <View
        style={StyleSheet.flatten([styles.separator, staticStyle.separator])}
      />
      <TouchableOpacity
        style={StyleSheet.flatten([staticStyle.input, styles.innerContainer])}
        activeOpacity={1}
      >
        <View style={staticStyle.horizontalCard}>
          <MediumTextComponent
            text={
              props.review?.[0]?.reviews
                ? t('yourRating')
                : t('rateYourExperience')
            }
            textStyle={StyleSheet.flatten([
              styles.secondaryText,
              staticStyle.titleText,
            ])}
          />
          <Rating
            imageSize={18}
            ratingCount={5}
            readonly
            startingValue={props?.review?.[0]?.rating}
            tintColor={theme.colors.bgSecondary}
          />
        </View>
        {props.review?.[0]?.reviews && (
          <View>
            <RegularTextComponent
              text={props.review?.[0].reviews}
              noOfLines={200}
              textStyle={StyleSheet.flatten([
                staticStyle.subtitleText,
                styles.primaryText,
              ])}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
