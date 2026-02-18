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
  TConsultantDetailsModel,
  transformConsultantDetailsModel,
} from '@models/formattedAPI/tConsultant';
import { ApiResponse } from '@models/apiModel';
import { Config } from '@config/index';
import { Components } from '@components/index';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Utils } from '@utils/index.ts';
import { ErrorToast } from 'react-native-toast-message';

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
  const [billData, setBillData] = useState<ApiBillDetailsModel>({
    grand_total: 0,
    hours: 0,
    platform_fee: 0,
    platform_percentage: 0,
    tax: 0,
    total: 0,
    hourly_rate: 0,
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

  const loadConsultantData = async () => {
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
      setBillData(data2);
    } catch (error: any) {
      ErrorToast({ text1: error as string });
    } finally {
      setLoader(false);
    }
  };

  const navigateToConfirm = () => {
    navigation.navigate(routeName.BookingConfirm, {
      hours: hrBook ?? 0,
      image: consultantData.profilePicture,
      name: consultantData.name,
      total: billData.grand_total ? billData.grand_total : 0,
      type,
    });
  };

  useEffect(() => {
    loadConsultantData().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultantId]);

  useEffect(() => {
    loadData().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hrBook, consultantId]);

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
              <View
                style={StyleSheet.flatten([staticStyle.card, styles.bgPrimary])}
              >
                <Components.TextComponent
                  family={'medium'}
                  text={t('serviceConsultant')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.titleText,
                    styles.textSecondary,
                  ])}
                />
                <View
                  style={StyleSheet.flatten([
                    staticStyle.separator,
                    styles.separator,
                  ])}
                />
                <View style={staticStyle.consultantProfile}>
                  <FastImage
                    source={
                      consultantData.profilePicture
                        ? {
                            uri: consultantData.profilePicture,
                          }
                        : Config.appImages.img_defaultProfile
                    }
                    style={staticStyle.image}
                  />
                  <View style={staticStyle.profileName}>
                    <Components.TextComponent
                      family={'medium'}
                      text={consultantData.name}
                      textStyle={StyleSheet.flatten([
                        staticStyle.titleText,
                        styles.textPrimary,
                      ])}
                    />
                    <Components.TextComponent
                      text={`$${billData?.total ?? 0}`}
                      family={'regular'}
                      textStyle={StyleSheet.flatten([
                        staticStyle.subtitleText,
                        staticStyle.rightShift,
                        styles.textSecondary,
                      ])}
                    />
                  </View>
                  <View
                    style={StyleSheet.flatten([
                      staticStyle.counter,
                      styles.separator,
                    ])}
                  >
                    <Components.Buttons.CircularIconButton
                      buttonStyle={staticStyle.counterButton}
                      iconPath={Config.appIcons.ic_minus}
                      iconStyle={staticStyle.minusIcon}
                      onPress={reduceHr}
                    />
                    <Components.TextComponent
                      family={'semiBold'}
                      text={`${hrBook}h`}
                      textStyle={StyleSheet.flatten([
                        staticStyle.counterText,
                        styles.textSecondary,
                      ])}
                    />
                    <Components.Buttons.CircularIconButton
                      buttonStyle={staticStyle.counterButton}
                      iconPath={Config.appIcons.ic_plus}
                      iconStyle={staticStyle.plusIcon}
                      onPress={() => setHrBook(prev => prev + 1)}
                    />
                  </View>
                </View>
                <LinearGradient
                  colors={Utils.getGradientColor(type)}
                  // colors={['red', 'white']}
                  start={{
                    x: 0,
                    y: 0.5,
                  }}
                  end={{
                    x: 1,
                    y: 0.5,
                  }}
                  style={staticStyle.gradientContainer}
                >
                  <View style={staticStyle.serviceContainer}>
                    <FastImage
                      source={Utils.getServiceImage(type)}
                      style={staticStyle.typeIcon}
                    />
                    <Components.TextComponent
                      family={'regular'}
                      text={type}
                      textStyle={StyleSheet.flatten([
                        staticStyle.subtitleText,
                        styles.textSecondary,
                      ])}
                    />
                  </View>
                </LinearGradient>
              </View>
              <Components.Cards.BookingPaymentDetailsCard
                role={role}
                billData={billData}
              />
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
