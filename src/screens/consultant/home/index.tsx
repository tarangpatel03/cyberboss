import { StatusBar, ScrollView, StyleSheet } from 'react-native';
import {
  bookingHistory,
  recentActivities,
} from '../../../demoData/homeScreenData';
import { useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { getAPIData } from '../../../services/api/getApi/getAPI';
import { appImages } from '../../../config/images/imagePath';
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
import { ApiConsultantHomeModel } from '../../../models/api/home';
import { ApiProfileModel } from '../../../models/api/profile';
import {
  IConsultantHomeModel,
  transformConsultantHomeModel,
} from '../../../models/formattedAPI/tHome';
import {
  IProfileModel,
  transformProfileModel,
} from '../../../models/formattedAPI/tProfile';

export const ConsultantHomeScreen = ({
  navigation,
}: rootNavigationProps<routeName.Home>) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState<IProfileModel>({
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
      const transformedData2 = transformProfileModel(res2);
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
