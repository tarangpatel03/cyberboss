import { useTheme } from '@shopify/restyle';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { createStyles, staticStyle } from '@screens/common/auth/LogIn/styles';
import { Theme } from '@config/themes/themes';
import { setUser, setUserData } from '@redux/features/userSlice';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import { googleLogIn, signIn } from '@services/firebase/auth/auth';
import { RootState } from '@redux/store';
import { appleLogIn } from '@services/firebase/auth/auth';
import { Utils } from '@utils/index';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const LogInScreen = ({
  navigation,
}: RootNavigationProps<routeName.LogIn>) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { is_verified, role } = useSelector(
    (state: RootState) => state.user.userData,
  );
  const [buttonText, setButtonText] = useState<string>('logIn');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passVisible, setPassVisible] = useState(false);

  const navigateToSignUp = () => {
    navigation.replace(routeName.SignUp);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToForgotPassword = () => {
    navigation.navigate(routeName.ForgotPassword);
  };

  const navigateToHomeScreen = () => {
    if (role === 'client') {
      navigation.replace(routeName.BottomTab);
    } else {
      is_verified
        ? navigation.replace(routeName.BottomTab)
        : navigation.replace(routeName.PendingVerification);
    }
  };

  const handleAppleLogIn = async () => {
    try {
      const res = await appleLogIn();

      if (res) {
        dispatch(setUser(res.userToken.access_token));

        dispatch(
          setUserData({
            firebaseUid: res.uid,
            role: res.userToken.role,
          }),
        );
        navigateToHomeScreen();
      }
    } catch (error) {
      console.log(error);
      Utils.showErrorToast({ title: 'Apple login failed' });
    }
  };

  const handleSignIn = async () => {
    try {
      setButtonText('loading');
      // if (Utils.validateEmail(email) && Utils.validatePassword(password)) {
      if (Utils.validateEmail(email)) {
        const res = await signIn(email, password);
        if (res) {
          dispatch(setUser(res.userToken.access_token));
          dispatch(
            setUserData({
              firebaseUid: res.uid,
              role: res.userToken.role,
            }),
          );
          navigateToHomeScreen();
        }
      } else {
        Utils.showErrorToast({
          title: t('invalidEmailOrPassword'),
        });
        setButtonText(t('logIn'));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonText(t('logIn'));
    }
  };

  const handleGoogleLogIn = async () => {
    try {
      const res = await googleLogIn();
      if (res) {
        dispatch(setUser(res));
        navigateToHomeScreen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTintColor = () => {
    if (Utils.isDarkMode(theme)) return Config.appColors.app_FFFFFF;
    else return Config.appColors.app_212121;
  };

  const getIconStyle = () => {
    if (passVisible) return staticStyle.showPasswordIcon;
    else return staticStyle.hiddenPasswordIcon;
  };

  const getIcon = () => {
    if (passVisible) return Config.appIcons.ic_showPassword;
    else return Config.appIcons.ic_hiddenPassword;
  };

  return (
    <>
      <View
        style={StyleSheet.flatten([staticStyle.background, styles.background])}
      >
        <TouchableOpacity
          onPress={goBack}
          activeOpacity={0.8}
          style={StyleSheet.flatten([staticStyle.backButton])}
        >
          <FastImage
            style={staticStyle.backIcon}
            source={Config.appIcons.ic_backIcon}
            tintColor={Config.appColors.app_FFFFFF}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <FastImage
          source={Config.appImages.img_authCard}
          style={staticStyle.topCard}
        />
        <View
          style={StyleSheet.flatten([staticStyle.container, styles.container])}
        >
          <View style={staticStyle.mainContainer}>
            <Components.Auth.AuthTitle title={'welcomeBack'} subTitle={'logInLine'} />
            <View style={staticStyle.inputs}>
              <Components.Inputs.LogInInputsContainer
                buttonText={buttonText}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                passVisible={passVisible}
                setPassVisible={setPassVisible}
                handleSignIn={handleSignIn}
                getTintColor={getTintColor}
                getIconStyle={getIconStyle}
                getIcon={getIcon}
              />
              <Components.Buttons.AuthFooterAction
                subTitle={'reset'}
                title={'forgotPassword'}
                navigateTo={navigateToForgotPassword}
              />
            </View>
            <Components.Auth.SocialLogIn
              handleAppleLogIn={handleAppleLogIn}
              handleGoogleLogIn={handleGoogleLogIn}
              getTintColor={getTintColor}
            />
          </View>
        </View>
        <Components.Buttons.AuthFooterAction
          subTitle={'signUp'}
          title={"don'tHaveAccount"}
          navigateTo={navigateToSignUp}
        />
      </View>
    </>
  );
};
