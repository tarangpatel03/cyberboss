import { View, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@shopify/restyle';
import {
  IConsultantDetailsModal,
  transformConsultantDetailsModal,
} from '../../../models/formattedAPI/formatedModals';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { getAPIData } from '../../../services/api/getApi/getAPI';
import { useEffect, useState } from 'react';
import { isDarkMode } from '../../../utils/theme/darkMode';
import { routeName } from '../../../config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rootNavigationProps } from '../../../models/navigationModal';
import { ApiConsultantDetailsModal } from '../../../models/api/models';
import { ReviewCard } from '../../../components/Cards/RatingReviewCard';
import { MediumTextComponent } from '../../../components/Text/MediumTextComponent';
import { RegularTextComponent } from '../../../components/Text/RegularTextComponent';
import { ScreenHeaderComponent } from '../../../components/Headers/ScreenHeaderComponent';
import { PrimaryButtonComponent } from '../../../components/Buttons/PrimaryButton';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { useTranslation } from 'react-i18next';
import { ConsultantProfileScreenShimmer } from '../../../components/Skeleton/consultantProfile';
import { ConsultantProfileHeader } from '../../../components/Headers/ConsultantProfileHeader';
import { ConsultantExpertiesCard } from '../../../components/Cards/ConsultantExpertiesCard';
import { ConsultantRatingsList } from '../../../components/ListItems/ConsultantRatingList';

export const ConsultantProfileScreen = ({
  navigation,
  route,
}: rootNavigationProps<routeName.ConsultantProfile>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { consultantId, type } = route.params;
  const [loader, setLoader] = useState<boolean>(true);
  const [data, setData] = useState<IConsultantDetailsModal>({
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

  const navigateToBookingDetails = () => {
    navigation.navigate(routeName.BookingDetails, {
      consultantId: data.id,
      type,
    });
  };

  const loadData = async () => {
    try {
      const res: ApiConsultantDetailsModal = await getAPIData(
        `${endPoints.consultant}${consultantId}`,
      );
      const transformedData = transformConsultantDetailsModal(res);
      setData(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: any) => {
    return <ReviewCard item={item} />;
  };

  useEffect(() => {
    loadData().then(() => setLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
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
                  staticStyle.saperator,
                  styles.saperator,
                ])}
              />
              <View style={staticStyle.secondaryContainer}>
                <MediumTextComponent
                  text={t('about')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.semititletext,
                    styles.primaryText,
                  ])}
                />
                <RegularTextComponent
                  text={data.bio}
                  noOfLines={20}
                  textStyle={StyleSheet.flatten([
                    staticStyle.subtitletext,
                    styles.secondaryText,
                  ])}
                />
              </View>
              <View
                style={StyleSheet.flatten([
                  staticStyle.saperator,
                  styles.saperator,
                ])}
              />
              <ConsultantExpertiesCard data={data} />
              <View
                style={StyleSheet.flatten([
                  staticStyle.saperator,
                  styles.saperator,
                ])}
              />
              <ConsultantRatingsList data={data} renderItem={renderItem} />
            </ScrollView>
            <View
              style={StyleSheet.flatten([
                staticStyle.bottomBar,
                styles.saperator,
              ])}
            >
              <MediumTextComponent
                text={`$${Number(data.rate)}/hr`}
                textStyle={StyleSheet.flatten([
                  staticStyle.ratingtext,
                  styles.primaryText,
                ])}
              />
              <PrimaryButtonComponent
                obj={{
                  onPress: navigateToBookingDetails,
                  text: t('bookNow'),
                  buttonStyle: staticStyle.booknowButton,
                }}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};
