import {useTheme} from '@shopify/restyle';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import {createStyles, staticStyle} from '@screens/common/auth/LogIn/styles';
import {Theme} from '@config/themes/themes';
import {setUser, setUserData} from '@redux/features/userSlice';
import {routeName} from '@config/constants/routes';
import {RootNavigationProps} from '@models/navigationModel';
import {googleLogIn, signIn} from '@services/firebase/auth/auth';
import {RootState} from '@redux/store';
import {appleLogIn} from '@services/firebase/auth/auth';
import {Utils} from '@utils/index';
import {Config} from '@config/index';
import {Components} from '@components/index';

export const LogInScreen = ({
                                navigation,
                            }: RootNavigationProps<routeName.LogIn>) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const {is_verified, role} = useSelector(
        (state: RootState) => state.user.userData,
    );
    const [buttonText, setButtonText] = useState<string>('logIn');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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
            Utils.showErrorToast({title: 'Apple login failed'});
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
                        <View style={staticStyle.titleContainer}>
                            <Components.TextComponent
                                text={t('welcomeBack')}
                                family={'semiBold'}
                                textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
                            />
                            <Components.TextComponent
                                text={t('logInLine')}
                                family={'regular'}
                                textStyle={StyleSheet.flatten([staticStyle.subTitle, styles.subTitle])}
                            />
                        </View>
                        <View style={staticStyle.inputs}>
                            <View style={staticStyle.emailPassInput}>
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
                                <Components.Buttons.PrimaryButton
                                    text={t(buttonText)}
                                    onPress={handleSignIn}
                                />
                            </View>
                            <View style={staticStyle.forgotPassword}>
                                <Components.TextComponent
                                    text={t('forgotPassword')}
                                    family={'medium'}
                                    textStyle={StyleSheet.flatten([staticStyle.subTitle, styles.subTitle])}
                                />
                                <TouchableOpacity activeOpacity={0.7} onPress={navigateToForgotPassword}>
                                    <Components.TextComponent
                                        text={t('reset')}
                                        family={'medium'}
                                        textStyle={styles.signUp}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={staticStyle.socialLogin}>
                            <View
                                style={StyleSheet.flatten([
                                    staticStyle.continueWith,
                                ])}
                            >
                                <View style={StyleSheet.flatten([staticStyle.line, styles.line])}/>
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
                <View style={staticStyle.forgotPassword}>
                    <Components.TextComponent
                        text={t("don'tHaveAccount")}
                        family={'medium'}
                        textStyle={StyleSheet.flatten([staticStyle.subTitle, styles.subTitle])}
                    />
                    <TouchableOpacity activeOpacity={0.7} onPress={navigateToSignUp}>
                        <Components.TextComponent
                            text={t('signUp')}
                            family={'medium'}
                            textStyle={styles.signUp}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};
