import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { createStyles, staticStyle } from '@screens/client/Home/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { RootNavigationProps } from '@models/navigationModel';
import { routeName } from '@config/constants/routes';
import { BookingHistoryCard } from '@components/Cards/BookingHistoryCard';
import { ServiceCard } from '@components/Cards/ServiceCard';
import { WorkshopCard } from '@components/Cards/WorkshopCard';
import { ClientHomeScreenShimmer } from '@components/Skeleton/clientHome';
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import { useIsFocused } from '@react-navigation/native';
import { setShowTour } from '@redux/features/userSlice';
import { useClientHome } from '@screens/client/Home/useClientHome';
import { HomeScreenSearchButtons } from '@components/Buttons/HomeScreenSearchBar';
import { TopBarComponent } from '@components/Headers/TopBarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { HomeScreenListHeaderComponent } from '@components/Headers/HomeScreenListHeader';
import {
  TExpertiseModel,
  TWorkshopModel,
} from '@models/formattedAPI/tConsultant';
import firestore from '@react-native-firebase/firestore';
import { THomeBookingModel } from '@models/formattedAPI/tBookings';
import { RootState } from '@redux/store';

export const ClientHomeScreen = ({
  navigation,
}: RootNavigationProps<routeName.Home>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme<Theme>();
  const isFocused = useIsFocused();
  const styles = createStyles(theme);
  const { id: userIdRead, profilePicture } = useSelector(
    (state: RootState) => state.user.userData,
  );
  const [layoutReady, setLayoutReady] = useState(false);
  const handleOnStop = () => dispatch(setShowTour(false));
  const { canStart, start, eventEmitter } = useTourGuideController();
  const showTour = useSelector((state: RootState) => state.user.showTour);
  const { loader, refreshing, homeData, onRefresh } = useClientHome();

  const navigateToWorkshop = () => {
    navigation.navigate(routeName.Workshop);
  };

  const navigateToConsultantList = (id: string, name: string) => {
    navigation.navigate(routeName.ConsultantList, { id, name });
  };

  const navigateToNotification = () => {
    navigation.navigate(routeName.Notification);
  };

  const navigateToSubscription = () => {
    navigation.navigate(routeName.Subscription);
  };

  const navigateToSearchService = () => {
    navigation.navigate(routeName.SearchServices);
  };

  const navigateToProfile = () => {
    navigation.navigate(routeName.Profile);
  };

  const navigateToHistory = () => {
    navigation.navigate(routeName.History);
  };

  const navigateToContactSupport = () => {
    navigation.navigate(routeName.ContactSupport);
  };

  const renderWorkshopItem: ListRenderItem<TWorkshopModel> = useCallback(
    ({ item }) => <WorkshopCard data={item} cardStyle={staticStyle.card} />,
    [],
  );

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
    console.log('ChatData: ', data);

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

  const renderBookingItem: ListRenderItem<THomeBookingModel> = useCallback(
    ({ item }) => (
      <BookingHistoryCard data={item} navigateToChat={navigateToChat} />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const renderBrowseServiceItem: ListRenderItem<TExpertiseModel> = useCallback(
    ({ item }) => (
      <ServiceCard onPress={navigateToConsultantList} data={item} />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const headerComponent = () => {
    return (
      <HomeScreenListHeaderComponent
        homeData={homeData}
        navigateToHistory={navigateToHistory}
        navigateToWorkshop={navigateToWorkshop}
        renderWorkshopItem={renderWorkshopItem}
        renderBookingItem={renderBookingItem}
      />
    );
  };

  useEffect(() => {
    console.log('User Data: ', profilePicture);

    const dataLoaded =
      homeData.workshops.length > 0 ||
      homeData.bookings.length > 0 ||
      homeData.expertises.length > 0;

    if (
      showTour &&
      isFocused &&
      !loader &&
      layoutReady &&
      dataLoaded &&
      canStart
    ) {
      setTimeout(() => {
        start();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTour, isFocused, loader, layoutReady, homeData, canStart]);

  useEffect(() => {
    eventEmitter?.on('stop', handleOnStop);

    return () => {
      eventEmitter?.off('stop', handleOnStop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loader && <ClientHomeScreenShimmer />}
      {!loader && (
        <View
          onLayout={() => setLayoutReady(true)}
          style={StyleSheet.flatten([
            staticStyle.background,
            styles.background,
          ])}
        >
          <TopBarComponent
            isSubscriber={homeData.isSubscriber}
            onPressProfile={navigateToProfile}
            onPressSubscription={navigateToSubscription}
            onPressNotification={navigateToNotification}
          />
          <HomeScreenSearchButtons
            onSearchPress={navigateToSearchService}
            onHelpPress={navigateToContactSupport}
          />
          <TourGuideZone zone={1} text={t('tour1')}>
            <View style={staticStyle.tour} />
          </TourGuideZone>
          <View style={staticStyle.container}>
            <FlatList
              data={homeData.expertises}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={renderBrowseServiceItem}
              contentContainerStyle={staticStyle.list}
              ListHeaderComponent={headerComponent}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  progressViewOffset={10}
                />
              }
              ListEmptyComponent={null}
              initialNumToRender={5}
            />
          </View>
        </View>
      )}
    </>
  );
};
