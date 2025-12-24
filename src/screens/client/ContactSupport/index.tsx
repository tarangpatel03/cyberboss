import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { appIcons } from '../../../config/icons/iconPath';
import { appImages } from '../../../config/images/imagePath';
import { isDarkMode } from '../../../utils/theme/darkMode';
import { routeName } from '../../../config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCard } from '../../../components/Cards/MessageCard';
import { rootNavigationProps } from '../../../models/navigationModal';
import { BorderInputComponent } from '../../../components/Input/BorderInput';
import { MediumTextComponent } from '../../../components/Text/MediumTextComponent';
import { getAPIData } from '../../../services/api/getApi/getAPI';
import { showErrorToast } from '../../../utils/toast/toast';
import FastImage from 'react-native-fast-image';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { useTranslation } from 'react-i18next';
import { sendChat } from '../../../services/api/postApi/sendBotChat';
import { ApiChatBotChatModel } from '../../../models/api/chatbot';
import {
  IChatBotChatModel,
  transformChatBotChatModel,
} from '../../../models/formattedAPI/tChatbot';

export const ContactSupportScreen = ({
  navigation,
}: rootNavigationProps<routeName.ContactSupport>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const flatListRef = useRef<FlatList>(null);
  const [text, setText] = useState<string | null>('');
  const [chat, setChat] = useState<IChatBotChatModel[]>([]);

  const goBack = () => {
    navigation.goBack();
  };

  const loadChat = async () => {
    try {
      const data: ApiChatBotChatModel[] = await getAPIData(
        endPoints.chatHistory,
      ).then(r => r.data);
      const transformedData = data
        ? data?.map(r => transformChatBotChatModel(r))
        : [];
      setChat(transformedData);
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showErrorToast({
        title: t('somethingWentWrong'),
        subtitle: t('pleaseTryAgain'),
      });
    }
  };

  const sendChatToBot = () => {
    try {
      sendChat(text ?? '').then(() => {
        loadChat();
      });
      setText('');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showErrorToast({
        title: t('somethingWentWrong'),
        subtitle: t('pleaseTryAgain'),
      });
    }
  };

  const renderItem = ({ item }: any) => {
    return <MessageCard data={item} />;
  };

  useEffect(() => {
    loadChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
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
                source={appIcons.ic_backIcon}
                style={staticStyle.backIcon}
                tintColor={theme.colors.textPrimary}
              />
            </TouchableOpacity>
            <View style={staticStyle.centralHeader}>
              <FastImage
                source={appImages.img_contactSupport}
                style={staticStyle.profile}
              />
              <MediumTextComponent
                text={t('kyoraBot')}
                textStyle={StyleSheet.flatten([
                  staticStyle.title,
                  styles.title,
                ])}
              />
            </View>
          </View>
        </View>
        <View
          style={StyleSheet.flatten([
            staticStyle.listContainer,
            styles.listContainer,
          ])}
        >
          <FlatList
            ref={flatListRef}
            data={chat}
            inverted
            initialNumToRender={10}
            keyExtractor={item => item.createdAt}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={staticStyle.list}
            ListEmptyComponent={null}
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
            <BorderInputComponent
              placeholder={t('sendMessage')}
              showPlaceholderOnFocus={false}
              setValue={setText}
              value={text}
              borderStyle={staticStyle.removeBorder}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={sendChatToBot}
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
