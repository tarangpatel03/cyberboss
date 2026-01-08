import {
  StatusBar,
  ScrollView,
  StyleSheet,
  ListRenderItem,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from '@screens/consultant/Home/styles';
import { Theme } from '@config/themes/themes';
import { getAPIData } from '@services/api/common/getCommonApi';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '@redux/features/userSlice';
import { ApiConsultantHomeModel } from '@models/api/home';
import { ApiProfileModel } from '@models/api/profile';
import {
  TConsultantHomeModel,
  TConsultantHomeNotificationModel,
  transformConsultantHomeModel,
} from '@models/formattedAPI/tHome';
import {
  TProfileModel,
  transformProfileModel,
} from '@models/formattedAPI/tProfile';
import { THomeBookingModel } from '@models/formattedAPI/tBookings';
import { RootState } from '@redux/store';
import firestore from '@react-native-firebase/firestore';
import { ApiResponse } from '@models/apiModel';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const ConsultantHomeScreen = ({
  navigation,
}: RootNavigationProps<routeName.Home>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const userIdRead = useSelector((state: RootState) => state.user.userData.id);
  const [profileData, setProfileData] = useState<TProfileModel>({
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
    isVerified: true,
    loginType: 'social',
    profileSetup: false,
  });

  const [homeData, setHomeData] = useState<TConsultantHomeModel>({
    averageRating: 0,
    bookings: [],
    notification: [],
    totalEarnings: '0',
    walletBalance: 0,
  });

  const navigateToNotification = () => {
    navigation.navigate(routeName.Notification);
  };

  const navigateToProfile = () => {
    navigation.navigate(routeName.Profile);
  };

  const getData = async () => {
    try {
      const response1 = await getAPIData<ApiResponse<ApiConsultantHomeModel>>(
        Config.endPoints.consultantHome,
      );
      if (!response1) return;
      const data1: ApiConsultantHomeModel = response1.payload;
      const transformedData1 = transformConsultantHomeModel(data1);
      setHomeData(transformedData1);
      const response2 = await getAPIData<ApiResponse<ApiProfileModel>>(
        Config.endPoints.consultantProfile,
      );
      if (!response2) return;
      const data2: ApiProfileModel = response2.payload;
      const transformedData2 = transformProfileModel(data2);
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

  const navigateToChat = async ({
    bookingId,
    id,
    image,
    name,
  }: {
    bookingId: string;
    id: string;
    image: string | number | { uri: string } | undefined;
    name: string;
  }) => {
    const data = await firestore()
      .collection('chats')
      .doc(`booking_${bookingId}`)
      .get()
      .then(snapshot => {
        const data1 = {
          id: snapshot.id,
          ...snapshot.data(),
        };
        return data1;
      });
    // @ts-ignore
    if (data) {
      navigation.navigate(routeName.OneOnOneChat, {
        consultantImage: image,
        consultantName: name,
        userID: userIdRead,
        chatID: `booking_${bookingId}`,
      });
    } else {
      firestore()
        .collection('chats')
        .doc(`booking_${bookingId}`)
        .set({
          bookingId: bookingId,
          users: [userIdRead, id],
          unreadCount: {
            [`${id}`]: 0,
            [`${userIdRead}`]: 0,
          },
          lastSeenTimestamp: {
            [`${id}`]: firestore.FieldValue.serverTimestamp(),
            [`${userIdRead}`]: firestore.FieldValue.serverTimestamp(),
          },
          onlineStatus: {
            [`${id}`]: false,
            [`${userIdRead}`]: true,
          },
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      navigation.navigate(routeName.OneOnOneChat, {
        consultantImage: image,
        consultantName: name,
        userID: userIdRead,
        chatID: `booking_${bookingId}`,
      });
    }
  };

  const renderBookingHistoryItem: ListRenderItem<THomeBookingModel> =
    useCallback(({ item }) => {
      return <Components.Cards.BookingHistoryCard data={item} navigateToChat={navigateToChat} />;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const renderRecentActivityItem: ListRenderItem<TConsultantHomeNotificationModel> =
    useCallback(({ item }) => {
      return (
        <Components.Cards.RecentActivity
          id={item.id}
          body={item.body}
          title={item.title}
          createdAt={item.createdAt}
        />
      );
    }, []);

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
        <Components.Headers.ConsultantHeaderCard
          profileData={profileData}
          userData={homeData}
          navigateToProfile={navigateToProfile}
          navigateToNotification={navigateToNotification}
        />
        {homeData.bookings.length !== 0 && (
          <Components.List.ConsultantBookingHistoryList
            data={homeData.bookings}
            renderBookingHistoryItem={renderBookingHistoryItem}
          />
        )}
        <View style={staticStyle.header}>
          <Components.TextComponent
            family={'medium'}
            text={t('recentActivity')}
            textStyle={StyleSheet.flatten([
              staticStyle.headerText,
              styles.textPrimary,
            ])}
          />
          {homeData.notification.length !== 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={navigateToNotification}
              style={staticStyle.viewAllButton}
            >
              <Components.TextComponent
                family={'regular'}
                text={t('viewAll')}
                textStyle={StyleSheet.flatten([
                  staticStyle.viewAllText,
                  styles.viewAllText,
                ])}
              />
              <FastImage
                source={Config.appIcons.ic_rightArrow}
                style={staticStyle.viewAllIcon}
                tintColor={theme.colors.primary}
              />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={homeData.notification}
          scrollEnabled={false}
          initialNumToRender={5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={staticStyle.listItems}
          keyExtractor={item => item.id}
          renderItem={renderRecentActivityItem}
          ListEmptyComponent={
            <Components.Cards.ListEmptyCard text={t('noRecentActivityFound')} />
          }
        />
      </ScrollView>
    </>
  );
};
