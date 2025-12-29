import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import React, { useCallback, useEffect, useState } from 'react';
import { rootNavigationProps } from '../../../models/navigationModal';
import { routeName } from '../../../config/constants/routes';
import { BookingHistoryCard } from '../../../components/Cards/BookingHistoryCard';
import { ServiceCard } from '../../../components/Cards/ServiceCard';
import { WorkshopCard } from '../../../components/Cards/WorkshopCard';
import { ClientHomeScreenShimmer } from '../../../components/Skeleton/clientHome';
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import { useIsFocused } from '@react-navigation/native';
import { setShowTour } from '../../../redux/features/userSlice';
import { useClientHome } from './useClientHome';
import { HomeScreenSearchButtons } from '../../../components/Buttons/HomeScreenSearchBar';
import { TopBarComponent } from '../../../components/Headers/TopBarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../../redux/store';
import { useTranslation } from 'react-i18next';
import { HomeScreenListHeaderComponent } from '../../../components/Headers/HomeScreenListHeader';
import { tExpertiesModel } from '../../../models/formattedAPI/tConsultant';

export const ClientHomeScreen = ({
  navigation,
}: rootNavigationProps<routeName.Home>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme<Theme>();
  const isFocused = useIsFocused();
  const styles = createStyles(theme);
  const [layoutReady, setLayoutReady] = useState(false);
  const handleOnStop = () => dispatch(setShowTour(false));
  const { canStart, start, eventEmitter } = useTourGuideController();
  const showTour = useSelector((state: rootState) => state.user.showTour);
  const { loader, refreshing, homeData, profileData, onRefresh, getPicture } =
    useClientHome();

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

  const navigateToContactSupport = () => {
    navigation.navigate(routeName.ContactSupport);
  };

  const renderWorkshopItem = ({ item }: any) => (
    <WorkshopCard data={item} cardStyle={staticStyle.card} />
  );

  const renderBookingItem = ({ item }: any) => (
    <BookingHistoryCard
      charge={item.charge}
      date={item.date}
      name={item.name}
      service={item.service}
      image={item.profilePicture}
    />
  );

  const renderBrowseServiceItem: ListRenderItem<tExpertiesModel> = useCallback(
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
        navigateToWorkshop={navigateToWorkshop}
        renderWorkshopItem={renderWorkshopItem}
        renderBookingItem={renderBookingItem}
      />
    );
  };

  useEffect(() => {
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
            name={profileData.name}
            picture={getPicture()}
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
