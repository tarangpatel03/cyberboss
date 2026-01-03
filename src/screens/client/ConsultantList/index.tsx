import { useTheme } from '@shopify/restyle';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { Theme } from '../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { RootNavigationProps } from '../../../models/navigationModel';
import { routeName } from '../../../config/constants/routes';
import { ConsultantListCard } from '../../../components/Cards/ConsultantListCard';
import { SearchBorderInputComponent } from '../../../components/Input/SearchInput';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScreenHeaderComponent } from '../../../components/Headers/ScreenHeader';
import { useDebouncedValue } from '../../../hooks/debounce/useDebounce';
import { ListEmptyCard } from '../../../components/Cards/ListEmptyCard';
import { ListShimmer } from '../../../components/Skeleton/ListShimmer';
import { useTranslation } from 'react-i18next';
import { getConsultantList } from '../../../services/api/consultant/getConsultantList';
import { ApiConsultantModel } from '../../../models/api/consultant';
import {
  TConsultantModel,
  transformConsultantModel,
} from '../../../models/formattedAPI/tConsultant';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiResponse, ListPayload } from '../../../models/apiModel';

export const ConsultantListScreen = ({
  navigation,
  route,
}: RootNavigationProps<routeName.ConsultantList>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const { id, name } = route.params;
  const styles = createStyles(theme);
  const pageRef = useRef<number>(1);
  const [loader, setLoader] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const debouncedSearchText = useDebouncedValue(searchText);
  const [consultantsList, setConsultantsList] = useState<TConsultantModel[]>(
    [],
  );

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToConsultant = (consultantId: string) => {
    navigation.navigate(routeName.ConsultantProfile, {
      consultantId,
      type: name,
    });
  };

  const handleLoadMore = () => {
    if (hasMore && !loader) {
      setPaginationLoading(true);
      pageRef.current += 1;
    }
  };

  const loadData = async (pageToLoad = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        pageToLoad = 1;
      } else {
        setLoader(true);
      }
      const response = await getConsultantList<
        ApiResponse<ListPayload<ApiConsultantModel>>
      >(id, pageToLoad, searchText);
      if (!response) return;
      const data: ApiConsultantModel[] = response.payload.data;
      const formattedData = data
        ? data?.map(res => transformConsultantModel(res))
        : [];
      setHasMore(
        response.payload.meta.current_page < response.payload.meta.last_page,
      );
      pageRef.current = response.payload.meta.current_page;
      setConsultantsList(formattedData);
    } catch (error) {
      console.log(error);
    } finally {
      setPaginationLoading(false);
      setLoader(false);
    }
  };

  const renderItem: ListRenderItem<TConsultantModel> = useCallback(
    ({ item }) => {
      return <ConsultantListCard data={item} onPress={navigateToConsultant} />;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const emptyCard = () => {
    return (
      <ListEmptyCard text={`${t('noConsultantFound', { searchText })} `} />
    );
  };

  useEffect(() => {
    loadData().then(() => {
      setLoader(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.topBar}>
          <ScreenHeaderComponent onPress={goBack} headerText={name} />
        </View>
        <View style={staticStyle.searchBar}>
          <SearchBorderInputComponent
            autoFocus={true}
            setValue={setSearchText}
            value={searchText}
            placeholder={t('searchConsultants')}
          />
        </View>
        {loader && <ListShimmer containerStyle={staticStyle.shimmer} />}
        {!loader && (
          <View style={staticStyle.list}>
            <FlatList
              data={consultantsList}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              initialNumToRender={10}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              contentContainerStyle={staticStyle.listItems}
              ListEmptyComponent={emptyCard}
              ListFooterComponent={
                paginationLoading ? <ActivityIndicator size={'large'} /> : null
              }
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
