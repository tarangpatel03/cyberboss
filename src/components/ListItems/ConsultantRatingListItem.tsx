import { useTheme } from '@shopify/restyle';
import { Rating } from 'react-native-ratings';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Components } from '@components/index';
import { TConsultantDetailsModel } from '@models/formattedAPI/tConsultant';
import { Utils } from '@utils/index';

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
      <Components.Text.MediumTextComponent
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
          <Components.Text.SemiBoldTextComponent
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
        <Components.Text.RegularTextComponent
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

export const staticStyle = StyleSheet.create({
  secondaryContainer: {
    gap: Utils.normalize(16),
    paddingHorizontal: Utils.normalize(12),
    paddingVertical: Utils.normalize(20),
  },
  moveLeft: {
    left: Utils.normalize(4),
  },
  ratingText: {
    fontWeight: '700',
    fontSize: Utils.normalize(16, 'height'),
  },
  semiTitleText: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
  subTitleText: {
    height: Utils.normalize(14),
    width: Utils.normalize(100),
    borderRadius: Utils.normalize(4),
  },
  line: {
    gap: Utils.normalize(8),
  },
  rowLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    primaryText: {
      color: theme.colors.textPrimary,
    },
    secondaryText: {
      color: theme.colors.textSecondary,
    },
  });