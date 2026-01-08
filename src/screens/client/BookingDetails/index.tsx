import { useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import {
  createStyles,
  staticStyle,
} from '@screens/client/BookingDetails/styles';
import { Theme } from '@config/themes/themes';
import { routeName } from '@config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RootNavigationProps } from '@models/navigationModel';
import { getAPIData } from '@services/api/common/getCommonApi';
import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getBillData } from '@services/api/consultant/getBillData';
import { ApiBillDetailsModel } from '@models/api/billing';
import { ApiConsultantDetailsModel } from '@models/api/consultant';
import {
  TBillDetailsModel,
  transformBillDetailsModel,
} from '@models/formattedAPI/tBilling';
import {
  TConsultantDetailsModel,
  transformConsultantDetailsModel,
} from '@models/formattedAPI/tConsultant';
import { ApiResponse } from '@models/apiModel';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const BookingDetailsScreen = ({
  navigation,
  route,
}: RootNavigationProps<routeName.BookingDetails>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { consultantId, type } = route.params;
  const [hrBook, setHrBook] = useState<number>(3);
  // const debouncedHours = useDebouncedValue<number>(hrBook);
  const [loader, setLoader] = useState<boolean>(true);
  const role = useSelector((state: RootState) => state.user.userData.role);
  const [billData, setBillData] = useState<TBillDetailsModel>({
    grandTotal: 0,
    hourlyRate: 0,
    hours: 0,
    platformFee: 0,
    platformPercentage: 0,
    tax: 0,
    total: 0,
  });
  const [consultantData, setConsultantData] = useState<TConsultantDetailsModel>(
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

  const loadConultantData = async () => {
    const response1 = await getAPIData<ApiResponse<ApiConsultantDetailsModel>>(
      `${Config.endPoints.consultant}/${consultantId}`,
    );
    if (!response1) return;
    const data1: ApiConsultantDetailsModel = response1.payload;
    const transformedData1 = transformConsultantDetailsModel(data1);
    setConsultantData(transformedData1);
  };

  const loadData = async () => {
    try {
      setLoader(true);
      const response2 = await getBillData<ApiResponse<ApiBillDetailsModel>>(
        hrBook,
        consultantId,
      );
      if (!response2) return;
      const data2: ApiBillDetailsModel = response2.payload;
      const transformedData2 = transformBillDetailsModel(data2);
      setBillData(transformedData2);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
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
    loadConultantData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();
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
              <Components.Headers.ScreenHeader
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
              <Components.Cards.ConsultantServiceSummaryCard
                type={type}
                hrBook={hrBook}
                setHrBook={setHrBook}
                total={billData.total}
                consultantData={consultantData}
                reduceHr={reduceHr}
              />
              <Components.Cards.BookingPaymentDetailsCard role={role} billData={billData} />
            </View>
            <View
              style={StyleSheet.flatten([staticStyle.button, styles.bgPrimary])}
            >
              <Components.Buttons.PrimaryButton
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
