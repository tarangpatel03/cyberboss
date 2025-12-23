import { useTheme } from '@shopify/restyle';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../../config/themes/themes';
import { appIcons } from '../../../../config/icons/iconPath';
import { appColors } from '../../../../config/colors/colors';
import { appImages } from '../../../../config/images/imagePath';
import { isDarkMode } from '../../../../utils/theme/darkMode';
import { setUser } from '../../../../redux/features/userSlice';
import { showErrorToast } from '../../../../utils/toast/toast';
import { routeName } from '../../../../config/constants/routes';
import { rootNavigationProps } from '../../../../models/navigationModal';
import { validateEmail } from '../../../../utils/validation/emailValidation';
import { validatePassword } from '../../../../utils/validation/passwordValidation';
import { signIn } from '../../../../services/auth/firebase/signIn';
import { googleLogIn } from '../../../../services/auth/firebase/googleSignin';
import { LogInInputsContainer } from '../../../../components/Input/LogInInputContainer';
import { AuthTitle } from '../../../../components/AuthTitle';
import { AuthFooterAction } from '../../../../components/Buttons/HorizontalTextButton';
import { SocialLogIn } from '../../../../components/SocialLogin';

export const LogInScreen = ({
  navigation,
}: rootNavigationProps<routeName.LogIn>) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [buttonText, setButtonText] = useState<string>('logIn');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passVisible, setPassVisible] = useState(false);

  const navigateToSignUp = () => {
    navigation.replace(routeName.SignUp);
  };

  const navigateToForgotPassword = () => {
    navigation.navigate(routeName.ForgotPassword);
  };

  const navigateToHomeScreen = () => {
    navigation.replace(routeName.ClientBottomTab);
  };

  const handleSignIn = async () => {
    try {
      setButtonText('loading');
      if (validateEmail(email) && validatePassword(password)) {
        const res = await signIn(email, password);
        if (res) {
          dispatch(setUser(res.access_token));
          navigateToHomeScreen();
        }
      } else {
        showErrorToast({
          title: t('invalidEmailOrPassword'),
        });
        setButtonText(t('logIn'));
      }
    } catch (error) {
      console.log(error);
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
    if (isDarkMode(theme)) return appColors.app_FFFFFF;
    else return appColors.app_212121;
  };

  const getIconStyle = () => {
    if (passVisible) return staticStyle.showPasswordIcon;
    else return staticStyle.hiddenPasswordIcon;
  };

  const getIcon = () => {
    if (passVisible) return appIcons.ic_showPassword;
    else return appIcons.ic_hiddenPassword;
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
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
            <AuthTitle title={'welcomeback'} subTitle={'logInLine'} />
            <View style={staticStyle.inputs}>
              <LogInInputsContainer
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
              <AuthFooterAction
                subTitle={'reset'}
                title={'forgotPassword'}
                navigateTo={navigateToForgotPassword}
              />
            </View>
            <SocialLogIn
              handleGoogleLogIn={handleGoogleLogIn}
              getTintColor={getTintColor}
            />
          </View>
        </View>
        <AuthFooterAction
          subTitle={'signUp'}
          title={'dontHaveAccount'}
          navigateTo={navigateToSignUp}
        />
      </View>
    </>
  );
};
