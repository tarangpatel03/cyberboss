import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Theme } from '../../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from './styles';
import { isDarkMode } from '../../../utils/theme/darkMode';
import { ScreenHeaderComponent } from '../../../components/Headers/ScreenHeaderComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { routeName } from '../../../config/constants/routes';
import { rootNavigationProps } from '../../../models/navigationModal';
import { NotificationCard } from '../../../components/Cards/NotificationCard';
import { useEffect, useRef, useState } from 'react';
import { getAPIData } from '../../../services/api/getApi/getAPI';
import { ApiNotificationModel } from '../../../models/api/models';
import { ListEmptyCard } from '../../../components/Cards/ListEmptyCard';
import {
  INotificationModal,
  transformNotificationModal,
} from '../../../models/formattedAPI/formatedModals';
import { appImages } from '../../../config/images/imagePath';
import { ListShimmer } from '../../../components/Skeleton/ListShimmer';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { useTranslation } from 'react-i18next';

export const NotificationScreen = ({
  navigation,
}: rootNavigationProps<routeName.Notification>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [notifications, setNotifications] = useState<INotificationModal[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const pageRef = useRef<number>(1);
  const hasMoreRef = useRef<boolean>(false);
  const paginationLoadingRef = useRef<boolean>(false);

  const loadNotifications = async (pageToLoad = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        pageToLoad = 1;
      } else {
        setLoader(true);
      }
      const payload = await getAPIData(endPoints.notification, pageToLoad);
      const data: ApiNotificationModel[] = payload.data;
      const transformedData: INotificationModal[] = data
        ? data?.map(r => transformNotificationModal(r))
        : [];
      hasMoreRef.current = payload.meta.current_page < payload.meta.last_page;
      pageRef.current = payload.meta.current_page;
      setNotifications(transformedData);
    } catch (error) {
      console.log(error);
    }
  };
  const emptyCard = () => {
    return (
      <ListEmptyCard
        text={t('noNotification')}
        image={appImages.img_noNotification}
        tintColor={theme.colors.textPrimary}
      />
    );
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }: any) => {
    return <NotificationCard data={item} />;
  };

  const handleLoadMore = () => {
    if (hasMoreRef.current && !loader) {
      paginationLoadingRef.current = true;
      loadNotifications(pageRef.current + 1);
    }
  };

  useEffect(() => {
    loadNotifications().then(() => setLoader(false));
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.bgPrimary])}
      >
        <ScreenHeaderComponent
          onPress={goBack}
          headerText={t('notifications')}
        />
        {loader && (
          <ListShimmer containerStyle={staticStyle.shimmerContainer} />
        )}
        {!loader && (
          <View style={staticStyle.subContainer}>
            <FlatList
              data={notifications}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              initialNumToRender={12}
              ListEmptyComponent={emptyCard}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              contentContainerStyle={staticStyle.listItems}
              ListFooterComponent={
                paginationLoadingRef.current ? <ActivityIndicator /> : null
              }
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
