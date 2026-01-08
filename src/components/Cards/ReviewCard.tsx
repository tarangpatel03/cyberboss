import { useTheme } from '@shopify/restyle';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Rating } from 'react-native-ratings';
import { Components } from '@components/index';
import { Theme } from '@config/themes/themes';
import {
  createStyles,
  staticStyle,
} from '@screens/client/ConsultantProfile/styles';
import { TRatingReviewModel } from '@models/formattedAPI/tConsultant';
import { memo } from 'react';
import { Utils } from '@utils/index';
import { Config } from '@config/index';

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
          source={Config.appImages.img_defaultProfile}
        />
        <Components.TextComponent
          family={'medium'}
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
        <Components.TextComponent
          family={'regular'}
          textStyle={StyleSheet.flatten([
            staticStyle.tinyText,
            styles.secondaryText,
          ])}
          text={Utils.getFullDate(props.createdAt)}
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
      <Components.TextComponent
        family={'regular'}
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
