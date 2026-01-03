import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabHeader } from '../../../components/Headers/BottomTabHeader';
import { BookingCard } from '../../../components/Cards/BookingCard';
import { RootNavigationProps } from '../../../models/navigationModel';
import { routeName } from '../../../config/constants/routes';
import { getAPIData } from '../../../services/api/common/getCommonApi';
import { useCallback, useEffect, useState } from 'react';
import { ListEmptyCard } from '../../../components/Cards/ListEmptyCard';
import { appImages } from '../../../config/images/imagePath';
import { height } from '../../../config/constants/variables';
import normalize from '../../../utils/normalize/normalize';
import { appIcons } from '../../../config/icons/iconPath';
import { RegularTextComponent } from '../../../components/Text/RegularText';
import { ListShimmer } from '../../../components/Skeleton/ListShimmer';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import {
  TBookingHistoryModel,
  transformBookingHistoryModel,
} from '../../../models/formattedAPI/tBookings';
import { ApiBookingHistoryModel } from '../../../models/api/bookings';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import firestore from '@react-native-firebase/firestore';
import { ApiResponse, ListPayload } from '../../../models/apiModel';

export const HistoryScreen = ({
  navigation,
}: RootNavigationProps<routeName.History>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [history, setHistory] = useState<TBookingHistoryModel[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const userIdRead = useSelector((state: RootState) => state.user.userData.id);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedMoreId, setSelectedMoreId] = useState<number | null>(null);

  const navigateToDetails = (id: string) => {
    navigation.navigate(routeName.BookingSummary, { id });
  };
  const navigateToNotification = () => {
    navigation.navigate(routeName.Notification);
  };

  const navigateToChat = async ({
    id,
    image,
    name,
  }: {
    id: string;
    image: string | number | { uri: string } | undefined;
    name: string;
  }) => {
    const data = await firestore()
      .collection('chats')
      .where('users', 'array-contains', userIdRead)
      .get()
      .then(snapshot => {
        const data1 = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        return data1;
      });
    // @ts-ignore
    const data1 = data.filter(val => val.users.includes(id));
    if (data1.length > 0) {
      navigation.navigate(routeName.OneOnOneChat, {
        consultantImage: image,
        consultantName: name,
        userID: userIdRead,
        chatID: data1[0].id,
      });
    } else {
      firestore()
        .collection('chats')
        .doc(`${userIdRead}_${id}`)
        .set({
          users: [userIdRead, id],
          unreadCount: {
            id: 0,
            userIdRead: 0,
          },
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      navigation.navigate(routeName.OneOnOneChat, {
        consultantImage: image,
        consultantName: name,
        userID: userIdRead,
        chatID: `${userIdRead}_${id}`,
      });
    }
  };

  const loadData = async (pageToLoad = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        pageToLoad = 1;
      } else {
        setLoader(true);
      }
      const response = await getAPIData<
        ApiResponse<ListPayload<ApiBookingHistoryModel>>
      >(endPoints.booking, pageToLoad);
      if (!response) return;
      const data: ApiBookingHistoryModel[] = response.payload.data;
      const transformedData = data.map(r => transformBookingHistoryModel(r));
      setHistory(transformedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const renderItem = useCallback(({ item, index }: any) => {
    return (
      <BookingCard
        props={item}
        onMessage={navigateToChat}
        onMorePress={(x, y) => onMorePress(index, x, y)}
        navigateToDetails={navigateToDetails}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMorePress = (id: number, x: number, y: number) => {
    const screenHeight = height - normalize(50);
    const menuHeight = normalize(150);
    const margin = normalize(10);

    const fitsBelow = y + menuHeight + margin < screenHeight;
    let finalTop = fitsBelow
      ? y + (Platform.OS === 'android' ? normalize(20) : normalize(-20))
      : y -
        menuHeight -
        margin -
        (Platform.OS === 'ios' ? normalize(10) : normalize(-20));

    if (selectedMoreId === id && isModalVisible) {
      setModalVisible(false);
      setSelectedMoreId(null);
      return;
    }

    setSelectedMoreId(id);
    setModalPosition({ top: finalTop, left: x });
    setModalVisible(true);
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
    loadData();
  }, []);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        {isModalVisible && (
          <TouchableOpacity
            activeOpacity={1}
            style={staticStyle.modalOverlay}
            onPress={() => {
              setModalVisible(false);
              setSelectedMoreId(null);
            }}
          >
            <View
              style={StyleSheet.flatten([
                staticStyle.modalWrapper,
                {
                  top: modalPosition.top + normalize(25),
                  left: modalPosition.left - normalize(130),
                },
              ])}
            >
              <TouchableOpacity
                activeOpacity={1}
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
                      styles.primaryText,
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
                    text={t('markAsDone')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.optionText,
                      styles.primaryText,
                    ])}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
              onEndReachedThreshold={0.5}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
