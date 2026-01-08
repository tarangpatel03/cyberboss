import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from '@screens/client/BookingConfirm/styles';
import { Theme } from '@config/themes/themes';
import { StyleSheet, View } from 'react-native';
import { routeName } from '@config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigationProps } from '@models/navigationModel';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { Utils } from '@utils/index';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const BookingConfirmScreen = ({
  navigation,
  route,
}: RootNavigationProps<routeName.BookingConfirm>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const bookingData = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.bgPrimary])}
      >
        <Components.Headers.ScreenHeader onPress={goBack} />
        <View style={staticStyle.mainContainer}>
          <View style={staticStyle.confirmCard}>
            <FastImage
              source={Config.appIcons.ic_confirm}
              style={staticStyle.confirmIcon}
            />
            <View style={staticStyle.confirmLine}>
              <Components.Text.SemiBoldTextComponent
                text={t('bookingConfirmed')}
                textStyle={StyleSheet.flatten([
                  staticStyle.confirmText,
                  styles.textPrimary,
                ])}
              />
              <Components.Text.RegularTextComponent
                text={t('consultantWillReachOutToYouViaInAppChat')}
                textStyle={StyleSheet.flatten([
                  staticStyle.subtitleText,
                  styles.textSecondary,
                ])}
              />
            </View>
            <View
              style={StyleSheet.flatten([
                staticStyle.summaryCard,
                styles.summaryCard,
              ])}
            >
              <View
                style={StyleSheet.flatten([
                  staticStyle.row,
                  styles.bottomBorder,
                ])}
              >
                <Components.Text.MediumTextComponent
                  text={`${t('bookingId')}: #RTX5090`}
                  textStyle={StyleSheet.flatten([
                    staticStyle.titleText,
                    styles.textSecondary,
                  ])}
                />
              </View>
              <View style={staticStyle.rowLine}>
                <FastImage
                  source={
                    bookingData.image
                      ? { uri: bookingData.image }
                      : Config.appImages.img_defaultProfile
                  }
                  style={staticStyle.profileImage}
                />
                <View style={staticStyle.fullLengthView}>
                  <Components.Text.MediumTextComponent
                    text={bookingData.name}
                    textStyle={StyleSheet.flatten([
                      staticStyle.titleText,
                      styles.textPrimary,
                    ])}
                  />
                  <Components.Text.RegularTextComponent
                    text={`${bookingData.hours}hr`}
                    textStyle={StyleSheet.flatten([
                      staticStyle.subtitleText,
                      styles.textSecondary,
                    ])}
                  />
                </View>
                <Components.Text.MediumTextComponent
                  text={`$${bookingData.total}`}
                  textStyle={StyleSheet.flatten([
                    staticStyle.titleText,
                    staticStyle.text,
                    styles.textPrimary,
                  ])}
                />
              </View>
              <LinearGradient
                colors={Utils.getGradientColor(bookingData.type)}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={staticStyle.gradient}
              >
                <View style={staticStyle.typeRow}>
                  <FastImage
                    style={staticStyle.categoryIcon}
                    source={Utils.getServiceImage(bookingData.type)}
                  />
                  <Components.Text.RegularTextComponent
                    text={bookingData.type}
                    textStyle={StyleSheet.flatten([
                      staticStyle.subtitleText,
                      styles.textPrimary,
                    ])}
                  />
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>
        <View
          style={StyleSheet.flatten([staticStyle.button, styles.bgPrimary])}
        >
          <Components.Buttons.PrimaryButton onPress={goBack} text={t('gotIt')} />
        </View>
      </SafeAreaView>
    </>
  );
};
