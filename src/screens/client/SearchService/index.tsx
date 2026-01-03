import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import {
  createStyles,
  staticStyle,
} from '@screens/client/SearchService/styles';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBorderInputComponent } from '@components/Input/SearchInput';
import { appIcons } from '@config/icons/iconPath';
import { useDebouncedValue } from '@hooks/debounce/useDebounce';
import { ServiceCard } from '@components/Cards/ServiceCard';
import { ListEmptyCard } from '@components/Cards/ListEmptyCard';
import { ListShimmer } from '@components/Skeleton/ListShimmer';
import { useTranslation } from 'react-i18next';
import { getServiceList } from '@services/api/expertise/getServicesList';
import { ApiExpertiseModel } from '@models/api/consultant';
import {
  TExpertiseModel,
  transformExpertiseModel,
} from '@models/formattedAPI/tConsultant';
import { ApiResponse } from '@models/apiModel';

export const SearchServiceScreen = ({
  navigation,
}: RootNavigationProps<routeName.SearchServices>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [searchText, setText] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);
  const debouncedSearchText = useDebouncedValue<string>(searchText);
  const [services, setServices] = useState<TExpertiseModel[]>([]);

  const loadData = async () => {
    try {
      setLoader(true);
      const response = await getServiceList<ApiResponse<ApiExpertiseModel[]>>(
        debouncedSearchText,
      );
      if (!response) return;
      const data: ApiExpertiseModel[] = response.payload;
      const transformedData = data.map(r => transformExpertiseModel(r));
      setServices(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };
  const navigateToConsultantList = (id: string, name: string) => {
    navigation.navigate(routeName.ConsultantList, { id, name });
  };

  const renderItem: ListRenderItem<TExpertiseModel> = useCallback(
    ({ item }) => {
      return <ServiceCard onPress={navigateToConsultantList} data={item} />;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const emptyCard = () => {
    return <ListEmptyCard text={`${t('noServiceFound', { searchText })}`} />;
  };

  useEffect(() => {
    console.log('API Called');
    loadData().then(() => setLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.searchHeader}>
          <SearchBorderInputComponent
            placeholder={t('searchHere')}
            setValue={setText}
            value={searchText}
            icon={appIcons.ic_backIcon}
            onIconPress={goBack}
          />
        </View>
        {loader && <ListShimmer containerStyle={staticStyle.browseService} />}
        {!loader && (
          <FlatList
            data={services}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            initialNumToRender={10}
            contentContainerStyle={staticStyle.list}
            ListEmptyComponent={emptyCard}
          />
        )}
      </SafeAreaView>
    </>
  );
};
