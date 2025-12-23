import { useTheme } from '@shopify/restyle';
import { Rating } from 'react-native-ratings';
import { useTranslation } from 'react-i18next';
import { createStyles, staticStyle } from './styles';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ShimmerHolder } from '../ShimmerHolder';
import { MediumTextComponent } from '../../Text/MediumTextComponent';
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
              <ShimmerHolder style={staticStyle.titletext} />
              <View style={staticStyle.rowLine}>
                <ShimmerHolder style={staticStyle.subtitletext} />
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
          style={StyleSheet.flatten([staticStyle.saperator, styles.saperator])}
        />
        <View style={staticStyle.secondaryContainer}>
          <MediumTextComponent
            text={t('about')}
            textStyle={StyleSheet.flatten([
              staticStyle.semititletext,
              styles.primaryText,
            ])}
          />
          <ShimmerHolder
            style={StyleSheet.flatten([
              staticStyle.subtitletext,
              staticStyle.fullWidth,
            ])}
          />
          <ShimmerHolder
            style={StyleSheet.flatten([
              staticStyle.subtitletext,
              staticStyle.fullWidth,
            ])}
          />
          <ShimmerHolder
            style={StyleSheet.flatten([
              staticStyle.subtitletext,
              staticStyle.fullWidth,
            ])}
          />
        </View>
        <View
          style={StyleSheet.flatten([staticStyle.saperator, styles.saperator])}
        />
        <View style={staticStyle.secondaryContainer}>
          <MediumTextComponent
            text={t('expertiseAndServices')}
            textStyle={StyleSheet.flatten([
              staticStyle.semititletext,
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
              staticStyle.saperator2,
              styles.saperator,
            ])}
          />
          <View style={staticStyle.listContainer}>
            <ShimmerHolder style={staticStyle.badgeContainer} />
            <ShimmerHolder style={staticStyle.badgeContainer} />
            <ShimmerHolder style={staticStyle.badgeContainer} />
          </View>
        </View>
        <View
          style={StyleSheet.flatten([staticStyle.saperator, styles.saperator])}
        />
        <View style={staticStyle.secondaryContainer}>
          <MediumTextComponent
            text={t('ratingsandReviews')}
            textStyle={StyleSheet.flatten([
              staticStyle.semititletext,
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
              <ShimmerHolder style={staticStyle.ratingtext} />
              <Rating
                readonly
                imageSize={20}
                ratingCount={5}
                fractions={true}
                startingValue={0}
                tintColor={theme.colors.bgPrimary}
              />
            </View>
            <ShimmerHolder style={staticStyle.subtitletext} />
          </View>
        </View>
      </ScrollView>
      <View
        style={StyleSheet.flatten([staticStyle.bottomBar, styles.saperator])}
      >
        <ShimmerHolder
          style={StyleSheet.flatten([
            staticStyle.ratingtext,
            staticStyle.longrtWidth,
          ])}
        />
        <PrimaryButtonComponent
          obj={{
            onPress: () => {},
            text: t('bookNow'),
            buttonStyle: staticStyle.booknowButton,
          }}
        />
      </View>
    </>
  );
};
