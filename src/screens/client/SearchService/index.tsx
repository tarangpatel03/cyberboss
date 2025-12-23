import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { routeName } from '../../../config/constants/routes';
import { rootNavigationProps } from '../../../models/navigationModal';
import { Theme } from '../../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from './styles';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBorderInputComponent } from '../../../components/Input/SearchInput';
import { appIcons } from '../../../config/icons/iconPath';
import { useDebouncedValue } from '../../../utils/debounce/debounce';
import { ApiExpertiesModal } from '../../../models/api/models';
import {
  IExpertiesModal,
  transformExpertiesModal,
} from '../../../models/formattedAPI/formatedModals';
import { ServiceCard } from '../../../components/Cards/ServiceCard';
import { ListEmptyCard } from '../../../components/Cards/ListEmptyCard';
import { ListShimmer } from '../../../components/Skeleton/ListShimmer';
import { useTranslation } from 'react-i18next';
import { getServiceList } from '../../../services/api/getApi/getServicesList';

export const SearchServiceScreen = ({
  navigation,
}: rootNavigationProps<routeName.SearchServices>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [searchText, setText] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);
  const debouncedSearchText = useDebouncedValue(searchText);
  const [services, setServices] = useState<IExpertiesModal[]>([]);

  const loadData = async () => {
    try {
      setLoader(true);
      const data: ApiExpertiesModal[] = await getServiceList(
        debouncedSearchText,
      );
      const transformedData = data.map(r => transformExpertiesModal(r));
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

  const renderItem = ({ item }: any) => {
    return <ServiceCard onPress={navigateToConsultantList} data={item} />;
  };

  const emptyCard = () => {
    return <ListEmptyCard text={`${t('noServiceFound', { searchText })}`} />;
  };

  useEffect(() => {
    loadData().then(() => setLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  return (
    <>
      <StatusBar />
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.searchHeader}>
          <SearchBorderInputComponent
            obj={{
              placeholder: t('searchHere'),
              setValue: setText,
              value: searchText,
              icon: appIcons.ic_backIcon,
              onIconPress: goBack,
            }}
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
