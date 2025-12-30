import { useTheme } from '@shopify/restyle';
import { Rating } from 'react-native-ratings';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { staticStyle } from '../Skeleton/consultantProfile/styles';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { SemiBoldTextComponent } from '../Text/SemiBoldTextComponent';
import { createStyles } from '../../screens/client/ConsultantProfile/styles';
import { tConsultantDetailsModel } from '../../models/formattedAPI/tConsultant';

type consultantRatingsListProps = {
  data: tConsultantDetailsModel;
  renderItem: ({ item }: any) => Element;
};

export const ConsultantRatingsList = (props: consultantRatingsListProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={staticStyle.secondaryContainer}>
      <MediumTextComponent
        text={t('ratingsAndReviews')}
        textStyle={StyleSheet.flatten([
          staticStyle.semiTitleText,
          styles.primaryText,
        ])}
      />
      <View style={staticStyle.line}>
        <View
          style={StyleSheet.flatten([staticStyle.rowLine, staticStyle.line])}
        >
          <SemiBoldTextComponent
            text={`${props.data.averageRatings}`}
            textStyle={StyleSheet.flatten([
              staticStyle.ratingText,
              styles.primaryText,
            ])}
          />
          <Rating
            readonly
            imageSize={20}
            ratingCount={5}
            fractions={true}
            startingValue={props.data.averageRatings}
            tintColor={theme.colors.bgPrimary}
          />
        </View>
        <RegularTextComponent
          text={`${props.data.totalRatings} Ratings`}
          textStyle={StyleSheet.flatten([
            staticStyle.subTitleText,
            staticStyle.moveLeft,
            styles.secondaryText,
          ])}
        />
      </View>
    </View>
  );
};
