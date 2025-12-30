import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Theme } from '../../config/themes/themes';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { createStyles, staticStyle } from '../../screens/common/Rating/styles';

type starReviewCardProps = {
  showStar: (starCount: number) => any;
  setStarRating: (starCount: number) => void;
};

export const StarReviewCard = (props: starReviewCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.ratingLine}>
      <TouchableOpacity
        onPress={() => props.setStarRating(1)}
        style={staticStyle.ratingContainer}
        activeOpacity={0.9}
      >
        <FastImage source={props.showStar(1)} style={staticStyle.star} />
        <RegularTextComponent
          text={t('terrible')}
          textStyle={StyleSheet.flatten([
            staticStyle.tinyText,
            styles.secondaryText,
          ])}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.setStarRating(2)}
        style={staticStyle.ratingContainer}
      >
        <FastImage source={props.showStar(2)} style={staticStyle.star} />
        <RegularTextComponent
          text={t('bad')}
          textStyle={StyleSheet.flatten([
            staticStyle.tinyText,
            styles.secondaryText,
          ])}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.setStarRating(3)}
        style={staticStyle.ratingContainer}
      >
        <FastImage source={props.showStar(3)} style={staticStyle.star} />
        <RegularTextComponent
          text={t('okay')}
          textStyle={StyleSheet.flatten([
            staticStyle.tinyText,
            styles.secondaryText,
          ])}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.setStarRating(4)}
        style={staticStyle.ratingContainer}
      >
        <FastImage source={props.showStar(4)} style={staticStyle.star} />
        <RegularTextComponent
          text={t('good')}
          textStyle={StyleSheet.flatten([
            staticStyle.tinyText,
            styles.secondaryText,
          ])}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.setStarRating(5)}
        style={staticStyle.ratingContainer}
      >
        <FastImage source={props.showStar(5)} style={staticStyle.star} />
        <RegularTextComponent
          text={t('excellent')}
          textStyle={StyleSheet.flatten([
            staticStyle.tinyText,
            styles.secondaryText,
          ])}
        />
      </TouchableOpacity>
    </View>
  );
};
