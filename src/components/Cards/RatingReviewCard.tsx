import {
  createStyles,
  staticStyle,
} from '@screens/client/ConsultantProfile/styles';
import { memo } from 'react';
import { useTheme } from '@shopify/restyle';
import { Rating } from 'react-native-ratings';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Theme } from '@config/themes/themes';
import { MediumTextComponent } from '@components/Text/MediumText';
import { RegularTextComponent } from '@components/Text/RegularText';

type ReviewCardProps = {
  item: any;
};

export const RatingCard = memo((props: ReviewCardProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.titleLine}>
      <View
        style={StyleSheet.flatten([staticStyle.separator2, styles.separator])}
      />
      <View style={StyleSheet.flatten([staticStyle.rowLine, staticStyle.line])}>
        <FastImage
          style={staticStyle.reviewImage}
          source={props.item.profileImage}
        />
        <MediumTextComponent
          text={props.item.name}
          textStyle={StyleSheet.flatten([
            staticStyle.subTitleText,
            styles.primaryText,
          ])}
        />
        <RegularTextComponent
          textStyle={StyleSheet.flatten([
            staticStyle.tinyText,
            styles.secondaryText,
          ])}
          text={props.item.date}
        />
      </View>
      <Rating
        readonly
        imageSize={15}
        ratingCount={5}
        style={staticStyle.rating}
        tintColor={theme.colors.bgPrimary}
        startingValue={props.item.rating}
      />
      <RegularTextComponent
        text={props.item.review}
        noOfLines={20}
        textStyle={StyleSheet.flatten([
          staticStyle.subTitleText,
          styles.secondaryText,
        ])}
      />
    </View>
  );
});
