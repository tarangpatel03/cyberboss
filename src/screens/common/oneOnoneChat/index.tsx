import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { appIcons } from '../../../config/icons/iconPath';
import { chatData } from '../../../demoData/chatData';
import { appImages } from '../../../config/images/imagePath';
import { routeName } from '../../../config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rootNavigationProps } from '../../../models/navigationModal';
import { BorderInputComponent } from '../../../components/Input/BorderInput';
import { MediumTextComponent } from '../../../components/Text/MediumTextComponent';
import { OneOnOneCard } from '../../../components/Cards/OneOnOneChat';
import { ListEmptyCard } from '../../../components/Cards/ListEmptyCard';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';

export const OneOnOneChatScreen = ({
  navigation,
}: rootNavigationProps<routeName.OneOnOneChat>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [text, setText] = useState<string | null>('');

  const goBack = () => {
    navigation.goBack();
  };

  const emptyCard = () => {
    return (
      <ListEmptyCard text={t('noChatHistory')} image={appImages.img_noChat} />
    );
  };

  const renderItem = ({ item }: any) => {
    return (
      <OneOnOneCard
        message={item.message}
        time={item.time}
        type={item.sender}
        image={item.image}
      />
    );
  };

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
                tintColor={theme.colors.textPrimary}
                source={appIcons.ic_backIcon}
                style={staticStyle.backIcon}
              />
            </TouchableOpacity>
            <View style={staticStyle.centralHeader}>
              <FastImage
                source={appImages.img_test1}
                style={staticStyle.profile}
              />
              <MediumTextComponent
                text="Daisy Bell"
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
            data={chatData}
            initialNumToRender={10}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.time}
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
