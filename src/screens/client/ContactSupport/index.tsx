import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import {
  createStyles,
  staticStyle,
} from '@screens/client/ContactSupport/styles';
import { Theme } from '@config/themes/themes';
import { routeName } from '@config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAPIData } from '@services/api/common/getCommonApi';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { sendChat } from '@services/api/chat/sendBotChat';
import { ApiChatBotChatModel } from '@models/api/chatbot';
import {
  TChatBotChatModel,
  transformChatBotChatModel,
} from '@models/formattedAPI/tChatbot';
import { RootNavigationProps } from '@models/navigationModel';
import { ApiResponse, ListPayload } from '@models/apiModel';
import { Utils } from '@utils/index';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const ContactSupportScreen = ({
  navigation,
}: RootNavigationProps<routeName.ContactSupport>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const flatListRef = useRef<FlatList>(null);
  const [text, setText] = useState<string>('');
  const [chat, setChat] = useState<TChatBotChatModel[]>([]);
  const pageRef = useRef<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);

  const goBack = () => {
    navigation.goBack();
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPaginationLoading(true);
      pageRef.current += 1;
    }
  };

  const loadChat = async (pageToLoad = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        pageToLoad = 1;
      }
      const response = await getAPIData<
        ApiResponse<ListPayload<ApiChatBotChatModel>>
      >(Config.endPoints.chatHistory, pageToLoad);
      if (!response) return;
      const data: ApiChatBotChatModel[] = response.payload.data;
      const transformedData = data
        ? data?.map(r => transformChatBotChatModel(r))
        : [];
      setHasMore(
        response.payload.meta.current_page < response.payload.meta.last_page,
      );
      pageRef.current = response.payload.meta.current_page;
      setChat(transformedData);
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Utils.showErrorToast({
        title: t('somethingWentWrong'),
        subtitle: t('pleaseTryAgain'),
      });
    }
  };

  const sendChatToBot = async () => {
    try {
      const chat1 = text;
      setText('');
      const chatData: ApiChatBotChatModel = await sendChat(chat1 ?? '');
      const transformedChat = transformChatBotChatModel({
        request: chatData.request,
        response: chatData.response,
        session_id: chatData.response,
        created_at: new Date().toString(),
      });
      setChat(prev => [transformedChat, ...prev]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Utils.showErrorToast({
        title: t('somethingWentWrong'),
        subtitle: t('pleaseTryAgain'),
      });
    }
  };

  const renderItem: ListRenderItem<TChatBotChatModel> = useCallback(
    ({ item }) => {
      return <Components.Cards.MessageCard data={item} />;
    },
    [],
  );

  const emptyCard = () => {
    return (
      <Components.Cards.ChatListEmptyCard
        text={t('noChatsFound')}
        image={Config.appIcons.ic_noChatFound}
        tintColor={theme.colors.textPrimary}
      />
    );
  };

  useEffect(() => {
    loadChat();
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
                source={Config.appIcons.ic_backIcon}
                style={staticStyle.backIcon}
                tintColor={theme.colors.textPrimary}
              />
            </TouchableOpacity>
            <View style={staticStyle.centralHeader}>
              <FastImage
                source={Config.appImages.img_contactSupport}
                style={staticStyle.profile}
              />
              <Components.TextComponent
                family={'medium'}
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
            onEndReached={handleLoadMore}
            renderItem={renderItem}
            ListFooterComponent={
              paginationLoading ? <ActivityIndicator size={'large'} /> : null
            }
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
            <TextInput
              placeholder={t('sendMessage')}
              multiline
              style={StyleSheet.flatten([staticStyle.input, styles.title])}
              autoCapitalize="none"
              value={text ?? ''}
              onChangeText={setText}
              placeholderTextColor={
                Utils.isDarkMode(theme) ? Config.appColors.app_FFFFFF : Config.appColors.app_212121
              }
            />
            <TouchableOpacity
              onPress={sendChatToBot}
              activeOpacity={0.7}
              style={StyleSheet.flatten([
                staticStyle.bottomButton,
                styles.sendButton,
              ])}
            >
              <FastImage
                source={Config.appIcons.ic_sendArrow}
                style={staticStyle.sendIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
