import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import { RootNavigationProps } from '@models/navigationModel';
import { routeName } from '@config/constants/routes';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { createStyles, staticStyle } from '@screens/client/Workshop/styles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAPIData } from '@services/api/common/getCommonApi';
import { useTranslation } from 'react-i18next';
import { ApiWorkshopModel } from '@models/api/consultant';
import {
  TWorkshopModel,
  transformWorkshopModel,
} from '@models/formattedAPI/tConsultant';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiResponse, ListPayload } from '@models/apiModel';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const WorkshopScreen = ({
  navigation,
}: RootNavigationProps<routeName.Workshop>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [loader, setLoader] = useState<boolean>(true);
  const [workshop, setWorkshop] = useState<TWorkshopModel[]>([]);
  const pageRef = useRef<number>(1);
  const hasMoreRef = useRef<boolean>(false);
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);

  const goBack = () => {
    navigation.goBack();
  };

  const getData = async (pageToLoad = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        pageToLoad = 1;
      } else {
        setLoader(true);
      }
      const response = await getAPIData<
        ApiResponse<ListPayload<ApiWorkshopModel>>
      >(Config.endPoints.workshopList, pageToLoad);
      if (!response) return;
      const res: ApiWorkshopModel[] = response.payload.data;
      const transformedData: TWorkshopModel[] = res
        ? res?.map(r => transformWorkshopModel(r))
        : [];
      hasMoreRef.current =
        response.payload.meta.current_page < response.payload.meta.last_page;
      pageRef.current = response.payload.meta.current_page;
      setWorkshop(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = () => {
    if (hasMoreRef.current && !loader) {
      setPaginationLoading(true);
      getData(pageRef.current + 1);
    }
  };
  const emptyCard = () => {
    return (
      <Components.Cards.ListEmptyCard
        text={t('noWorkshop')}
        image={Config.appImages.img_noWorkshop}
        tintColor={theme.colors.textPrimary}
      />
    );
  };

  const renderItem: ListRenderItem<TWorkshopModel> = useCallback(({ item }) => {
    return <Components.Cards.WorkshopCard data={item} cardStyle={staticStyle.cardStyle} />;
  }, []);

  useEffect(() => {
    getData().then(() => setLoader(false));
  }, []);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <Components.Headers.ScreenHeader onPress={goBack} headerText={t('workshop')} />
        {loader && (
          <Components.Skeleton.ListShimmer containerStyle={staticStyle.shimmerContainer} />
        )}
        {!loader && (
          <FlatList
            data={workshop}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            initialNumToRender={7}
            ListEmptyComponent={emptyCard}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              paginationLoading ? <ActivityIndicator /> : null
            }
          />
        )}
      </SafeAreaView>
    </>
  );
};
