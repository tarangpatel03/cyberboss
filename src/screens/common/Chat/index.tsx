import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { createStyles, staticStyle } from '@screens/common/Chat/styles';
import { RootNavigationProps } from '@models/navigationModel';
import { routeName } from '@config/constants/routes';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import firestore from '@react-native-firebase/firestore';
import { Config } from '@config/index';
import { Components } from '@components/index';
import { Utils } from '@utils/index';

export const ChatScreen = ({
  navigation,
}: RootNavigationProps<routeName.Chat>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [searchText, setSearchText] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);
  const isLoggedIn = useSelector((state: RootState) => state.user.token);
  const [chats, setChats] = useState<any[]>([]);
  const uid = useSelector((state: RootState) => state.user.userData.id);

  const navigateToNotification = () => {
    navigation.navigate(routeName.Notification);
  };

  const getUserChats = (userId: string) => {
    try {
      return firestore()
        .collection('chats')
        .where('users', 'array-contains', userId)
        .onSnapshot(
          snapshot => {
            const data2 = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            const filteredData = data2.filter(x => 'lastMessageTimestamp' in x);
            setChats(
              filteredData.sort(
                // @ts-ignore
                (a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp,
              ),
            );
          },
          error => {
            Utils.showErrorToast({ title: error.message });
          },
        );
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
    } finally {
      setLoader(false);
    }
  };

  const navigateToChats = ({
    image,
    chatId,
  }: {
    image: number | string | { uri: string } | undefined;
    chatId: string;
  }) => {
    navigation.navigate(routeName.OneOnOneChat, {
      chatID: chatId,
      consultantName: chatId,
      consultantImage: image,
      userID: uid,
    });
  };

  const renderChats = useCallback(
    ({ item }: any) => {
      return (
        <Components.Cards.ChatListItem
          data={item}
          uid={uid}
          onPress={navigateToChats}
        />
      );
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
          <Components.Headers.BottomTabHeader
            name={t('chat')}
            onPress={navigateToNotification}
          />
          <Components.Inputs.SearchBorderInputComponent
            placeholder={t('searchClients')}
            setValue={setSearchText}
            value={searchText}
          />
        </View>
        {loader && (
          <Components.Skeleton.ListShimmer
            containerStyle={staticStyle.shimmerContainer}
          />
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
                <Components.Cards.ListEmptyCard
                  text={t('noChatHistory')}
                  image={Config.appImages.img_noChat}
                />
              }
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
