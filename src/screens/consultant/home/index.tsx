import {
  FlatList,
  ListRenderItem,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
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
import { transformProfileModel } from '@models/formattedAPI/tProfile';
import { THomeBookingModel } from '@models/formattedAPI/tBookings';
import { RootState } from '@redux/store';
import firestore from '@react-native-firebase/firestore';
import { ApiResponse } from '@models/apiModel';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Config } from '@config/index';
import { Components } from '@components/index';
import { width } from '@config/constants/variables.ts';
import { Utils } from '@utils/index.ts';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';

export const ConsultantHomeScreen = ({
  navigation,
}: RootNavigationProps<routeName.Home>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const {
    name,
    profilePicture,
    id: userIdRead,
  } = useSelector((state: RootState) => state.user.userData);
  const [profilePictureError, setProfilePictureError] =
    useState<boolean>(false);

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

  const navigateToBookingSummary = (id: string) => {
    navigation.navigate(routeName.BookingSummary, { id });
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
      Utils.showErrorToast({ title: error as string });
    }
  };

  const navigateToHistory = () => {
    navigation.navigate(routeName.History);
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
        return {
          id: snapshot.id,
          ...snapshot.data(),
        };
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
      await firestore()
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
      return (
        <Components.Cards.BookingHistoryCard
          navigateToSummary={navigateToBookingSummary}
          data={item}
          navigateToChat={navigateToChat}
        />
      );
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
        <RadialGradient
          radius={200}
          style={staticStyle.gradientCard}
          colors={[Config.appColors.app_1E3D92, Config.appColors.app_1D2742]}
          center={[width / 2, 300]}
        >
          <View style={staticStyle.container}>
            <View
              style={StyleSheet.flatten([
                staticStyle.row,
                staticStyle.paddingTop,
              ])}
            >
              <TouchableOpacity activeOpacity={0.8} onPress={navigateToProfile}>
                <View style={staticStyle.row}>
                  <View style={staticStyle.image}>
                    <FastImage
                      source={
                        profilePictureError
                          ? Config.appImages.img_defaultProfile
                          : profilePicture
                          ? Utils.getProfilePicture(profilePicture)
                          : Config.appImages.img_defaultProfile
                      }
                      style={staticStyle.image}
                      onError={() => setProfilePictureError(true)}
                    />
                  </View>
                  <Components.TextComponent
                    family={'semiBold'}
                    text={name}
                    textStyle={StyleSheet.flatten([
                      staticStyle.name,
                      styles.whiteText,
                    ])}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={navigateToNotification}
              >
                <FastImage
                  source={Config.appIcons.ic_notificationBell}
                  style={staticStyle.bellButton}
                  tintColor={theme.colors.pureWhite}
                />
              </TouchableOpacity>
            </View>
            <View
              style={StyleSheet.flatten([
                staticStyle.statusContainer,
                styles.statusContainer,
              ])}
            >
              <View style={staticStyle.centerRow}>
                <View style={staticStyle.counter}>
                  <Components.TextComponent
                    family={'bold'}
                    text={`$${homeData.totalEarnings}`}
                    textStyle={StyleSheet.flatten([
                      staticStyle.countText,
                      styles.whiteText,
                    ])}
                  />
                  <Components.TextComponent
                    family={'regular'}
                    text="Total Earnings"
                    textStyle={StyleSheet.flatten([
                      staticStyle.subtitleText,
                      styles.textSecondary,
                    ])}
                  />
                </View>
                <LinearGradient
                  style={staticStyle.verticalSeparator}
                  colors={[
                    Config.appColors.app_FFFFFF40,
                    Config.appColors.app_FFFFFF00,
                    Config.appColors.app_FFFFFF40,
                  ]}
                />
                <View style={staticStyle.counter}>
                  <View style={staticStyle.directionRow}>
                    <Components.TextComponent
                      family={'bold'}
                      text={`${homeData.averageRating}`}
                      textStyle={StyleSheet.flatten([
                        staticStyle.countText,
                        styles.whiteText,
                      ])}
                    />
                    <FastImage
                      source={Config.appIcons.ic_ratingStarFill}
                      style={staticStyle.star}
                    />
                  </View>
                  <Components.TextComponent
                    family={'regular'}
                    text="Avg. Rating"
                    textStyle={StyleSheet.flatten([
                      staticStyle.subtitleText,
                      styles.textSecondary,
                    ])}
                  />
                </View>
              </View>
              <LinearGradient
                style={staticStyle.separator}
                start={{
                  x: 0,
                  y: 0.5,
                }}
                end={{
                  x: 1,
                  y: 0.5,
                }}
                colors={[
                  Config.appColors.app_FFFFFF40,
                  Config.appColors.app_FFFFFF00,
                  Config.appColors.app_FFFFFF40,
                ]}
              />
              <View
                style={StyleSheet.flatten([
                  staticStyle.row,
                  staticStyle.transparentBG,
                  styles.transparentBG,
                ])}
              >
                <View style={staticStyle.directionRow}>
                  <FastImage
                    source={Config.appIcons.ic_wallet}
                    style={staticStyle.walletIcon}
                  />
                  <Components.TextComponent
                    family={'regular'}
                    text={t('walletBalance')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.viewAllText,
                      styles.whiteText,
                    ])}
                  />
                </View>
                <Components.TextComponent
                  family={'medium'}
                  text={`$${homeData.walletBalance ?? 0}`}
                  textStyle={StyleSheet.flatten([
                    staticStyle.viewAllText,
                    styles.whiteText,
                  ])}
                />
              </View>
            </View>
          </View>
        </RadialGradient>
        {homeData.bookings.length !== 0 && (
          <View>
            <View style={staticStyle.header}>
              <Components.TextComponent
                family={'medium'}
                text={t('bookingHistory')}
                textStyle={StyleSheet.flatten([
                  staticStyle.headerText,
                  styles.textPrimary,
                ])}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={navigateToHistory}
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
            </View>
            <View
              style={
                Platform.OS === 'ios'
                  ? { paddingLeft: Utils.normalize(12) }
                  : null
              }
            >
              <FlatList
                data={homeData.bookings}
                horizontal
                contentContainerStyle={staticStyle.listItems}
                initialNumToRender={3}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={renderBookingHistoryItem}
                ListEmptyComponent={null}
              />
            </View>
          </View>
        )}
        <View style={staticStyle.recentActivityHeader}>
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
