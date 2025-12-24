import { StatusBar, ScrollView, StyleSheet } from 'react-native';
import {
  bookingHistory,
  recentActivities,
} from '../../../demoData/homeScreenData';
import { useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import {
  IConsultantHomeModel,
  IProfileModal,
  transformConsultantHomeModel,
  transformProfileModal,
} from '../../../models/formattedAPI/formatedModals';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { getAPIData } from '../../../services/api/getApi/getAPI';
import { appImages } from '../../../config/images/imagePath';
import {
  ApiConsultantHomeModel,
  ApiProfileModel,
} from '../../../models/api/models';
import { routeName } from '../../../config/constants/routes';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { rootNavigationProps } from '../../../models/navigationModal';
import { RecentActivity } from '../../../components/Cards/RecentActivity';
import { BookingHistoryCard } from '../../../components/Cards/BookingHistoryCard';
import { ConsultantHeaderCard } from '../../../components/Headers/ConsultantHeaderCard';
import { ConsultantBookingHistoryList } from '../../../components/List/ConsultantBookingHistoryList';
import { RecentActivityList } from '../../../components/List/RecentActivityList';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../redux/features/userSlice';

export const ConsultantHomeScreen = ({
  navigation,
}: rootNavigationProps<routeName.Home>) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState<IProfileModal>({
    id: '',
    name: 'User',
    email: '',
    phoneNumber: null,
    profilePicture: undefined,
    role: 'consultant',
    bio: null,
    experienceYear: null,
    rate: null,
    expertises: [],
    services: [],
    isVerified: false,
    loginType: 'social',
    profileSetup: false,
  });

  const [homeData, setHomeData] = useState<IConsultantHomeModel>({
    averageRating: 0,
    bookings: [],
    notification: [],
    totalEarnings: '0',
    walletBalance: 0,
  });

  const navigateToNotification = () => {
    navigation.navigate(routeName.Notification);
  };

  const getData = async () => {
    try {
      const res1: ApiConsultantHomeModel = await getAPIData(
        endPoints.consultantHome,
      );
      const transformedData1 = transformConsultantHomeModel(res1);
      setHomeData(transformedData1);
      const res2: ApiProfileModel = await getAPIData(
        endPoints.consultantProfile,
      );
      const transformedData2 = transformProfileModal(res2);
      setProfileData(transformedData2);
      dispatch(
        setUserData({
          id: transformedData2.id,
          name: transformedData2.name,
          email: transformedData2.email,
          profile_setup: transformedData2.profileSetup,
          profilePicture: transformedData2.profilePicture,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderBookingHistoryItem = ({ item }: any) => {
    return (
      <BookingHistoryCard
        obj={{
          charge: item.charge,
          date: item.date,
          name: item.name,
          service: item.service,
          image: appImages.img_test1,
        }}
      />
    );
  };

  const renderRecentActivityItem = ({ item }: any) => {
    return (
      <RecentActivity
        obj={{
          image: item.image,
          message: item.message,
          time: item.time,
        }}
      />
    );
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={StyleSheet.flatten([
          staticStyle.background,
          styles.backgroundPrimary,
        ])}
      >
        <ConsultantHeaderCard
          profileData={profileData}
          userData={homeData}
          navigateToNotification={navigateToNotification}
        />
        {bookingHistory.length !== 0 && (
          <ConsultantBookingHistoryList
            data={homeData.bookings}
            renderBookingHistoryItem={renderBookingHistoryItem}
          />
        )}
        {recentActivities.length !== 0 && (
          <RecentActivityList
            data={homeData.notification}
            renderRecentActivityItem={renderRecentActivityItem}
          />
        )}
      </ScrollView>
    </>
  );
};
