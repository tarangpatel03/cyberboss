import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from '@screens/common/Notification/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAPIData } from '@services/api/common/getCommonApi';
import { useTranslation } from 'react-i18next';
import { ApiNotificationModel } from '@models/api/notification';
import {
  TNotificationModel,
  transformNotificationModel,
} from '@models/formattedAPI/tNotification';
import { ApiResponse, ListPayload } from '@models/apiModel';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const NotificationScreen = ({
  navigation,
}: RootNavigationProps<routeName.Notification>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [notifications, setNotifications] = useState<TNotificationModel[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const pageRef = useRef<number>(1);
  const hasMoreRef = useRef<boolean>(false);
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);

  const loadNotifications = async (pageToLoad = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        pageToLoad = 1;
      } else {
        setLoader(true);
      }
      const response = await getAPIData<
        ApiResponse<ListPayload<ApiNotificationModel>>
      >(Config.endPoints.notification, pageToLoad);
      if (!response) return;
      const data: ApiNotificationModel[] = response.payload.data;
      const transformedData: TNotificationModel[] = data
        ? data?.map(r => transformNotificationModel(r))
        : [];
      hasMoreRef.current =
        response.payload.meta.current_page < response.payload.meta.last_page;
      pageRef.current = response.payload.meta.current_page;
      setNotifications(transformedData);
    } catch (error) {
      console.log(error);
    }
  };
  const emptyCard = () => {
    return (
      <Components.Cards.ListEmptyCard
        text={t('noNotification')}
        image={Config.appImages.img_noNotification}
        tintColor={theme.colors.textPrimary}
      />
    );
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem: ListRenderItem<TNotificationModel> = useCallback(
    ({ item }) => {
      return <Components.Cards.NotificationCard data={item} />;
    },
    [],
  );

  const handleLoadMore = () => {
    if (hasMoreRef.current && !loader) {
      setPaginationLoading(true);
      loadNotifications(pageRef.current + 1);
    }
  };

  useEffect(() => {
    loadNotifications().then(() => setLoader(false));
  }, []);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.bgPrimary])}
      >
        <Components.Headers.ScreenHeader
          onPress={goBack}
          headerText={t('notifications')}
        />
        {loader && (
          <Components.Skeleton.ListShimmer containerStyle={staticStyle.shimmerContainer} />
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
                paginationLoading ? <ActivityIndicator /> : null
              }
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
