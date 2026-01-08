import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from '@screens/client/ConsultantProfile/styles';
import { Theme } from '@config/themes/themes';
import { getAPIData } from '@services/api/common/getCommonApi';
import { useCallback, useEffect, useState } from 'react';
import { routeName } from '@config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigationProps } from '@models/navigationModel';
import { useTranslation } from 'react-i18next';
import {
  TConsultantDetailsModel,
  transformConsultantDetailsModel,
  TRatingReviewModel,
} from '@models/formattedAPI/tConsultant';
import { ApiConsultantDetailsModel } from '@models/api/consultant';
import { ApiResponse } from '@models/apiModel';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const ConsultantProfileScreen = ({
  navigation,
  route,
}: RootNavigationProps<routeName.ConsultantProfile>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { consultantId, type } = route.params;
  const [loader, setLoader] = useState<boolean>(true);
  const [data, setData] = useState<TConsultantDetailsModel>({
    id: '',
    bio: '',
    name: '',
    rate: '',
    services: [],
    expertises: [],
    totalRatings: 0,
    bookingsCount: 0,
    averageRatings: 0,
    ratingReviews: [],
    experienceYear: '',
    profilePicture: undefined,
  });

  const goBack = () => {
    navigation.goBack();
  };

  const renderItemReview: ListRenderItem<TRatingReviewModel> = useCallback(
    ({ item }) => {
      return (
        <Components.Cards.ReviewCard
          clientId={item.clientId}
          clientName={item.clientName}
          clientProfilePicture={item.clientProfilePicture}
          createdAt={item.createdAt}
          id={item.id}
          rating={item.rating}
          review={item.review}
        />
      );
    },
    [],
  );

  const navigateToBookingDetails = () => {
    navigation.navigate(routeName.BookingDetails, {
      consultantId: data.id,
      type,
    });
  };

  const loadData = async () => {
    try {
      const response = await getAPIData<ApiResponse<ApiConsultantDetailsModel>>(
        `${Config.endPoints.consultant}/${consultantId}`,
      );
      if (!response) return;
      const resData: ApiConsultantDetailsModel = response.payload;
      const transformedData = transformConsultantDetailsModel(resData);
      setData(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: any) => {
    return <Components.Cards.RatingCard item={item} />;
  };

  useEffect(() => {
    loadData().then(() => setLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.primaryBg])}
      >
        <Components.Headers.ScreenHeader onPress={goBack} />
        {loader && <Components.Skeleton.ConsultantProfileScreenShimmer />}
        {!loader && (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Components.Headers.ConsultantProfileHeader data={data} />
              <View
                style={StyleSheet.flatten([
                  staticStyle.separator,
                  styles.separator,
                ])}
              />
              <View style={staticStyle.secondaryContainer}>
                <Components.Text.MediumTextComponent
                  text={t('about')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.semiTitleText,
                    styles.primaryText,
                  ])}
                />
                <Components.Text.RegularTextComponent
                  text={data.bio}
                  noOfLines={20}
                  textStyle={StyleSheet.flatten([
                    staticStyle.subTitleText,
                    styles.secondaryText,
                  ])}
                />
              </View>
              <View
                style={StyleSheet.flatten([
                  staticStyle.separator,
                  styles.separator,
                ])}
              />
              <Components.Cards.ConsultantExpertiseCard data={data} />
              <View
                style={StyleSheet.flatten([
                  staticStyle.separator,
                  styles.separator,
                ])}
              />
              <Components.ListItems.ConsultantRatingsList data={data} renderItem={renderItem} />
              <FlatList
                data={data.ratingReviews}
                scrollEnabled={false}
                keyExtractor={item => item.id}
                renderItem={renderItemReview}
                showsVerticalScrollIndicator={false}
                initialNumToRender={6}
                ListEmptyComponent={null}
              />
            </ScrollView>
            <View
              style={StyleSheet.flatten([
                staticStyle.bottomBar,
                styles.separator,
              ])}
            >
              <Components.Text.MediumTextComponent
                text={`$${Number(data.rate)}/hr`}
                textStyle={StyleSheet.flatten([
                  staticStyle.ratingText,
                  styles.primaryText,
                ])}
              />
              <Components.Buttons.PrimaryButton
                onPress={navigateToBookingDetails}
                text={t('bookNow')}
                buttonStyle={staticStyle.bookNowButton}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};
