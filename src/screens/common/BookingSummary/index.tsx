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
import { useEffect, useState } from 'react';
import { PrimaryButtonComponent } from '../../../components/Buttons/PrimaryButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { BookingStatusCard } from '../../../components/Cards/BookingStatusCard';
import { BookingSummaryDetailsCard } from '../../../components/Cards/BookingSummaryDetailsCard';
import { BookingPaymentDetailsCard } from '../../../components/Cards/BookingPaymentDetailsCard';
import { getAPIData } from '../../../services/api/getApi/getAPI';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import {
  IBookingDetailsModel,
  transformBookingDetailsModel,
} from '../../../models/api/bookings';
import { ApiBookingDetailsModel } from '../../../models/formattedAPI/tBookings';

export const BookingSummaryScreen = ({
  navigation,
  route,
}: rootNavigationProps<routeName.BookingSummary>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const id = route.params;
  const userRole = useSelector((state: RootState) => state.user.userData.role);
  const [bookingDetails, setBookingDetails] = useState<IBookingDetailsModel>({
    id: '',
    tax: 0,
    hours: 0,
    total: 0,
    status: '',
    expertise: {
      id: '',
      name: '',
      image: '',
      description: '',
    },
    bookingId: '',
    grandTotal: '',
    hourlyRate: '',
    platformFee: 0,
    bookingDate: '',
    categoryName: '',
    consultantName: '',
    consultantProfilePicture: 0,
  });
  // const [ratingText, setRatingText] = useState<string>(data.yourRating);
  // const [rating, setRating] = useState<number>(data.rating);

  // const navigateToRating = () => {
  //   navigation.navigate(routeName.YourRating, {
  //     rating: rating,
  //     setRating: setRating,
  //     setYourRating: setRatingText,
  //     yourRating: ratingText,
  //   });
  // };

  // const navigateToConsultantProfile = (id: string) => {
  //   navigation.navigate(routeName.ConsultantProfile, {
  //     consultantId: id,
  //     type: type,
  //   });
  // };

  const getBookingDetails = async () => {
    try {
      const data: ApiBookingDetailsModel = await getAPIData(
        `${endPoints.booking}/${id}`,
      );
      const transformedData = transformBookingDetailsModel(data);
      setBookingDetails(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getBookingDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <BookingStatusCard props={bookingDetails} />
          <BookingSummaryDetailsCard
            userRole={userRole}
            data={bookingDetails}
          />
          <BookingPaymentDetailsCard
            billData={{
              grandTotal: Number(bookingDetails.grandTotal),
              hourlyRate: Number(bookingDetails.hourlyRate),
              hours: bookingDetails.hours,
              platformFee: Number(bookingDetails.platformFee),
              platformPercentage: userRole === 'client' ? 3 : 20,
              tax: Number(bookingDetails.tax),
              total: Number(bookingDetails.total),
            }}
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
