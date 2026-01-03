import { useTheme } from '@shopify/restyle';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Rating } from 'react-native-ratings';
import { appImages } from '../../config/images/imagePath';
import { getFullDate } from '../../utils/format/formatDate';
import { MediumTextComponent } from '../Text/MediumText';
import { RegularTextComponent } from '../Text/RegularText';
import { Theme } from '../../config/themes/themes';
import {
  createStyles,
  staticStyle,
} from '../../screens/client/ConsultantProfile/styles';
import { TRatingReviewModel } from '../../models/formattedAPI/tConsultant';
import { memo } from 'react';

export const ReviewCard = memo((props: TRatingReviewModel) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.reviewCard}>
      <View
        style={StyleSheet.flatten([staticStyle.separator2, styles.separator])}
      />
      <View style={StyleSheet.flatten([staticStyle.rowLine, staticStyle.line])}>
        <FastImage
          style={staticStyle.reviewImage}
          source={appImages.img_defaultProfile}
        />
        <MediumTextComponent
          text={props.clientName}
          textStyle={StyleSheet.flatten([
            staticStyle.subTitleText,
            styles.primaryText,
          ])}
        />
        <View
          style={StyleSheet.flatten([
            staticStyle.bulletPoint,
            styles.bulletPoint,
          ])}
        />
        <RegularTextComponent
          textStyle={StyleSheet.flatten([
            staticStyle.tinyText,
            styles.secondaryText,
          ])}
          text={getFullDate(props.createdAt)}
        />
      </View>
      <Rating
        readonly
        imageSize={15}
        ratingCount={5}
        style={staticStyle.rating}
        tintColor={theme.colors.bgPrimary}
        startingValue={Number(props.rating)}
      />
      <RegularTextComponent
        textStyle={StyleSheet.flatten([
          staticStyle.tinyText,
          styles.secondaryText,
        ])}
        noOfLines={7}
        text={props.review ?? ''}
      />
    </View>
  );
});
