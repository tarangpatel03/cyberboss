import { StatusBar, ScrollView, StyleSheet } from 'react-native';
import {
  bookingHistory,
  recentActivities,
} from '../../../demoData/homeScreenData';
import { useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import {
  IProfileModal,
  transformProfileModal,
} from '../../../models/formattedAPI/formatedModals';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { getAPIData } from '../../../services/api/getApi/getAPI';
import { appImages } from '../../../config/images/imagePath';
import { ApiProfileModal } from '../../../models/api/models';
import { routeName } from '../../../config/constants/routes';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { rootNavigationProps } from '../../../models/navigationModal';
import { RecentActivity } from '../../../components/Cards/RecentActivity';
import { BookingHistoryCard } from '../../../components/Cards/BookingHistoryCard';
import { ConsultantHeaderCard } from '../../../components/Headers/ConsultantHeaderCard';
import { ConsultantBookingHistoryList } from '../../../components/List/ConsultantBookingHistoryList';
import { RecentActivityList } from '../../../components/List/RecentActivityList';

export const ConsultantHomeScreen = ({
  navigation,
}: rootNavigationProps<routeName.ConsultantHome>) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
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

  const navigateToNotification = () => {
    navigation.navigate(routeName.Notification);
  };

  const getData = async () => {
    try {
      const res: ApiProfileModal = await getAPIData(
        endPoints.consultantProfile,
      );
      const transformedData = transformProfileModal(res);
      setProfileData(transformedData);
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
          navigateToNotification={navigateToNotification}
        />
        {bookingHistory.length !== 0 && (
          <ConsultantBookingHistoryList
            renderBookingHistoryItem={renderBookingHistoryItem}
          />
        )}
        {recentActivities.length !== 0 && (
          <RecentActivityList
            renderRecentActivityItem={renderRecentActivityItem}
          />
        )}
      </ScrollView>
    </>
  );
};
