import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { rootNavigationProps } from '../../../models/navigationModal';
import { routeName } from '../../../config/constants/routes';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabHeader } from '../../../components/Headers/BottomTabHeader';
import { useEffect, useState } from 'react';
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

  const uid = useSelector(
    (state: rootState) => state.user.userData.firebaseUid,
  );
  // const testUID = '9f8f1a03-948d-4e66-89c0-656b0a5ae0c1';
  // const testUID = '9f9fa92c-2a4e-4ad2-b4b1-a72e2132f1a2';

  const getUserChats = async (userId: string) => {
    try {
      const data1 = await firestore()
        .collection('chats')
        .where('users', 'array-contains', userId)
        .get()
        .then(snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          return data;
        });
      setChats(data1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const navigateToLogIn = () => {
    navigation.navigate(routeName.LogIn);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigateToLogIn();
    }
    getUserChats(uid);
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
              renderItem={({ item }) => (
                <ChatListItem data={item} uid={uid} onPress={() => {}} />
              )}
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
