import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import { rootNavigationProps } from '../../../models/navigationModal';
import { routeName } from '../../../config/constants/routes';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { WorkshopCard } from '../../../components/Cards/WorkshopCard';
import { ScreenHeaderComponent } from '../../../components/Headers/ScreenHeaderComponent';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAPIData } from '../../../services/api/common/getCommonApi';
import { ListEmptyCard } from '../../../components/Cards/ListEmptyCard';
import { appImages } from '../../../config/images/imagePath';
import { ListShimmer } from '../../../components/Skeleton/ListShimmer';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { useTranslation } from 'react-i18next';
import { apiWorkshopModel } from '../../../models/api/consultant';
import {
  tWorkshopModel,
  transformWorkshopModel,
} from '../../../models/formattedAPI/tConsultant';
import { SafeAreaView } from 'react-native-safe-area-context';

export const WorkshopScreen = ({
  navigation,
}: rootNavigationProps<routeName.Workshop>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [loader, setLoader] = useState<boolean>(true);
  const [workshop, setWorkshop] = useState<tWorkshopModel[]>([]);
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
      const payload = await getAPIData(endPoints.workshopList, pageToLoad);
      const res: apiWorkshopModel[] = payload.data;
      const transformedData: tWorkshopModel[] = res
        ? res?.map(r => transformWorkshopModel(r))
        : [];
      hasMoreRef.current = payload.meta.current_page < payload.meta.last_page;
      pageRef.current = payload.meta.current_page;
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
      <ListEmptyCard
        text={t('noWorkshop')}
        image={appImages.img_noWorkshop}
        tintColor={theme.colors.textPrimary}
      />
    );
  };

  const renderItem: ListRenderItem<tWorkshopModel> = useCallback(({ item }) => {
    return <WorkshopCard data={item} cardStyle={staticStyle.cardStyle} />;
  }, []);

  useEffect(() => {
    getData().then(() => setLoader(false));
  }, []);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <ScreenHeaderComponent onPress={goBack} headerText={t('workshop')} />
        {loader && (
          <ListShimmer containerStyle={staticStyle.shimmerContainer} />
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
