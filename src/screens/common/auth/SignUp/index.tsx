import { useTheme } from '@shopify/restyle';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Theme } from '../../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { appImages } from '../../../../config/images/imagePath';
import { routeName } from '../../../../config/constants/routes';
import { rootNavigationProps } from '../../../../models/navigationModal';
import { useState } from 'react';
import { isDarkMode } from '../../../../utils/theme/darkMode';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateEmail } from '../../../../utils/validation/emailValidation';
import { validatePassword } from '../../../../utils/validation/passwordValidation';
import { showErrorToast } from '../../../../utils/toast/toast';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { AuthTitle } from '../../../../components/AuthTitle';
import { SocialLogIn } from '../../../../components/SocialLogin';
import { appColors } from '../../../../config/colors/colors';
import { AuthFooterAction } from '../../../../components/Buttons/HorizontalTextButton';
import { SignUpInputContainer } from '../../../../components/Input/SignUpInputContainer';

export const SignUpScreen = ({
  navigation,
}: rootNavigationProps<routeName.SignUp>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [passVisible, setPassVisible] = useState<boolean>(false);

  const navigateToProfileSetUp = () => {
    if (checkBox && validateEmail(email) && validatePassword(password)) {
      navigation.replace(routeName.ProfileSetUp);
    } else if (!validateEmail(email)) {
      showErrorToast({ title: t('invalidEmail') });
    } else if (!validatePassword(password)) {
      showErrorToast({ title: t('invalidPassword') });
    } else {
      showErrorToast({
        title: t('somethingWentWrong'),
        subtitle: t('pleaseTryAgain'),
      });
    }
  };

  const getTintColor = () => {
    if (isDarkMode(theme)) return appColors.app_FFFFFF;
    else return appColors.app_212121;
  };

  const navigateToLogIn = () => {
    navigation.navigate(routeName.LogIn);
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
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
              setPassword={setPassword}
              checkBox={checkBox}
              setCheckBox={setCheckBox}
              passVisible={passVisible}
              setPassVisible={setPassVisible}
              navigateToProfileSetUp={navigateToProfileSetUp}
            />
            <SocialLogIn
              getTintColor={getTintColor}
              handleGoogleLogIn={() => {}}
            />
          </View>
        </View>
        <AuthFooterAction
          navigateTo={navigateToLogIn}
          subTitle={'logIn'}
          title={'alreadyHaveAccount'}
        />
      </SafeAreaView>
    </>
  );
};
