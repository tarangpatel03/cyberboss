import {
  createStyles,
  staticStyle,
} from '../../screens/common/BookingSummary/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Theme } from '../../config/themes/themes';
import LinearGradient from 'react-native-linear-gradient';
import { View, StyleSheet } from 'react-native';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { getGradientColor } from '../../utils/gradientColor/gradiantColor';
import { tBookingDetailsModel } from '../../models/formattedAPI/tBookings';

type bookingSummaryDetailsCardProps = {
  // rating: number;
  // ratingText: string;
  // navigateToRating: () => void;
  userRole: 'consultant' | 'client';
  data: tBookingDetailsModel;
  // navigateToConsultantProfile: (id: string) => void;
};

export const BookingSummaryDetailsCard = (
  props: bookingSummaryDetailsCardProps,
) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

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
          staticStyle.saperator,
          staticStyle.fullWidth,
          styles.saperator,
        ])}
      />
      <View style={staticStyle.rowLine}>
        {/* <TouchableOpacity
          disabled={props.userRole === 'consultant'}
          activeOpacity={0.9}
          onPress={() => props.navigateToConsultantProfile(props.data.)}
        > */}
        <FastImage
          source={props.data.consultantProfilePicture}
          style={staticStyle.profileImage}
        />
        {/* </TouchableOpacity> */}
        <View style={staticStyle.fullLengthView}>
          <MediumTextComponent
            text={props.data.consultantName}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              styles.primaryText,
            ])}
          />
          <RegularTextComponent
            text={`${props.data.hours}hr`}
            textStyle={StyleSheet.flatten([
              staticStyle.subtitleText,
              styles.secondaryText,
            ])}
          />
        </View>
        <MediumTextComponent
          text={`$${props.data.total}`}
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
        colors={getGradientColor(props.data.expertise.name)}
        style={staticStyle.gradient}
      >
        <View style={staticStyle.rowLine}>
          <FastImage
            // source={props.data.category.image}
            style={staticStyle.categoryIcon}
          />
          <RegularTextComponent
            text={props.data.expertise.name}
            textStyle={StyleSheet.flatten([
              styles.primaryText,
              staticStyle.subtitleText,
            ])}
          />
        </View>
      </LinearGradient>
      <View
        style={StyleSheet.flatten([styles.saperator, staticStyle.saperator])}
      />
      {/* <TouchableOpacity
        style={StyleSheet.flatten([staticStyle.input, styles.innerContainer])}
        activeOpacity={1}
        onPress={props.navigateToRating}
      >
        <View style={staticStyle.horizontalCard}>
          <MediumTextComponent
            text={
              props.ratingText.length === 0
                ? t('rateYourExperience')
                : t('yourRating')
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
            startingValue={props.rating}
            tintColor={theme.colors.bgSecondary}
          />
        </View>
        {props.ratingText.length > 0 && (
          <View>
            <RegularTextComponent
              text={props.ratingText}
              noOfLines={200}
              textStyle={StyleSheet.flatten([
                staticStyle.subtitleText,
                styles.primaryText,
              ])}
            />
          </View>
        )}
      </TouchableOpacity> */}
    </View>
  );
};
