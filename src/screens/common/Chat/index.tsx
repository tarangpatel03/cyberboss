import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { rootNavigationProps } from '../../../models/navigationModal';
import { routeName } from '../../../config/constants/routes';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabHeader } from '../../../components/Headers/BottomTabHeader';
import { useEffect, useState } from 'react';
import { SearchBorderInputComponent } from '../../../components/Input/SearchInput';
import { ListEmptyCard } from '../../../components/Cards/ListEmptyCard';
import { appImages } from '../../../config/images/imagePath';
import { ListShimmer } from '../../../components/Skeleton/ListShimmer';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const ChatScreen = ({
  navigation,
}: rootNavigationProps<routeName.Chat>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [searchText, setSearchText] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);
  const isLoggedIn = useSelector((state: RootState) => state.user.token);

  const navigateToNotification = () => {
    navigation.navigate(routeName.Notification);
  };

  const navigateToLogIn = () => {
    navigation.navigate(routeName.LogIn);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigateToLogIn();
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
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
            <ListEmptyCard
              text={t('noChatHistory')}
              image={appImages.img_noChat}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
