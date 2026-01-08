import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RootNavigationProps } from '@models/navigationModel';
import { routeName } from '@config/constants/routes';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import {
  createStyles,
  staticStyle,
} from '@screens/common/BookingSummary/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { getAPIData } from '@services/api/common/getCommonApi';
import {
  TBookingDetailsModel,
  transformBookingDetailsModel,
  transformReviewModel,
  TReviewModel,
} from '@models/formattedAPI/tBookings';
import { ApiBookingDetailsModel, ApiReviewModel } from '@models/api/bookings';
import { ApiResponse } from '@models/apiModel';
import { Config } from '@config/index';
import { Components } from '@components/index';

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
        `${Config.endPoints.booking}/${id}`,
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
      `${Config.endPoints.ratingReviews}/${bookingId}`,
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
          <Components.Headers.ScreenHeader
            onPress={goBack}
            headerText={t('bookingSummary')}
            iconPath={Config.appIcons.ic_more}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={StyleSheet.flatten([
            staticStyle.innerContainer,
            styles.innerContainer,
          ])}
        >
          <Components.Cards.BookingStatusCard props={bookingDetails} />
          <Components.Cards.BookingSummaryDetailsCard
            review={review}
            navigateToConsultantProfile={navigateToConsultantProfile}
            userRole={userRole}
            data={bookingDetails}
          />
          <Components.Cards.BookingPaymentDetailsCard
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
          {bookingDetails?.status === 'In progress' && (
            <Components.Buttons.PrimaryButton onPress={() => {}} text={t('message')} />
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            style={StyleSheet.flatten([
              staticStyle.downloadButton,
              bookingDetails?.status === 'In progress'
                ? styles.innerContainer
                : styles.primaryBackground,
            ])}
          >
            <View style={staticStyle.downloadInvoice}>
              <Components.TextComponent
                family={'medium'}
                text={t('downloadInvoice')}
                textStyle={StyleSheet.flatten([
                  staticStyle.buttonText,
                  styles.primaryText,
                ])}
              />
              <FastImage
                tintColor={theme.colors.textPrimary}
                source={Config.appIcons.ic_download}
                style={staticStyle.downloadIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};
