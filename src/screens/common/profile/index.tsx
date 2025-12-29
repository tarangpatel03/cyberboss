import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { isDarkMode } from '../../../utils/theme/darkMode';
import { routeName } from '../../../config/constants/routes';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { rootNavigationProps } from '../../../models/navigationModal';
import { BottomTabHeader } from '../../../components/Headers/BottomTabHeader';
import { RegularTextComponent } from '../../../components/Text/RegularTextComponent';
import { ThemeModal } from '../../../components/Modal/ThemeModal';
import { useEffect, useState } from 'react';
import { LogOutModal } from '../../../components/Modal/LogOutModal';
import { setUser } from '../../../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useTranslation } from 'react-i18next';
import { ProfileCard } from '../../../components/Cards/ProfileCard';
import { ProfileOptionsRow } from '../../../components/Cards/ProfileOptionsRow';
import { GeneralSettings } from '../../../components/GeneralSettings';
import { AuthOptions } from '../../../components/AuthOptions';
import { logOut } from '../../../services/auth/firebase/auth';

export const ProfileScreen = ({
  navigation,
}: rootNavigationProps<routeName.Profile>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { userData, token: isLoggedIn } = useSelector(
    (state: RootState) => state.user,
  );
  const [isThemeModalVisible, setThemeModalVisible] = useState<boolean>(false);
  const [logOutVisible, setLogOutVisible] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);

  const navigateToEditProfile = () => {
    navigation.navigate(routeName.EditProfile);
  };

  const navigateToChangePassword = () => {
    navigation.navigate(routeName.ChangePassword);
  };
  const navigateToNotification = () => {
    navigation.navigate(routeName.Notification);
  };
  const navigateToContactSupport = () => {
    navigation.navigate(routeName.ContactSupport);
  };
  const handleSignout = async () => {
    try {
      await logOut();
      dispatch(setUser(''));
      console.log('logged out');
      navigation.replace(routeName.BottomTab);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToSignUp = async () => {
    await logOut();
    dispatch(setUser(''));
    navigation.replace(routeName.SignUp);
  };

  const getPicture = () => {
    if (typeof userData.profilePicture === 'string') {
      return { uri: userData.profilePicture };
    } else {
      return userData.profilePicture;
    }
  };

  useEffect(() => {
    !isLoggedIn && navigation.navigate(routeName.LogIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
      <LogOutModal
        title={t('askDeleteAccount')}
        isModal={deleteVisible}
        message={t('deleteConfirm')}
        option={t('delete')}
        setIsModal={setDeleteVisible}
        onConfirm={navigateToSignUp}
      />
      <LogOutModal
        title={t('askLogout')}
        message={t('logoutConfirm')}
        option={t('logout')}
        isModal={logOutVisible}
        setIsModal={setLogOutVisible}
        onConfirm={handleSignout}
      />
      <ThemeModal
        isVisible={isThemeModalVisible}
        onclose={() => setThemeModalVisible(false)}
      />
      <SafeAreaView
        style={StyleSheet.flatten([
          staticStyle.container,
          { paddingBottom: bottom - 50 },
          styles.container,
        ])}
      >
        <View
          style={StyleSheet.flatten([staticStyle.header, styles.container])}
        >
          <BottomTabHeader
            name={t('profile')}
            onPress={navigateToNotification}
          />
        </View>
        <ScrollView
          style={StyleSheet.flatten([
            staticStyle.container,
            styles.innerContainer,
          ])}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={StyleSheet.flatten([
              staticStyle.innerContainer,
              styles.innerContainer,
            ])}
          >
            <ProfileCard
              userData={userData}
              navigateToEditProfile={navigateToEditProfile}
              getPicture={getPicture}
            />
            <ProfileOptionsRow
              role={userData.role ?? 'client'}
              setThemeModalVisible={setThemeModalVisible}
              navigateToChangePassword={navigateToChangePassword}
            />
            <GeneralSettings
              userData={userData}
              navigateToContactSupport={navigateToContactSupport}
            />
            <AuthOptions
              role={userData.role ?? 'client'}
              setLogOutVisible={setLogOutVisible}
              setDeleteVisible={setDeleteVisible}
            />
            <RegularTextComponent
              text={t('version')}
              textStyle={StyleSheet.flatten([
                staticStyle.versionText,
                styles.versionText,
              ])}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
