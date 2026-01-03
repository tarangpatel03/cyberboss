import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RootNavigationProps } from '../../../models/navigationModel';
import { routeName } from '../../../config/constants/routes';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeaderComponent } from '../../../components/Headers/ScreenHeader';
import { appIcons } from '../../../config/icons/iconPath';
import { MediumTextComponent } from '../../../components/Text/MediumText';
import { useEffect, useState } from 'react';
import { PrimaryButtonComponent } from '../../../components/Buttons/PrimaryButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { BookingStatusCard } from '../../../components/Cards/BookingStatusCard';
import { BookingSummaryDetailsCard } from '../../../components/Cards/BookingSummaryDetailsCard';
import { BookingPaymentDetailsCard } from '../../../components/Cards/BookingPaymentDetailsCard';
import { getAPIData } from '../../../services/api/common/getCommonApi';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import {
  TBookingDetailsModel,
  transformBookingDetailsModel,
  transformReviewModel,
  TReviewModel,
} from '../../../models/formattedAPI/tBookings';
import {
  ApiBookingDetailsModel,
  ApiReviewModel,
} from '../../../models/api/bookings';
import { ApiResponse } from '../../../models/apiModel';

export const BookingSummaryScreen = ({
  navigation,
  route,
}: RootNavigationProps<routeName.BookingSummary>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { id } = route.params;
  const userRole = useSelector((state: RootState) => state.user.userData.role);
  const [bookingDetails, setBookingDetails] = useState<TBookingDetailsModel>();
  const [review, setReview] = useState<TReviewModel[]>([]);

  const navigateToConsultantProfile = () => {
    navigation.navigate(routeName.ConsultantProfile, {
      consultantId: bookingDetails?.consultantId ?? '',
      type: bookingDetails?.expertise?.name ?? '',
    });
  };

  const getBookingDetails = async () => {
    try {
      const response = await getAPIData<ApiResponse<ApiBookingDetailsModel>>(
        `${endPoints.booking}/${id}`,
      );
      if (!response) return;
      const data = response.payload;
      const transformedData = transformBookingDetailsModel(data);
      setBookingDetails(transformedData);
      loadReview(transformedData.id);
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const loadReview = async (bookingId: string) => {
    const response = await getAPIData<ApiResponse<ApiReviewModel[]>>(
      `${endPoints.ratingReviews}/${bookingId}`,
    );
    if (!response) return;
    const transformedRes = response.payload.map(r => transformReviewModel(r));
    setReview(transformedRes);
  };

  useEffect(() => {
    getBookingDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
            review={review}
            navigateToConsultantProfile={navigateToConsultantProfile}
            userRole={userRole}
            data={bookingDetails}
          />
          <BookingPaymentDetailsCard
            billData={{
              grandTotal: Number(bookingDetails?.grandTotal),
              hourlyRate: Number(bookingDetails?.hourlyRate),
              hours: bookingDetails?.hours ?? 0,
              platformFee: Number(bookingDetails?.platformFee),
              platformPercentage:
                userRole === 'client'
                  ? bookingDetails?.platformPercentage ?? 0
                  : bookingDetails?.platformPercentageConsultant ?? 0,
              tax: Number(bookingDetails?.tax),
              total: Number(bookingDetails?.total),
            }}
            role={userRole}
          />
        </ScrollView>
        <View style={staticStyle.button}>
          <PrimaryButtonComponent onPress={() => {}} text={t('message')} />
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
                tintColor={theme.colors.textPrimary}
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
