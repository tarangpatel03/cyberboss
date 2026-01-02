import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { rootNavigationProps } from '../../../models/navigationModel';
import { routeName } from '../../../config/constants/routes';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabHeader } from '../../../components/Headers/BottomTabHeader';
import { useCallback, useEffect, useState } from 'react';
import { SearchBorderInputComponent } from '../../../components/Input/SearchInput';
import { ListShimmer } from '../../../components/Skeleton/ListShimmer';
import { rootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import firestore from '@react-native-firebase/firestore';
import { ChatListItem } from '../../../components/Cards/ChatListItem';
import { ListEmptyCard } from '../../../components/Cards/ListEmptyCard';
import { appImages } from '../../../config/images/imagePath';

export const ChatScreen = ({
  navigation,
}: rootNavigationProps<routeName.Chat>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [searchText, setSearchText] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);
  const isLoggedIn = useSelector((state: rootState) => state.user.token);
  const [chats, setChats] = useState<any[]>([]);

  const navigateToNotification = () => {
    navigation.navigate(routeName.Notification);
  };

  const uid = useSelector((state: rootState) => state.user.userData.id);

  const getUserChats = (userId: string) => {
    try {
      const subscriber = firestore()
        .collection('chats')
        .where('users', 'array-contains', userId)
        .onSnapshot(
          snapshot => {
            const data2 = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            const filteredData = data2.filter(x => 'lastMessageTimestamp' in x);
            console.log('Chats Data: ', filteredData);
            setChats(
              filteredData.sort(
                // @ts-ignore
                (a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp,
              ),
            );
          },
          error => {
            console.log('Firestore listener error:', error);
          },
        );
      return subscriber;
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const navigateToChats = ({
    image,
    name,
    chatId,
  }: {
    image: number | string | { uri: string } | undefined;
    name: string;
    chatId: string;
  }) => {
    navigation.navigate(routeName.OneOnOneChat, {
      chatID: chatId,
      consultantName: name,
      consultantImage: image,
      userID: uid,
    });
  };

  const renderChats = useCallback(
    ({ item }: any) => {
      return <ChatListItem data={item} uid={uid} onPress={navigateToChats} />;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uid],
  );

  const navigateToLogIn = () => {
    navigation.navigate(routeName.LogIn);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigateToLogIn();
    }

    const unsubscribe = getUserChats(uid);
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.header}>
          <BottomTabHeader name={t('chat')} onPress={navigateToNotification} />
          <SearchBorderInputComponent
            placeholder={t('searchClients')}
            setValue={setSearchText}
            value={searchText}
          />
        </View>
        {loader && (
          <ListShimmer containerStyle={staticStyle.shimmerContainer} />
        )}
        {!loader && (
          <View style={staticStyle.list}>
            <FlatList
              data={chats}
              directionalLockEnabled={true}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={renderChats}
              contentContainerStyle={staticStyle.listItems}
              ListEmptyComponent={
                <ListEmptyCard
                  text={t('noChatHistory')}
                  image={appImages.img_noChat}
                />
              }
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
