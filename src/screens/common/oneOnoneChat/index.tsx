import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { appIcons } from '../../../config/icons/iconPath';
import { appImages } from '../../../config/images/imagePath';
import { routeName } from '../../../config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rootNavigationProps } from '../../../models/navigationModal';
import { BorderInputComponent } from '../../../components/Input/BorderInput';
import { MediumTextComponent } from '../../../components/Text/MediumTextComponent';
import { OneOnOneCard } from '../../../components/Cards/OneOnOneChat';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import firestore from '@react-native-firebase/firestore';
import { ChatListEmptyCard } from '../../../components/Cards/ChatListEmptyCard';

export const OneOnOneChatScreen = ({
  navigation,
  route,
}: rootNavigationProps<routeName.OneOnOneChat>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const data = route.params;
  const styles = createStyles(theme);
  const [text, setText] = useState<string | null>('');
  const [messages, setMessages] = useState<any[]>([]);

  const goBack = () => {
    navigation.goBack();
  };

  const emptyCard = () => {
    return (
      <ChatListEmptyCard
        text={t('noChatsFound')}
        image={appIcons.ic_noChatFound}
        tintColor={theme.colors.textPrimary}
      />
    );
  };

  const renderItem = ({ item }: any) => {
    return (
      <OneOnOneCard
        uid={data.userID}
        senderId={item.senderId}
        message={item.message}
        timestamp={item.timestamp}
      />
    );
  };

  const getChats = async () => {
    try {
      const data1 = await firestore()
        .collection('chats')
        .doc(`${data.users[1]}_${data.users[0]}`)
        .collection('messages')
        .get()
        .then(snapshot => {
          const message = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          return message;
        });
      setMessages(data1);
      console.log('Messages: ', messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChats();
    console.log('Consultant Data: ', data);
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
                source={appImages.img_defaultProfile}
                style={staticStyle.profile}
              />
              <MediumTextComponent
                text={data.consultantName}
                textStyle={StyleSheet.flatten([
                  staticStyle.title,
                  styles.title,
                ])}
              />
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
            <TouchableOpacity activeOpacity={0.7} style={staticStyle.buttons}>
              <FastImage
                source={appIcons.ic_addFile}
                style={staticStyle.buttons}
              />
            </TouchableOpacity>
            <BorderInputComponent
              placeholder={t('sendMessage')}
              showPlaceholderOnFocus={false}
              setValue={setText}
              value={text}
              borderStyle={staticStyle.removeBorder}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={StyleSheet.flatten([
                staticStyle.buttons,
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
