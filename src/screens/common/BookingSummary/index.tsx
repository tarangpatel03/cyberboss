import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { rootNavigationProps } from '../../../models/navigationModal';
import { routeName } from '../../../config/constants/routes';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { isDarkMode } from '../../../utils/theme/darkMode';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeaderComponent } from '../../../components/Headers/ScreenHeaderComponent';
import { appIcons } from '../../../config/icons/iconPath';
import { MediumTextComponent } from '../../../components/Text/MediumTextComponent';
import { useState } from 'react';
import { PrimaryButtonComponent } from '../../../components/Buttons/PrimaryButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { BookingStatusCard } from '../../../components/Cards/BookingStatusCard';
import { BookingSummaryDetailsCard } from '../../../components/Cards/BookingSummaryDetailsCard';
import { BookingPaymentDetailsCard } from '../../../components/Cards/BookingPaymentDetailsCard';

export const BookingSummaryScreen = ({
  navigation,
  route,
}: rootNavigationProps<routeName.BookingSummary>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const data = route.params;
  const type = data.category.text;
  const userRole = useSelector((state: RootState) => state.user.userData.role);
  const [ratingText, setRatingText] = useState<string>(data.yourRating);
  const [rating, setRating] = useState<number>(data.rating);

  const navigateToRating = () => {
    navigation.navigate(routeName.YourRating, {
      rating: rating,
      setRating: setRating,
      setYourRating: setRatingText,
      yourRating: ratingText,
    });
  };

  const navigateToConsultantProfile = (id: string) => {
    navigation.navigate(routeName.ConsultantProfile, {
      consultantId: id,
      type: type,
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View
          style={StyleSheet.flatten([staticStyle.header, styles.container])}
        >
          <ScreenHeaderComponent
            onPress={goBack}
            headerText={t('bookingSummary')}
            iconPath={appIcons.ic_more}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={StyleSheet.flatten([
            staticStyle.innerContainer,
            styles.innerContainer,
          ])}
        >
          <BookingStatusCard data={data} />
          <BookingSummaryDetailsCard
            data={data}
            rating={rating}
            userRole={userRole}
            ratingText={ratingText}
            navigateToRating={navigateToRating}
            navigateToConsultantProfile={navigateToConsultantProfile}
          />
          <BookingPaymentDetailsCard
            billData={data.billDetails}
            role={userRole}
          />
        </ScrollView>
        <View style={staticStyle.button}>
          <PrimaryButtonComponent
            obj={{
              onPress: () => {},
              text: t('message'),
            }}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={StyleSheet.flatten([
              staticStyle.downloadButton,
              styles.innerContainer,
            ])}
          >
            <View style={staticStyle.downloadInvoice}>
              <MediumTextComponent
                text={t('downloadInvoice')}
                textStyle={StyleSheet.flatten([
                  staticStyle.buttonText,
                  styles.primaryText,
                ])}
              />
              <FastImage
                source={appIcons.ic_download}
                style={staticStyle.downloadIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};
