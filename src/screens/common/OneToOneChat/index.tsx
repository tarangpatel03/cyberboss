import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from './styles';
import { Theme } from '@config/themes/themes';
import { appIcons } from '@config/icons/iconPath';
import { appImages } from '@config/images/imagePath';
import { routeName } from '@config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigationProps } from '@models/navigationModel';
import { MediumTextComponent } from '@components/Text/MediumText';
import { OneToOneChatCard } from '@components/Cards/OneToOneChatCard';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import firestore from '@react-native-firebase/firestore';
import { ChatListEmptyCard } from '@components/Cards/ChatListEmptyCard';
import { isDarkMode } from '@utils/theme/darkMode';
import { appColors } from '@config/colors/colors';
import { RegularTextComponent } from '@components/Text/RegularText';
import { getProfilePicture } from '@utils/extractURI/extractImageURI';

export const OneToOneChatScreen = ({
  navigation,
  route,
}: RootNavigationProps<routeName.OneOnOneChat>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const data = route.params;
  const styles = createStyles(theme);
  const [imageError, setImageError] = useState<boolean>(false);
  const [text, setText] = useState<string | null>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [fields, setFields] = useState<any>();

  const emptyCard = () => {
    return (
      <ChatListEmptyCard
        text={t('noChatsFound')}
        image={appIcons.ic_noChatFound}
        tintColor={theme.colors.textPrimary}
      />
    );
  };

  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <OneToOneChatCard
          uid={data.userID}
          senderId={item.senderId}
          message={item.message}
          timestamp={item.timestamp}
        />
      );
    },
    [data.userID],
  );

  const getChats = () => {
    try {
      const unsubscribe = firestore()
        .collection('chats')
        .doc(data.chatID)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(
          snapshot => {
            const message = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMessages(message);
          },
          error => {
            console.log(error);
          },
        );
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  const getChatFields = () => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(data.chatID)
      .onSnapshot(
        snapshot => {
          const fieldsData = {
            ...snapshot.data(),
          };
          setFields(fieldsData);
        },
        error => {
          console.log(error);
        },
      );
    return unsubscribe;
  };

  const sendChat = async () => {
    try {
      const messageText = text;
      setText('');
      await firestore()
        .collection('chats')
        .doc(data.chatID)
        .collection('messages')
        .add({
          imagePath: '',
          message: messageText,
          senderId: data.userID,
          timestamp: firestore.FieldValue.serverTimestamp(),
          type: 'text',
        });
      await firestore()
        .collection('chats')
        .doc(data.chatID)
        .update({
          lastMessage: messageText,
          lastMessageSender: data.userID,
          [`unreadCount.${fields.users.filter(
            (v: string) => v !== data.userID,
          )}`]: firestore.FieldValue.increment(1),
          lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateOnOnline = async () => {
    try {
      await firestore()
        .collection('chats')
        .doc(data.chatID)
        .update({
          [`lastSeenTimestamp.${data.userID}`]:
            firestore.FieldValue.serverTimestamp(),
          [`onlineStatus.${data.userID}`]: true,
          [`unreadCount.${data.userID}`]: 0,
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateOnOffline = async () => {
    try {
      await firestore()
        .collection('chats')
        .doc(data.chatID)
        .update({
          [`lastSeenTimestamp.${data.userID}`]:
            firestore.FieldValue.serverTimestamp(),
          [`onlineStatus.${data.userID}`]: false,
        });
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = async () => {
    await updateOnOffline();
    navigation.goBack();
  };

  useEffect(() => {
    const unsubscribeField = getChatFields();
    updateOnOnline();
    const unsubscribe = getChats();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      if (unsubscribeField) {
        unsubscribeField();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View
          style={StyleSheet.flatten([staticStyle.header, styles.container])}
        >
          <View style={staticStyle.subheader}>
            <TouchableOpacity
              style={staticStyle.buttons}
              activeOpacity={0.7}
              onPress={goBack}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                tintColor={theme.colors.textPrimary}
                source={appIcons.ic_backIcon}
                style={staticStyle.backIcon}
              />
            </TouchableOpacity>
            <View style={staticStyle.centralHeader}>
              <FastImage
                onError={() => setImageError(true)}
                source={
                  imageError
                    ? appImages.img_defaultProfile
                    : getProfilePicture(data.consultantImage)
                }
                style={staticStyle.profile}
              />
              <View>
                <MediumTextComponent
                  text={data.consultantName}
                  textStyle={StyleSheet.flatten([
                    staticStyle.title,
                    styles.title,
                  ])}
                />
                {fields?.onlineStatus?.[
                  fields.users.filter((v: string) => v !== data.userID)
                ] && (
                  <RegularTextComponent
                    text="online"
                    textStyle={StyleSheet.flatten([styles.title])}
                  />
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity style={staticStyle.buttons} activeOpacity={0.7}>
            <FastImage
              source={appIcons.ic_more}
              style={staticStyle.moreIcon}
              tintColor={theme.colors.textPrimary}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
        <View
          style={StyleSheet.flatten([
            staticStyle.listContainer,
            styles.listContainer,
          ])}
        >
          <FlatList
            data={messages}
            inverted
            initialNumToRender={10}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={staticStyle.list}
            ListEmptyComponent={emptyCard}
          />
        </View>
        <View
          style={StyleSheet.flatten([
            staticStyle.bottomContainer,
            styles.container,
          ])}
        >
          <View
            style={StyleSheet.flatten([staticStyle.inputBar, styles.inputBar])}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={staticStyle.bottomButton}
            >
              <FastImage
                source={appIcons.ic_addFile}
                style={staticStyle.buttons}
              />
            </TouchableOpacity>
            <TextInput
              placeholder={t('sendMessage')}
              multiline
              style={StyleSheet.flatten([staticStyle.input, styles.input])}
              autoCapitalize="none"
              value={text ?? ''}
              onChangeText={setText}
              placeholderTextColor={
                isDarkMode(theme) ? appColors.app_FFFFFF : appColors.app_212121
              }
            />
            <TouchableOpacity
              onPress={sendChat}
              activeOpacity={0.7}
              style={StyleSheet.flatten([
                staticStyle.bottomButton,
                styles.sendButton,
              ])}
            >
              <FastImage
                source={appIcons.ic_sendArrow}
                style={staticStyle.sendIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
