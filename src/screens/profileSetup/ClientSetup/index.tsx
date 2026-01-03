import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { appIcons } from '../../../config/icons/iconPath';
import { appImages } from '../../../config/images/imagePath';
import { routeName } from '../../../config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigationProps } from '../../../models/navigationModel';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { PrimaryButtonComponent } from '../../../components/Buttons/PrimaryButton';
import { MediumTextComponent } from '../../../components/Text/MediumText';
import { RegularTextComponent } from '../../../components/Text/RegularText';
import { SemiBoldTextComponent } from '../../../components/Text/SemiBoldText';
import { CircularIconButtonComponent } from '../../../components/Buttons/CircularIconButton';
import { updateClientProfile } from '../../../services/api/profile/updateProfile';
import { CustomInputComponent } from '../../../components/Input/EmailAndPasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../../redux/features/userSlice';
import firestore from '@react-native-firebase/firestore';
import { RootState } from '../../../redux/store';

export const ClientProfileSetUpScreen = ({
  navigation,
}: RootNavigationProps<routeName.ClientProfileSetUp>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.user.userData.id);
  const [userName, setUserName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<
    number | { uri: string } | undefined
  >(appImages.img_defaultProfile);

  const mediaOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
  };

  const pickImage = async () => {
    try {
      const res = await launchImageLibrary(mediaOptions);
      if (res.assets && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        if (uri) {
          setProfileImage({ uri });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserName = () => {
    firestore().collection('users').doc(id).update({
      name: userName,
    });
  };

  const setUpProfile = async () => {
    try {
      await updateClientProfile(userName, profileImage);
      dispatch(
        setUserData({
          name: userName,
          profilePicture: profileImage,
        }),
      );
      updateUserName();
      navigation.replace(routeName.BottomTab);
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.container}>
          <View style={staticStyle.container}>
            <View style={staticStyle.topBar}>
              <CircularIconButtonComponent
                iconPath={appIcons.ic_backIcon}
                buttonStyle={staticStyle.backButton}
                iconStyle={staticStyle.backIcon}
                tintColor={theme.colors.textPrimary}
                onPress={goBack}
              />
              <View style={StyleSheet.flatten([staticStyle.line, styles.line])}>
                <View
                  style={StyleSheet.flatten([
                    staticStyle.lineDetail,
                    styles.filledLine,
                  ])}
                />
                <View style={staticStyle.lineDetail} />
              </View>
            </View>
            <View style={staticStyle.contentContainer}>
              <View style={staticStyle.titleView}>
                <SemiBoldTextComponent
                  text={t('completeProfile')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.title,
                    styles.title,
                  ])}
                />
                <RegularTextComponent
                  text={t('completeProfileLine')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.subTitle,
                    styles.subTitle,
                  ])}
                />
              </View>
              <View style={staticStyle.profileImage}>
                <FastImage source={profileImage} style={staticStyle.image} />
                <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
                  <MediumTextComponent
                    text={t('uploadPhoto')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.uploadText,
                      styles.uploadText,
                    ])}
                  />
                </TouchableOpacity>
              </View>
              <View style={staticStyle.input}>
                <CustomInputComponent
                  placeholder={t('name')}
                  setValue={setUserName}
                  value={userName}
                />
              </View>
            </View>
          </View>
          <View style={staticStyle.bottomButton}>
            <PrimaryButtonComponent
              onPress={setUpProfile}
              text={t('continue')}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
