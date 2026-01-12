import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {createStyles, staticStyle} from '@screens/common/Profile/styles';
import {Theme} from '@config/themes/themes';
import {routeName} from '@config/constants/routes';
import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {RootNavigationProps} from '@models/navigationModel';
import {useEffect, useState} from 'react';
import {clearUser} from '@redux/features/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@redux/store';
import {useTranslation} from 'react-i18next';
import {logOut} from '@services/firebase/auth/auth';
import {Components} from '@components/index';
import {Config} from "@config/index.ts";
import FastImage from "react-native-fast-image";

export const ProfileScreen = ({
                                  navigation,
                              }: RootNavigationProps<routeName.Profile>) => {
    const {t} = useTranslation();
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const {bottom} = useSafeAreaInsets();
    const dispatch = useDispatch();
    const [imageError, setImageError] = useState<boolean>(false);
    const {userData, token: isLoggedIn} = useSelector(
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
    const handleSignOut = async () => {
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
            return {uri: userData.profilePicture};
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
                onConfirm={handleSignOut}
            />
            <Components.Modals.ThemeModal
                isVisible={isThemeModalVisible}
                onclose={() => setThemeModalVisible(false)}
            />
            <SafeAreaView
                style={StyleSheet.flatten([
                    staticStyle.container,
                    {paddingBottom: bottom - 90},
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
                        <View style={staticStyle.profileCard}>
                            <View
                                style={StyleSheet.flatten([
                                    userData.role === 'consultant'
                                        ? staticStyle.consultantUserCard
                                        : staticStyle.userDetailCard,
                                    styles.userDetailCard,
                                ])}
                            >
                                <FastImage
                                    source={
                                        imageError
                                            ? Config.appImages.img_defaultProfile
                                            : getPicture()
                                                ? getPicture()
                                                : Config.appImages.img_defaultProfile
                                    }
                                    style={staticStyle.profileImage}
                                    onError={() => setImageError(true)}
                                />
                                <View style={staticStyle.userNameCard}>
                                    <View>
                                        <Components.TextComponent
                                            family={'medium'}
                                            text={userData.name ?? 'user'}
                                            textStyle={StyleSheet.flatten([
                                                staticStyle.userName,
                                                styles.userName,
                                            ])}
                                        />
                                        <Components.TextComponent
                                            family={'regular'}
                                            text={userData.email ?? ''}
                                            textStyle={StyleSheet.flatten([
                                                staticStyle.userEmail,
                                                styles.userEmail,
                                            ])}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={navigateToEditProfile}
                                        style={StyleSheet.flatten([
                                            staticStyle.editProfile,
                                            styles.editProfile,
                                        ])}
                                    >
                                        <FastImage source={Config.appIcons.ic_pen} style={staticStyle.editIcon}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {userData.role === 'consultant' && (
                                <View
                                    style={StyleSheet.flatten([
                                        staticStyle.consultantCard,
                                        staticStyle.options,
                                        styles.utilCard,
                                        styles.separator,
                                    ])}
                                >
                                    <View
                                        style={StyleSheet.flatten([
                                            staticStyle.separator,
                                            styles.separator,
                                        ])}
                                    />
                                    <Components.Buttons.SettingOptionsButton
                                        navigate={() => {
                                        }}
                                        title={t('expertise')}
                                        icon={Config.appIcons.ic_briefCase}
                                    />
                                </View>
                            )}
                        </View>
                        <View
                            style={
                                userData.role === 'consultant'
                                    ? staticStyle.consultantUtilCardContainer
                                    : staticStyle.utilCardContainer
                            }
                        >
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setThemeModalVisible(true)}
                                style={StyleSheet.flatten([staticStyle.utilCard, styles.utilCard])}
                            >
                                <View
                                    style={StyleSheet.flatten([
                                        staticStyle.editProfile,
                                        styles.iconContainer,
                                    ])}
                                >
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.contain}
                                        tintColor={theme.colors.textSecondary}
                                        source={Config.appIcons.ic_theme}
                                        style={staticStyle.icon}
                                    />
                                </View>
                                <Components.TextComponent
                                    family={'regular'}
                                    text={t('appearance')}
                                    textStyle={StyleSheet.flatten([
                                        staticStyle.infoText,
                                        styles.userName,
                                    ])}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={navigateToChangePassword}
                                style={StyleSheet.flatten([staticStyle.utilCard, styles.utilCard])}
                            >
                                <View
                                    style={StyleSheet.flatten([
                                        staticStyle.editProfile,
                                        styles.iconContainer,
                                    ])}
                                >
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.contain}
                                        tintColor={theme.colors.textSecondary}
                                        source={Config.appIcons.ic_changePass}
                                        style={staticStyle.icon}
                                    />
                                </View>
                                <Components.TextComponent
                                    family={'regular'}
                                    text={t('changePassword')}
                                    textStyle={StyleSheet.flatten([
                                        staticStyle.infoText,
                                        styles.userName,
                                    ])}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={StyleSheet.flatten([
                                userData.role === 'consultant'
                                    ? staticStyle.consultantOptionsCard
                                    : staticStyle.optionsCard,
                                styles.utilCard,
                            ])}
                        >
                            <Components.TextComponent
                                family={'medium'}
                                text={t('general')}
                                textStyle={StyleSheet.flatten([
                                    staticStyle.optionTitle,
                                    styles.userEmail,
                                ])}
                            />
                            <View
                                style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
                            />
                            <View style={staticStyle.options}>
                                {userData.role === 'client' && (
                                    <>
                                        <Components.Buttons.SettingOptionsButton
                                            navigate={navigateToContactSupport}
                                            title={t('contactSupport')}
                                            icon={Config.appIcons.ic_contactSupport}
                                        />
                                        <View
                                            style={StyleSheet.flatten([
                                                staticStyle.separator,
                                                styles.separator,
                                            ])}
                                        />
                                    </>
                                )}
                                <Components.Buttons.SettingOptionsButton
                                    navigate={() => {
                                    }}
                                    title={t('aboutUs')}
                                    icon={Config.appIcons.ic_aboutUs}
                                />
                                <View
                                    style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
                                />
                                <Components.Buttons.SettingOptionsButton
                                    navigate={() => {
                                    }}
                                    title={t('termsPrivacy')}
                                    icon={Config.appIcons.ic_terms}
                                />
                            </View>
                        </View>
                        <View
                            style={StyleSheet.flatten([
                                userData.role === 'consultant'
                                    ? staticStyle.consultantOptionsCard
                                    : staticStyle.optionsCard,
                                styles.utilCard,
                            ])}
                        >
                            <Components.TextComponent
                                text={t('account')}
                                family={'medium'}
                                textStyle={StyleSheet.flatten([
                                    staticStyle.optionTitle,
                                    styles.userEmail,
                                ])}
                            />
                            <View
                                style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
                            />
                            <View style={staticStyle.options}>
                                <Components.Buttons.SettingOptionsButton
                                    navigate={() => setDeleteVisible(true)}
                                    title={t('deleteAccount')}
                                    icon={Config.appIcons.ic_bin}
                                />
                                <View
                                    style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
                                />
                                <Components.Buttons.SettingOptionsButton
                                    navigate={() => setLogOutVisible(true)}
                                    title={t('logout')}
                                    icon={Config.appIcons.ic_logOut}
                                />
                            </View>
                        </View>
                        <View style={{flex: 1}}/>
                    </View>
                    <Components.TextComponent
                        family={'regular'}
                        text={t('version')}
                        textStyle={StyleSheet.flatten([
                            staticStyle.versionText,
                            styles.versionText,
                        ])}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};
