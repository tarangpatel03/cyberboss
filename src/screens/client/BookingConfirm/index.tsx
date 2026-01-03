import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from '@screens/client/BookingConfirm/styles';
import { Theme } from '@config/themes/themes';
import { StyleSheet, View } from 'react-native';
import { routeName } from '@config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigationProps } from '@models/navigationModel';
import { ScreenHeaderComponent } from '@components/Headers/ScreenHeader';
import { PrimaryButtonComponent } from '@components/Buttons/PrimaryButton';
import { appIcons } from '@config/icons/iconPath';
import { SemiBoldTextComponent } from '@components/Text/SemiBoldText';
import { RegularTextComponent } from '@components/Text/RegularText';
import LinearGradient from 'react-native-linear-gradient';
import { MediumTextComponent } from '@components/Text/MediumText';
import {
  getGradientColor,
  getServiceImage,
} from '@utils/gradientColor/gradientColor';
import { appImages } from '@config/images/imagePath';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';

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
        <ScreenHeaderComponent onPress={goBack} />
        <View style={staticStyle.mainContainer}>
          <View style={staticStyle.confirmCard}>
            <FastImage
              source={appIcons.ic_confirm}
              style={staticStyle.confirmIcon}
            />
            <View style={staticStyle.confirmLine}>
              <SemiBoldTextComponent
                text={t('bookingConfirmed')}
                textStyle={StyleSheet.flatten([
                  staticStyle.confirmText,
                  styles.textPrimary,
                ])}
              />
              <RegularTextComponent
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
                <MediumTextComponent
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
                      : appImages.img_defaultProfile
                  }
                  style={staticStyle.profileImage}
                />
                <View style={staticStyle.fullLengthView}>
                  <MediumTextComponent
                    text={bookingData.name}
                    textStyle={StyleSheet.flatten([
                      staticStyle.titleText,
                      styles.textPrimary,
                    ])}
                  />
                  <RegularTextComponent
                    text={`${bookingData.hours}hr`}
                    textStyle={StyleSheet.flatten([
                      staticStyle.subtitleText,
                      styles.textSecondary,
                    ])}
                  />
                </View>
                <MediumTextComponent
                  text={`$${bookingData.total}`}
                  textStyle={StyleSheet.flatten([
                    staticStyle.titleText,
                    staticStyle.text,
                    styles.textPrimary,
                  ])}
                />
              </View>
              <LinearGradient
                colors={getGradientColor(bookingData.type)}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={staticStyle.gradient}
              >
                <View style={staticStyle.typeRow}>
                  <FastImage
                    style={staticStyle.categoryIcon}
                    source={getServiceImage(bookingData.type)}
                  />
                  <RegularTextComponent
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
          <PrimaryButtonComponent onPress={goBack} text={t('gotIt')} />
        </View>
      </SafeAreaView>
    </>
  );
};
