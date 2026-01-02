import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { getAPIData } from '../../../services/api/common/getCommonApi';
import { useCallback, useEffect, useState } from 'react';
import { routeName } from '../../../config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rootNavigationProps } from '../../../models/navigationModal';
import { RatingCard } from '../../../components/Cards/RatingReviewCard';
import { MediumTextComponent } from '../../../components/Text/MediumTextComponent';
import { RegularTextComponent } from '../../../components/Text/RegularTextComponent';
import { ScreenHeaderComponent } from '../../../components/Headers/ScreenHeaderComponent';
import { PrimaryButtonComponent } from '../../../components/Buttons/PrimaryButton';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { useTranslation } from 'react-i18next';
import { ConsultantProfileScreenShimmer } from '../../../components/Skeleton/consultantProfile';
import { ConsultantProfileHeader } from '../../../components/Headers/ConsultantProfileHeader';
import { ConsultantExpertiseCard } from '../../../components/Cards/ConsultantExpertiseCard';
import { ConsultantRatingsList } from '../../../components/ListItems/ConsultantRatingList';
import {
  tConsultantDetailsModel,
  transformConsultantDetailsModel,
  tRatingReviewModel,
} from '../../../models/formattedAPI/tConsultant';
import { apiConsultantDetailsModel } from '../../../models/api/consultant';
import { ReviewCard } from '../../../components/Cards/ReviewCard';

export const ConsultantProfileScreen = ({
  navigation,
  route,
}: rootNavigationProps<routeName.ConsultantProfile>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { consultantId, type } = route.params;
  const [loader, setLoader] = useState<boolean>(true);
  const [data, setData] = useState<tConsultantDetailsModel>({
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

  const renderItemReview: ListRenderItem<tRatingReviewModel> = useCallback(
    ({ item }) => {
      return (
        <ReviewCard
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
      const res: apiConsultantDetailsModel = await getAPIData(
        `${endPoints.consultant}/${consultantId}`,
      );
      const transformedData = transformConsultantDetailsModel(res);
      setData(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: any) => {
    return <RatingCard item={item} />;
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
        <ScreenHeaderComponent onPress={goBack} />
        {loader && <ConsultantProfileScreenShimmer />}
        {!loader && (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ConsultantProfileHeader data={data} />
              <View
                style={StyleSheet.flatten([
                  staticStyle.separator,
                  styles.separator,
                ])}
              />
              <View style={staticStyle.secondaryContainer}>
                <MediumTextComponent
                  text={t('about')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.semiTitleText,
                    styles.primaryText,
                  ])}
                />
                <RegularTextComponent
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
              <ConsultantExpertiseCard data={data} />
              <View
                style={StyleSheet.flatten([
                  staticStyle.separator,
                  styles.separator,
                ])}
              />
              <ConsultantRatingsList data={data} renderItem={renderItem} />
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
              <MediumTextComponent
                text={`$${Number(data.rate)}/hr`}
                textStyle={StyleSheet.flatten([
                  staticStyle.ratingText,
                  styles.primaryText,
                ])}
              />
              <PrimaryButtonComponent
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
