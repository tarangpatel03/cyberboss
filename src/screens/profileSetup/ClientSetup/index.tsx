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
import { isDarkMode } from '../../../utils/theme/darkMode';
import { appImages } from '../../../config/images/imagePath';
import { routeName } from '../../../config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rootNavigationProps } from '../../../models/navigationModal';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BorderInputComponent } from '../../../components/Input/BorderInput';
import { PrimaryButtonComponent } from '../../../components/Buttons/PrimaryButton';
import { MediumTextComponent } from '../../../components/Text/MediumTextComponent';
import { RegularTextComponent } from '../../../components/Text/RegularTextComponent';
import { SemiBoldTextComponent } from '../../../components/Text/SemiBoldTextComponent';
import { CircularIconButtonComponent } from '../../../components/Buttons/CircularIconButton';

export const ClientProfileSetUpScreen = ({
  navigation,
}: rootNavigationProps<routeName.ClientProfileSetUp>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>('');
  const [profileImage, setProfileImage] = useState<
    number | { uri: string } | undefined
  >(appImages.img_defaultProfile);

  const mediaOptoins: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
  };

  const pickImage = async () => {
    try {
      const res = await launchImageLibrary(mediaOptoins);

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

  const navigateToHomeScreen = () => {
    try {
      if (userName && userName.length < 1) {
        setIsWarning(true);
      } else {
        navigation.replace(routeName.ClientBottomTab);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.container}>
          <View style={staticStyle.container}>
            <View style={staticStyle.topBar}>
              <CircularIconButtonComponent
                obj={{
                  iconPath: appIcons.ic_backIcon,
                  buttonStyle: staticStyle.backButton,
                  iconStyle: staticStyle.backIcon,
                  tintColor: theme.colors.textPrimary,
                  onPress: goBack,
                }}
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
                {isWarning && (
                  <RegularTextComponent
                    text={t('userNameWarnig')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.warningText,
                      styles.warningText,
                    ])}
                  />
                )}
                <BorderInputComponent
                  placeholder={t('name')}
                  setValue={setUserName}
                  value={userName}
                  borderStyle={isWarning ? styles.warningBorder : null}
                />
              </View>
            </View>
          </View>
          <View style={staticStyle.bottomButton}>
            <PrimaryButtonComponent
              obj={{
                onPress: navigateToHomeScreen,
                text: t('continue'),
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
