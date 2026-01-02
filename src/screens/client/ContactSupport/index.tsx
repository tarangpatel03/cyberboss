import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { appIcons } from '../../../config/icons/iconPath';
import { appImages } from '../../../config/images/imagePath';
import { routeName } from '../../../config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCard } from '../../../components/Cards/MessageCard';
import { MediumTextComponent } from '../../../components/Text/MediumTextComponent';
import { getAPIData } from '../../../services/api/common/getCommonApi';
import { showErrorToast } from '../../../utils/toast/toast';
import FastImage from 'react-native-fast-image';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { useTranslation } from 'react-i18next';
import { sendChat } from '../../../services/api/chat/sendBotChat';
import { apiChatBotChatModel } from '../../../models/api/chatbot';
import {
  tChatBotChatModel,
  transformChatBotChatModel,
} from '../../../models/formattedAPI/tChatbot';
import { CustomInputComponent } from '../../../components/Input/EmailAndPasswordInput';
import { ListEmptyCard } from '../../../components/Cards/ListEmptyCard';
import { rootNavigationProps } from '../../../models/navigationModel';
import { ApiResponse, ListPayload } from '../../../models/apiModel';

export const ContactSupportScreen = ({
  navigation,
}: rootNavigationProps<routeName.ContactSupport>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const flatListRef = useRef<FlatList>(null);
  const [text, setText] = useState<string>('');
  const [chat, setChat] = useState<tChatBotChatModel[]>([]);
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
        ApiResponse<ListPayload<apiChatBotChatModel>>
      >(endPoints.chatHistory, pageToLoad);
      if (!response) return;
      const data: apiChatBotChatModel[] = response.payload.data;
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
      showErrorToast({
        title: t('somethingWentWrong'),
        subtitle: t('pleaseTryAgain'),
      });
    }
  };

  const sendChatToBot = async () => {
    try {
      const chatData: apiChatBotChatModel = await sendChat(text ?? '');
      const transformedChat = transformChatBotChatModel(chatData);
      setChat(prev => [...prev, transformedChat]);
      setText('');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showErrorToast({
        title: t('somethingWentWrong'),
        subtitle: t('pleaseTryAgain'),
      });
    }
  };

  const renderItem: ListRenderItem<tChatBotChatModel> = useCallback(
    ({ item }) => {
      return <MessageCard data={item} />;
    },
    [],
  );

  const emptyCard = () => {
    return (
      <ListEmptyCard
        isOneOnOneChat={true}
        text={t('noChatsFound')}
        image={appIcons.ic_noChatFound}
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
            <CustomInputComponent
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
