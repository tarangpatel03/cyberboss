import { useTheme } from '@shopify/restyle';
import { Rating } from 'react-native-ratings';
import { useTranslation } from 'react-i18next';
import { createStyles, staticStyle } from './styles';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ShimmerHolder } from '../ShimmerHolder';
import { MediumTextComponent } from '../../Text/MediumText';
import { PrimaryButtonComponent } from '../../Buttons/PrimaryButton';
import { Theme } from '../../../config/themes/themes';

export const ConsultantProfileScreenShimmer = () => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={staticStyle.profileContainer}>
          <View
            style={StyleSheet.flatten([
              staticStyle.rowLine,
              staticStyle.titleLine,
            ])}
          >
            <ShimmerHolder style={staticStyle.image} />
            <View style={staticStyle.gap8}>
              <ShimmerHolder style={staticStyle.titleText} />
              <View style={staticStyle.rowLine}>
                <ShimmerHolder style={staticStyle.subTitleText} />
              </View>
            </View>
          </View>
          <View
            style={StyleSheet.flatten([staticStyle.rowLine, staticStyle.line])}
          >
            <ShimmerHolder style={staticStyle.badgeContainer} />
            <ShimmerHolder style={staticStyle.badgeContainer} />
            <ShimmerHolder style={staticStyle.badgeContainer} />
          </View>
        </View>
        <View
          style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
        />
        <View style={staticStyle.secondaryContainer}>
          <MediumTextComponent
            text={t('about')}
            textStyle={StyleSheet.flatten([
              staticStyle.semiTitleText,
              styles.primaryText,
            ])}
          />
          <ShimmerHolder
            style={StyleSheet.flatten([
              staticStyle.subTitleText,
              staticStyle.fullWidth,
            ])}
          />
          <ShimmerHolder
            style={StyleSheet.flatten([
              staticStyle.subTitleText,
              staticStyle.fullWidth,
            ])}
          />
          <ShimmerHolder
            style={StyleSheet.flatten([
              staticStyle.subTitleText,
              staticStyle.fullWidth,
            ])}
          />
        </View>
        <View
          style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
        />
        <View style={staticStyle.secondaryContainer}>
          <MediumTextComponent
            text={t('expertiseAndServices')}
            textStyle={StyleSheet.flatten([
              staticStyle.semiTitleText,
              styles.primaryText,
            ])}
          />
          <View style={staticStyle.listContainer}>
            <ShimmerHolder style={staticStyle.badgeContainer} />
            <ShimmerHolder style={staticStyle.badgeContainer} />
            <ShimmerHolder style={staticStyle.badgeContainer} />
          </View>
          <View
            style={StyleSheet.flatten([
              staticStyle.separator2,
              styles.separator,
            ])}
          />
          <View style={staticStyle.listContainer}>
            <ShimmerHolder style={staticStyle.badgeContainer} />
            <ShimmerHolder style={staticStyle.badgeContainer} />
            <ShimmerHolder style={staticStyle.badgeContainer} />
          </View>
        </View>
        <View
          style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
        />
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
              style={StyleSheet.flatten([
                staticStyle.rowLine,
                staticStyle.line,
              ])}
            >
              <ShimmerHolder style={staticStyle.ratingTextShimmer} />
              <Rating
                readonly
                imageSize={20}
                ratingCount={5}
                fractions={true}
                startingValue={0}
                tintColor={theme.colors.bgPrimary}
              />
            </View>
            <ShimmerHolder style={staticStyle.subTitleText} />
          </View>
        </View>
      </ScrollView>
      <View
        style={StyleSheet.flatten([staticStyle.bottomBar, styles.separator])}
      >
        <ShimmerHolder
          style={StyleSheet.flatten([
            staticStyle.ratingTextShimmer,
            staticStyle.longerWidth,
          ])}
        />
        <PrimaryButtonComponent
          onPress={() => {}}
          text={t('bookNow')}
          buttonStyle={staticStyle.bookNowButton}
        />
      </View>
    </>
  );
};
