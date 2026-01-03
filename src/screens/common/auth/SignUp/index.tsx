import { useTheme } from '@shopify/restyle';
import { StyleSheet, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { createStyles, staticStyle } from '@screens/common/auth/SignUp/styles';
import { appImages } from '@config/images/imagePath';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import { useState } from 'react';
import { isDarkMode } from '@utils/theme/darkMode';
import {
  validateEmail,
  validatePassword,
} from '@utils/validation/validation';
import { showErrorToast } from '@utils/toast/toast';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { appColors } from '@config/colors/colors';
import { AuthFooterAction } from '@components/Buttons/HorizontalTextButton';
import { SignUpInputContainer } from '@components/Input/SignUpInputContainer';
import { setUser, setUserData } from '@redux/features/userSlice';
import { useDispatch } from 'react-redux';
import {
  appleLogIn,
  googleLogIn,
  signUp,
} from '@services/firebase/auth/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthTitle } from '@components/Auth/AuthTitle';
import { SocialLogIn } from '@components/Auth/SocialLogin';

export const SignUpScreen = ({
  navigation,
}: RootNavigationProps<routeName.SignUp>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('signUp');
  const [passVisible, setPassVisible] = useState<boolean>(false);

  const navigateToProfileSetUp = () => {
    if (checkBox) {
      navigation.replace(routeName.ProfileSetUp);
    } else {
      showErrorToast({
        title: t('somethingWentWrong'),
        subtitle: t('pleaseTryAgain'),
      });
    }
  };

  const navigateToLogIn = () => {
    navigation.replace(routeName.LogIn);
  };

  const getTintColor = () => {
    if (isDarkMode(theme)) return appColors.app_FFFFFF;
    else return appColors.app_212121;
  };

  const createFireBaseUser = (id: string) => {
    firestore().collection('users').doc(id).set({
      user_id: id,
      profile_image: null,
      timestamp: firestore.FieldValue.serverTimestamp(),
      lastonlineTimeTimestamp: firestore.FieldValue.serverTimestamp(),
    });
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
        navigateToProfileSetUp();
      }
    } catch (error) {
      console.log(error);
      showErrorToast({ title: 'Apple login failed' });
    }
  };

  const handleGoogleLogIn = async () => {
    try {
      const res = await googleLogIn();
      if (res) {
        dispatch(setUser(res));
        navigateToProfileSetUp();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async () => {
    try {
      setButtonText(t('loading'));
      if (validateEmail(email) && validatePassword(password)) {
        const res = await signUp(email, password);
        if (res) {
          dispatch(setUser(res.access_token));
          dispatch(
            setUserData({
              email: email,
            }),
          );
          createFireBaseUser(res.id);
          navigateToProfileSetUp();
        }
      } else {
        showErrorToast({
          title: t('invalidEmailOrPassword'),
        });
        setButtonText(t('signUp'));
      }
    } catch (error) {
      console.log(error);
      setButtonText(t('signUp'));
    } finally {
      setButtonText(t('signUp'));
    }
  };

  return (
    <>
      <View
        style={StyleSheet.flatten([staticStyle.background, styles.background])}
      >
        <FastImage
          source={appImages.img_authCard}
          style={staticStyle.topCard}
        />
        <View
          style={StyleSheet.flatten([staticStyle.container, styles.container])}
        >
          <View style={staticStyle.mainContainer}>
            <AuthTitle title={'letsDiveIn'} subTitle={'signUpLine'} />
            <SignUpInputContainer
              email={email}
              setEmail={setEmail}
              password={password}
              buttonText={buttonText}
              setPassword={setPassword}
              checkBox={checkBox}
              setCheckBox={setCheckBox}
              passVisible={passVisible}
              setPassVisible={setPassVisible}
              handleSignUp={handleSignUp}
            />
            <SocialLogIn
              handleAppleLogIn={handleAppleLogIn}
              getTintColor={getTintColor}
              handleGoogleLogIn={handleGoogleLogIn}
            />
          </View>
        </View>
        <AuthFooterAction
          navigateTo={navigateToLogIn}
          subTitle={'logIn'}
          title={'alreadyHaveAccount'}
        />
      </View>
    </>
  );
};
