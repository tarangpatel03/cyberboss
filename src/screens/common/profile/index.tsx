import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from '@screens/common/Profile/styles';
import { Theme } from '@config/themes/themes';
import { routeName } from '@config/constants/routes';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { RootNavigationProps } from '@models/navigationModel';
import { useEffect, useState } from 'react';
import { clearUser } from '@redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useTranslation } from 'react-i18next';
import { logOut } from '@services/firebase/auth/auth';
import { Components } from '@components/index';

export const ProfileScreen = ({
  navigation,
}: RootNavigationProps<routeName.Profile>) => {
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
      dispatch(clearUser());
      navigation.replace(routeName.BottomTab);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToSignUp = async () => {
    try {
      await logOut();
      dispatch(clearUser());
      navigation.replace(routeName.SignUp);
    } catch (error) {
      console.log(error);
    }
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
      <Components.Modals.LogOutModal
        title={t('askDeleteAccount')}
        isModal={deleteVisible}
        message={t('deleteConfirm')}
        option={t('delete')}
        setIsModal={setDeleteVisible}
        onConfirm={navigateToSignUp}
      />
      <Components.Modals.LogOutModal
        title={t('askLogout')}
        message={t('logoutConfirm')}
        option={t('logout')}
        isModal={logOutVisible}
        setIsModal={setLogOutVisible}
        onConfirm={handleSignout}
      />
      <Components.Modals.ThemeModal
        isVisible={isThemeModalVisible}
        onclose={() => setThemeModalVisible(false)}
      />
      <SafeAreaView
        style={StyleSheet.flatten([
          staticStyle.container,
          { paddingBottom: bottom - 90 },
          styles.container,
        ])}
      >
        <View
          style={StyleSheet.flatten([staticStyle.header, styles.container])}
        >
          <Components.Headers.BottomTabHeader
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
            <Components.Cards.ProfileCard
              userData={userData}
              navigateToEditProfile={navigateToEditProfile}
              getPicture={getPicture}
            />
            <Components.Cards.ProfileOptionsRow
              role={userData.role ?? 'client'}
              setThemeModalVisible={setThemeModalVisible}
              navigateToChangePassword={navigateToChangePassword}
            />
            <Components.GeneralSettings
              userData={userData}
              navigateToContactSupport={navigateToContactSupport}
            />
            <Components.Auth.AuthOptions
              role={userData.role ?? 'client'}
              setLogOutVisible={setLogOutVisible}
              setDeleteVisible={setDeleteVisible}
            />
            <Components.Text.RegularTextComponent
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
