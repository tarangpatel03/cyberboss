import { useTheme } from '@shopify/restyle';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { createStyles, staticStyle } from '@screens/common/auth/SignUp/styles';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { setUser, setUserData } from '@redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { appleLogIn, googleLogIn, signUp } from '@services/firebase/auth/auth';
import firestore from '@react-native-firebase/firestore';
import { Utils } from '@utils/index';
import { Config } from '@config/index';
import { Components } from '@components/index';

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

  const navigateToProfileSetUp = () => {
    if (checkBox) {
      navigation.replace(routeName.ProfileSetUp);
    } else {
      Utils.showErrorToast({
        title: t('somethingWentWrong'),
        subtitle: t('pleaseTryAgain'),
      });
    }
  };

  const navigateToLogIn = () => {
    navigation.replace(routeName.LogIn);
  };

  const getTintColor = () => {
    if (Utils.isDarkMode(theme)) return Config.appColors.app_FFFFFF;
    else return Config.appColors.app_212121;
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Utils.showErrorToast({ title: 'Apple login failed' });
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
      Utils.showErrorToast({ title: error as string });
    }
  };

  const handleSignUp = async () => {
    try {
      setButtonText(t('loading'));
      // if (Utils.validateEmail(email) && Utils.validatePassword(password)) {
      if (Utils.validateEmail(email)) {
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
        Utils.showErrorToast({
          title: t('invalidEmailOrPassword'),
        });
        setButtonText(t('signUp'));
      }
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
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
          source={Config.appImages.img_authCard}
          style={staticStyle.topCard}
        />
        <View
          style={StyleSheet.flatten([staticStyle.container, styles.container])}
        >
          <View style={staticStyle.mainContainer}>
            <View style={staticStyle.titleContainer}>
              <Components.TextComponent
                text={t('letsDiveIn')}
                family={'semiBold'}
                textStyle={StyleSheet.flatten([
                  staticStyle.title,
                  styles.title,
                ])}
              />
              <Components.TextComponent
                text={t('signUpLine')}
                family={'regular'}
                textStyle={StyleSheet.flatten([
                  staticStyle.subTitle,
                  styles.subTitle,
                ])}
              />
            </View>
            <View style={staticStyle.inputs}>
              <Components.Inputs.CustomInput
                keyboardType="email-address"
                placeholder={t('email')}
                value={email}
                setValue={setEmail}
              />
              <View style={staticStyle.passwordInput}>
                <Components.Inputs.CustomInput
                  isPassword={true}
                  placeholder={t('password')}
                  value={password}
                  setValue={setPassword}
                />
              </View>
              <View style={staticStyle.signUpLine}>
                <View>
                  <TouchableOpacity
                    onPress={() => setCheckBox(prev => !prev)}
                    style={StyleSheet.flatten([
                      staticStyle.checkBox,
                      styles.checkBox,
                    ])}
                  >
                    {checkBox && (
                      <View
                        style={StyleSheet.flatten([
                          staticStyle.checkedBox,
                          styles.checkedBox,
                        ])}
                      >
                        <FastImage
                          resizeMode={FastImage.resizeMode.contain}
                          source={Config.appIcons.ic_checkMark}
                          style={staticStyle.checkMark}
                          tintColor={theme.colors.pureWhite}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <Components.TextComponent
                  family={'regular'}
                  text={t('agreeTo')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.termsLine,
                    styles.subTitle,
                  ])}
                />
                <TouchableOpacity activeOpacity={0.7}>
                  <Components.TextComponent
                    family={'regular'}
                    text={t('privacyPolicy')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.termsLine,
                      styles.logIn,
                    ])}
                  />
                </TouchableOpacity>
                <Components.TextComponent
                  family={'regular'}
                  text={t('and')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.termsLine,
                    styles.subTitle,
                  ])}
                />
                <TouchableOpacity activeOpacity={0.7}>
                  <Components.TextComponent
                    family={'regular'}
                    text={t('terms')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.termsLine,
                      styles.logIn,
                    ])}
                  />
                </TouchableOpacity>
              </View>
              <Components.Buttons.PrimaryButton
                text={t(buttonText)}
                onPress={handleSignUp}
              />
            </View>
            <View style={staticStyle.socialLogin}>
              <View style={StyleSheet.flatten([staticStyle.continueWith])}>
                <View
                  style={StyleSheet.flatten([staticStyle.line, styles.line])}
                />
                <Components.TextComponent
                  text={t('continueWith')}
                  family={'regular'}
                  textStyle={StyleSheet.flatten([
                    staticStyle.subTitle,
                    staticStyle.centerText,
                    styles.subTitle,
                    styles.centerText,
                  ])}
                />
              </View>
              <View style={staticStyle.bottomButtons}>
                {Platform.OS === 'ios' ? (
                  <Components.Buttons.CircularIconButton
                    buttonStyle={StyleSheet.flatten([
                      StyleSheet.flatten([staticStyle.button, styles.button]),
                    ])}
                    iconPath={Config.appIcons.ic_apple}
                    iconStyle={staticStyle.buttonIcon}
                    tintColor={getTintColor()}
                    onPress={handleAppleLogIn}
                  />
                ) : null}
                <View style={staticStyle.bottomButtons}>
                  <Components.Buttons.CircularIconButton
                    buttonStyle={StyleSheet.flatten([
                      staticStyle.button,
                      styles.button,
                    ])}
                    iconPath={Config.appIcons.ic_google}
                    iconStyle={staticStyle.googleButtonIcon}
                    onPress={handleGoogleLogIn}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={staticStyle.footerLine}>
          <Components.TextComponent
            text={t('alreadyHaveAccount')}
            family={'medium'}
            textStyle={StyleSheet.flatten([
              staticStyle.subTitle,
              styles.subTitle,
            ])}
          />
          <TouchableOpacity activeOpacity={0.7} onPress={navigateToLogIn}>
            <Components.TextComponent
              text={t('logIn')}
              family={'medium'}
              textStyle={styles.primaryText}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
