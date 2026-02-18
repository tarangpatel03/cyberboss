import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootNavigationProps } from '@models/navigationModel';
import { routeName } from '@config/constants/routes';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import {
  createStyles,
  staticStyle,
} from '@screens/common/BookingSummary/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState, useMemo } from 'react';
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
import {
  ApiBookingDetailsModel,
  ApiInvoiceModel,
  ApiReviewModel,
} from '@models/api/bookings';
import { ApiResponse } from '@models/apiModel';
import { Config } from '@config/index';
import { Components } from '@components/index';
import firestore from '@react-native-firebase/firestore';
import { Utils } from '@utils/index.ts';
import LinearGradient from 'react-native-linear-gradient';
import { Rating } from 'react-native-ratings';

export const BookingSummaryScreen = ({
  navigation,
  route,
}: RootNavigationProps<routeName.BookingSummary>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { id } = route.params;
  const [imageError, setImageError] = useState<boolean>(false);
  const { id: userIdRead, role: userRole } = useSelector(
    (state: RootState) => state.user.userData,
  );
  const [bookingDetails, setBookingDetails] = useState<TBookingDetailsModel>();
  const [review, setReview] = useState<TReviewModel[]>([]);

  const navigateToConsultantProfile = () => {
    navigation.navigate(routeName.ConsultantProfile, {
      consultantId: bookingDetails?.consultantId ?? '',
      type: bookingDetails?.expertise?.name ?? '',
    });
  };

  const navigateToRating = () => {
    navigation.navigate(routeName.YourRating, {
      booking_id: bookingDetails?.id ?? '',
      rating: Number(review[0].rating) ?? '0',
      yourRating: review[0].reviews ?? '',
    });
  };

  const downloadInvoice = async () => {
    try {
      const res = await getAPIData<ApiResponse<ApiInvoiceModel>>(
        `${Config.endPoints.invoice}/${bookingDetails?.id}`,
      );
      Linking.openURL(res?.payload.invoice_id ?? '');
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
    }
  };

  const navigateToChat = async () => {
    const data = await firestore()
      .collection('chats')
      .doc(`booking_${bookingDetails?.bookingId}`)
      .get()
      .then(snapshot => {
        return {
          id: snapshot.id,
          ...snapshot.data(),
        };
      });
    if (data) {
      navigation.navigate(routeName.OneOnOneChat, {
        consultantImage: bookingDetails?.userProfilePicture,
        consultantName: bookingDetails?.userName ?? '',
        userID: userIdRead,
        chatID: `booking_${bookingDetails?.bookingId}`,
      });
    }
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
      await loadReview(transformedData.id);
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const loadReview = async (bookingId: string) => {
    try {
      const response = await getAPIData<ApiResponse<ApiReviewModel[]>>(
        `${Config.endPoints.ratingReviews}/${bookingId}`,
      );
      if (!response) return;
      const transformedRes = response.payload.map(r => transformReviewModel(r));
      setReview(transformedRes);
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
    }
  };

  useEffect(() => {
    getBookingDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const billData = useMemo(
    () => ({
      grand_total: Number(bookingDetails?.grandTotal) ?? 0,
      hourly_rate: Number(bookingDetails?.hourlyRate) ?? 0,
      hours: Number(bookingDetails?.hours) ?? 0,
      platform_fee: Number(bookingDetails?.platformFee) ?? 0,
      platform_percentage:
        userRole === 'client'
          ? bookingDetails?.platformPercentage ?? 0
          : bookingDetails?.platformPercentageConsultant ?? 0,
      tax: Number(bookingDetails?.tax) ?? 0,
      total: Number(bookingDetails?.total) ?? 0,
    }),
    [bookingDetails, userRole],
  );

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
          <View
            style={StyleSheet.flatten([
              staticStyle.card,
              staticStyle.horizontalCard,
              styles.container,
            ])}
          >
            <View style={staticStyle.id}>
              <Components.TextComponent
                family={'medium'}
                textStyle={StyleSheet.flatten([
                  staticStyle.titleText,
                  styles.secondaryText,
                ])}
                text={`${t('bookingId')}: ${bookingDetails?.bookingId}`}
              />
              <Components.TextComponent
                family={'regular'}
                textStyle={StyleSheet.flatten([
                  staticStyle.subtitleText,
                  styles.primaryText,
                ])}
                text={Utils.getFullDate(bookingDetails?.bookingDate ?? '')}
              />
            </View>
            <View
              style={StyleSheet.flatten([
                staticStyle.statusContainer,
                bookingDetails?.status === 'Completed'
                  ? styles.greenBG
                  : styles.redBG,
              ])}
            >
              <FastImage
                source={
                  bookingDetails?.status === 'Completed'
                    ? Config.appIcons.ic_completed
                    : Config.appIcons.ic_inProgress
                }
                style={staticStyle.icon}
              />
              <Components.TextComponent
                family={'medium'}
                text={bookingDetails?.status ?? ''}
                textStyle={StyleSheet.flatten([
                  staticStyle.tinyText,
                  bookingDetails?.status === 'Completed'
                    ? styles.greenText
                    : styles.redText,
                ])}
              />
            </View>
          </View>
          <View
            style={StyleSheet.flatten([staticStyle.card, styles.container])}
          >
            <Components.TextComponent
              family={'medium'}
              textStyle={StyleSheet.flatten([
                staticStyle.titleText,
                styles.secondaryText,
              ])}
              text={t('bookingDetails')}
            />
            <View
              style={StyleSheet.flatten([
                staticStyle.separator,
                staticStyle.fullWidth,
                styles.separator,
              ])}
            />
            <View style={staticStyle.rowLine}>
              <TouchableOpacity
                disabled={userRole === 'consultant'}
                activeOpacity={0.9}
                onPress={navigateToConsultantProfile}
              >
                <FastImage
                  source={
                    imageError
                      ? Config.appImages.img_defaultProfile
                      : Utils.getProfilePicture(
                          bookingDetails?.userProfilePicture,
                        )
                  }
                  onError={() => setImageError(true)}
                  style={staticStyle.profileImage}
                />
              </TouchableOpacity>
              <View style={staticStyle.fullLengthView}>
                <Components.TextComponent
                  family={'medium'}
                  text={bookingDetails?.userName ?? ''}
                  textStyle={StyleSheet.flatten([
                    staticStyle.titleText,
                    styles.primaryText,
                  ])}
                />
                <Components.TextComponent
                  family={'regular'}
                  text={`${bookingDetails?.hours}hr`}
                  textStyle={StyleSheet.flatten([
                    staticStyle.subtitleText,
                    styles.secondaryText,
                  ])}
                />
              </View>
              <Components.TextComponent
                family={'medium'}
                text={`$${bookingDetails?.total}`}
                textStyle={StyleSheet.flatten([
                  staticStyle.titleText,
                  staticStyle.text,
                  styles.primaryText,
                ])}
              />
            </View>
            <LinearGradient
              end={{
                x: 1,
                y: 0.5,
              }}
              start={{
                x: 0,
                y: 0.5,
              }}
              colors={Utils.getGradientColor(bookingDetails?.expertise?.name)}
              style={staticStyle.gradient}
            >
              <View
                style={StyleSheet.flatten([
                  staticStyle.rowLine,
                  staticStyle.padding8,
                ])}
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={Utils.getServiceImage(
                    bookingDetails?.expertise?.name,
                  )}
                  style={staticStyle.categoryIcon}
                />
                <Components.TextComponent
                  family={'regular'}
                  text={bookingDetails?.expertise?.name ?? ''}
                  textStyle={StyleSheet.flatten([
                    styles.primaryText,
                    staticStyle.subtitleText,
                  ])}
                />
              </View>
            </LinearGradient>
            <View
              style={StyleSheet.flatten([
                styles.separator,
                staticStyle.separator,
              ])}
            />
            <TouchableOpacity
              style={StyleSheet.flatten([
                staticStyle.input,
                styles.innerContainer,
              ])}
              disabled={userRole === 'consultant'}
              onPress={navigateToRating}
              activeOpacity={1}
            >
              <View style={staticStyle.horizontalCard}>
                <Components.TextComponent
                  family={'medium'}
                  text={
                    review?.[review.length - 1]?.reviews
                      ? t('yourRating')
                      : t('rateYourExperience')
                  }
                  textStyle={StyleSheet.flatten([
                    styles.secondaryText,
                    staticStyle.titleText,
                  ])}
                />
                <Rating
                  imageSize={18}
                  ratingCount={5}
                  readonly
                  startingValue={Number(review?.[0]?.rating ?? 0)}
                  tintColor={theme.colors.bgSecondary}
                />
              </View>
              {review?.[0]?.reviews && (
                <View>
                  <Components.TextComponent
                    family={'regular'}
                    text={review?.[0].reviews}
                    noOfLines={200}
                    textStyle={StyleSheet.flatten([
                      staticStyle.subtitleText,
                      styles.primaryText,
                    ])}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Components.Cards.BookingPaymentDetailsCard
            billData={billData}
            role={userRole}
          />
        </ScrollView>
        <View style={staticStyle.button}>
          {bookingDetails?.status === 'In progress' && (
            // <Components.Buttons.PrimaryButton onPress={navigateToChat} text={t('message')}/>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={navigateToChat}
              style={StyleSheet.flatten([
                staticStyle.downloadButton,
                bookingDetails?.status === 'In progress'
                  ? styles.primaryBackground
                  : styles.innerContainer,
              ])}
            >
              <Components.TextComponent
                family={'medium'}
                text={t('message')}
                textStyle={StyleSheet.flatten([
                  staticStyle.buttonText,
                  styles.primaryText,
                ])}
              />
            </TouchableOpacity>
          )}
          {bookingDetails?.status === 'Completed' && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={downloadInvoice}
              style={StyleSheet.flatten([
                staticStyle.downloadButton,
                bookingDetails?.status === 'Completed'
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
          )}
        </View>
      </SafeAreaView>
    </>
  );
};
