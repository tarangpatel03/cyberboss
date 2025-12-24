import { useTheme } from '@shopify/restyle';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { rootNavigationProps } from '../../../models/navigationModal';
import { routeName } from '../../../config/constants/routes';
import { ConsultantListCard } from '../../../components/Cards/ConsultantListCard';
import { SearchBorderInputComponent } from '../../../components/Input/SearchInput';
import { useEffect, useRef, useState } from 'react';
import { isDarkMode } from '../../../utils/theme/darkMode';
import { ScreenHeaderComponent } from '../../../components/Headers/ScreenHeaderComponent';
import { useDebouncedValue } from '../../../utils/debounce/debounce';
import { ListEmptyCard } from '../../../components/Cards/ListEmptyCard';
import { ListShimmer } from '../../../components/Skeleton/ListShimmer';
import { useTranslation } from 'react-i18next';
import { getConsultantList } from '../../../services/api/getApi/getConsultantList';
import { ApiConsultantModel } from '../../../models/api/consultant';
import {
  IConsultantModel,
  transformConsultantModel,
} from '../../../models/formattedAPI/tConsultant';

export const ConsultantListScreen = ({
  navigation,
  route,
}: rootNavigationProps<routeName.ConsultantList>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const { id, name } = route.params;
  const styles = createStyles(theme);
  const pageRef = useRef<number>(1);
  const [loader, setLoader] = useState<boolean>(true);
  const hasMoreRef = useRef<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebouncedValue(searchText);
  const [consultantsList, setConsultantsList] = useState<IConsultantModel[]>(
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
    if (hasMoreRef && !loader) {
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
      const payload = await getConsultantList(id, pageToLoad, searchText);
      const data: ApiConsultantModel[] = payload.data;
      const formattedData = data
        ? data?.map(res => transformConsultantModel(res))
        : [];
      hasMoreRef.current = payload.meta.current_page < payload.meta.last_page;
      pageRef.current = payload.meta.current_page;
      setConsultantsList(formattedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const renderItem = ({ item }: any) => {
    return <ConsultantListCard data={item} onPress={navigateToConsultant} />;
  };
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
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
      <View
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.topbar}>
          <ScreenHeaderComponent onPress={goBack} headerText={name} />
        </View>
        <View style={staticStyle.searchBar}>
          <SearchBorderInputComponent
            obj={{
              autoFocus: true,
              setValue: setSearchText,
              value: searchText,
              placeholder: t('searchConsultants'),
            }}
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
            />
          </View>
        )}
      </View>
    </>
  );
};
