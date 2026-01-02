import { useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { routeName } from '../../../config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { rootNavigationProps } from '../../../models/navigationModel';
import { ScreenHeaderComponent } from '../../../components/Headers/ScreenHeaderComponent';
import { PrimaryButtonComponent } from '../../../components/Buttons/PrimaryButton';
import { getAPIData } from '../../../services/api/common/getCommonApi';
import { rootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { useTranslation } from 'react-i18next';
import { getBillData } from '../../../services/api/consultant/getBillData';
import { ConsultantServiceSummaryCard } from '../../../components/Cards/ConsultantServiceSummaryCard';
import { BookingPaymentDetailsCard } from '../../../components/Cards/BookingPaymentDetailsCard';
import { apiBillDetailsModel } from '../../../models/api/billing';
import { apiConsultantDetailsModel } from '../../../models/api/consultant';
import {
  tBillDetailsModel,
  transformBillDetailsModel,
} from '../../../models/formattedAPI/tBilling';
import {
  tConsultantDetailsModel,
  transformConsultantDetailsModel,
} from '../../../models/formattedAPI/tConsultant';
import { ApiResponse } from '../../../models/apiModel';

export const BookingDetailsScreen = ({
  navigation,
  route,
}: rootNavigationProps<routeName.BookingDetails>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { consultantId, type } = route.params;
  const [hrBook, setHrBook] = useState<number>(3);
  const [loader, setLoader] = useState<boolean>(true);
  const role = useSelector((state: rootState) => state.user.userData.role);
  const [billData, setBillData] = useState<tBillDetailsModel>({
    grandTotal: 0,
    hourlyRate: 0,
    hours: 0,
    platformFee: 0,
    platformPercentage: 0,
    tax: 0,
    total: 0,
  });
  const [consultantData, setConsultantData] = useState<tConsultantDetailsModel>(
    {
      averageRatings: 0,
      bio: '',
      bookingsCount: 0,
      experienceYear: '',
      expertises: [],
      id: '',
      name: '',
      profilePicture: undefined,
      rate: '',
      ratingReviews: [],
      services: [],
      totalRatings: 0,
    },
  );

  const reduceHr = () => {
    if (hrBook > 0) {
      setHrBook(prev => prev - 1);
    }
  };
  const goBack = () => {
    navigation.goBack();
  };

  const loadData = async () => {
    try {
      setLoader(true);
      const response1 = await getAPIData<
        ApiResponse<apiConsultantDetailsModel>
      >(`${endPoints.consultant}/${consultantId}`);
      if (!response1) return;
      const data1: apiConsultantDetailsModel = response1.payload;
      const transformedData1 = transformConsultantDetailsModel(data1);
      setConsultantData(transformedData1);
      const res2: apiBillDetailsModel = await getBillData(hrBook, consultantId);
      const transformedData2 = transformBillDetailsModel(res2);
      setBillData(transformedData2);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToConfirm = () => {
    navigation.navigate(routeName.BookingConfirm, {
      hours: hrBook,
      image: consultantData.profilePicture,
      name: consultantData.name,
      total: billData.grandTotal,
      type,
    });
  };

  useEffect(() => {
    loadData().then(() => setLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hrBook]);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.bgPrimary])}
      >
        {loader && (
          <View style={StyleSheet.flatten([staticStyle.loader, styles.loader])}>
            <View
              style={StyleSheet.flatten([
                staticStyle.loaderContainer,
                styles.bgSecondary,
              ])}
            >
              <ActivityIndicator size={'large'} />
            </View>
          </View>
        )}
        {
          <>
            <View style={staticStyle.header}>
              <ScreenHeaderComponent
                onPress={goBack}
                headerText={t('bookingDetails')}
              />
            </View>
            <View
              style={StyleSheet.flatten([
                staticStyle.container,
                staticStyle.innerContainer,
                styles.bgSecondary,
              ])}
            >
              <ConsultantServiceSummaryCard
                type={type}
                hrBook={hrBook}
                setHrBook={setHrBook}
                total={billData.total}
                consultantData={consultantData}
                reduceHr={reduceHr}
              />
              <BookingPaymentDetailsCard role={role} billData={billData} />
            </View>
            <View
              style={StyleSheet.flatten([staticStyle.button, styles.bgPrimary])}
            >
              <PrimaryButtonComponent
                onPress={navigateToConfirm}
                text={t('payNow')}
              />
            </View>
          </>
        }
      </SafeAreaView>
    </>
  );
};
