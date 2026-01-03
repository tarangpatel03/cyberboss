import { useTheme } from '@shopify/restyle';
import { Rating } from 'react-native-ratings';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { MediumTextComponent } from '../Text/MediumText';
import { staticStyle } from '../Skeleton/consultantProfile/styles';
import { RegularTextComponent } from '../Text/RegularText';
import { SemiBoldTextComponent } from '../Text/SemiBoldText';
import { createStyles } from '../../screens/client/ConsultantProfile/styles';
import { TConsultantDetailsModel } from '../../models/formattedAPI/tConsultant';

type ConsultantRatingsListProps = {
  data: TConsultantDetailsModel;
  renderItem: ({ item }: any) => Element;
};

export const ConsultantRatingsList = (props: ConsultantRatingsListProps) => {
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
