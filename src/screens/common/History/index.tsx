import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { isDarkMode } from '../../../utils/theme/darkMode';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabHeader } from '../../../components/Headers/BottomTabHeader';
import { BookingCard } from '../../../components/Cards/BookingCard';
import { BookingHistoryDataProp } from '../../../demoData/bookingHistory';
import { rootNavigationProps } from '../../../models/navigationModal';
import { routeName } from '../../../config/constants/routes';
import { getAPIData } from '../../../services/api/getApi/getAPI';
import { useEffect, useRef, useState } from 'react';
import { ListEmptyCard } from '../../../components/Cards/ListEmptyCard';
import { appImages } from '../../../config/images/imagePath';
import { height } from '../../../config/constants/variables';
import normalize from '../../../utils/normalize/normalize';
import { appIcons } from '../../../config/icons/iconPath';
import { RegularTextComponent } from '../../../components/Text/RegularTextComponent';
import { ListShimmer } from '../../../components/Skeleton/ListShimmer';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

export const HistoryScreen = ({
  navigation,
}: rootNavigationProps<routeName.History>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [history, setHistory] = useState();
  const [loader, setLoader] = useState<boolean>(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedMoreId, setSelectedMoreId] = useState<number | null>(null);
  const pageRef = useRef<number>(1);
  const hasMoreRef = useRef<boolean>(false);
  const paginationLoadingRef = useRef<boolean>(false);

  const navigateToDetails = (item: BookingHistoryDataProp) => {
    navigation.navigate(routeName.BookingSummary, item);
  };
  const navigateToNotification = () => {
    navigation.navigate(routeName.Notification);
  };

  const loadData = async (pageToLoad = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        pageToLoad = 1;
      } else {
        setLoader(true);
      }
      const payload = await getAPIData(endPoints.booking, pageToLoad);
      const data = payload.data;
      hasMoreRef.current = payload.meta.current_page < payload.meta.last_page;
      pageRef.current = payload.meta.current_page;
      setHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = () => {
    if (hasMoreRef.current && !loader) {
      paginationLoadingRef.current = true;
      loadData(pageRef.current + 1);
    }
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <BookingCard
        obj={item}
        onMorePress={(x, y) => onMorePress(index, x, y)}
        navigateToDetails={navigateToDetails}
      />
    );
  };

  const onMorePress = (id: number, x: number, y: number) => {
    const screenHeight = height;
    const menuHeight = normalize(150);

    let finalTop = y;

    if (y + menuHeight > screenHeight) {
      finalTop = y - menuHeight + normalize(10);
    }

    if (selectedMoreId === id) {
      setModalVisible(prev => !prev);
    } else {
      setSelectedMoreId(id);
      setModalPosition({ top: finalTop, left: x });
      setModalVisible(true);
    }
  };
  const emptyCard = () => {
    return (
      <ListEmptyCard
        tintColor={theme.colors.textPrimary}
        text={t('noHistory')}
        image={appImages.img_noHistory}
      />
    );
  };

  useEffect(() => {
    loadData().then(() => setLoader(false));
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        {isModalVisible && (
          <View style={staticStyle.modalOverlay} pointerEvents="box-none">
            <View
              style={StyleSheet.flatten([
                staticStyle.modalWrapper,
                {
                  top: modalPosition.top + normalize(25),
                  left: modalPosition.left - normalize(130),
                },
              ])}
            >
              <View
                style={StyleSheet.flatten([
                  staticStyle.modalContent,
                  styles.bgSecondary,
                ])}
              >
                <TouchableOpacity style={staticStyle.option}>
                  <FastImage
                    source={appIcons.ic_flag}
                    tintColor={theme.colors.textPrimary}
                    style={staticStyle.icon}
                  />
                  <RegularTextComponent
                    text={t('report')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.optionText,
                      styles.primarytext,
                    ])}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={staticStyle.option}>
                  <FastImage
                    tintColor={theme.colors.textPrimary}
                    source={appIcons.ic_done}
                    style={staticStyle.icon}
                  />
                  <RegularTextComponent
                    text={t('markasDone')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.optionText,
                      styles.primarytext,
                    ])}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <View style={StyleSheet.flatten([staticStyle.header])}>
          <BottomTabHeader
            name={t('history')}
            onPress={navigateToNotification}
          />
        </View>
        {loader && (
          <ListShimmer containerStyle={staticStyle.shimmerContainer} />
        )}
        {!loader && (
          <View style={staticStyle.list}>
            <FlatList
              data={history}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={staticStyle.listItems}
              ListEmptyComponent={emptyCard}
              initialNumToRender={5}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
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
