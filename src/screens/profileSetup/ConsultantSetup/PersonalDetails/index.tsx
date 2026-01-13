import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { createStyles, staticStyle } from '@screens/profileSetup/ConsultantSetup/PersonalDetails/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import { useState } from 'react';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import firestore from '@react-native-firebase/firestore';
import { updateConsultantProfileSetup } from '@services/api/profile/updateProfile';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const PersonalDetailsScreen = ({
  navigation,
}: RootNavigationProps<routeName.PersonalDetails>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [name, setName] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const { expertises, services, id } = useSelector(
    (state: RootState) => state.user.userData,
  );

  const goBack = () => {
    navigation.goBack();
  };

  const [profileImage, setProfileImage] = useState<
    number | { uri: string } | undefined
  >(Config.appImages.img_defaultProfile);

  const navigateToNext = () => {
    updateConsultantProfileSetup(
      name,
      experience,
      bio ?? '',
      profileImage,
      expertises ?? [],
      services ?? [],
    );
    updateUserName();
    navigation.navigate(routeName.PendingVerification);
  };

  const mediaOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
  };

  const updateUserName = () => {
    firestore().collection('users').doc(id).update({
      name: name,
    });
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

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View
          style={StyleSheet.flatten([staticStyle.container, styles.container])}
        >
          <View style={staticStyle.topBar}>
            <Components.Buttons.CircularIconButton
              iconPath={Config.appIcons.ic_backIcon}
              buttonStyle={staticStyle.backButton}
              iconStyle={staticStyle.backIcon}
              tintColor={theme.colors.textPrimary}
              onPress={goBack}
            />
            <View style={StyleSheet.flatten([staticStyle.line, styles.line])}>
              <View
                style={StyleSheet.flatten([
                  staticStyle.fillLineDetail,
                  styles.filledLine,
                ])}
              />
              <View style={staticStyle.lineDetail} />
            </View>
          </View>
          <ScrollView>
            <View style={staticStyle.contentContainer}>
              <View style={staticStyle.titleView}>
                <Components.TextComponent
                  family={'semiBold'}
                  text={t('addPersonalDetails')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.title,
                    styles.title,
                  ])}
                />
                <Components.TextComponent
                  family={'regular'}
                  text={t('addPersonalDetailsLine')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.subTitle,
                    styles.subTitle,
                  ])}
                />
              </View>
              <View style={staticStyle.profileImage}>
                <FastImage source={profileImage} style={staticStyle.image} />
                <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
                  <Components.TextComponent
                    family={'medium'}
                    text={t('uploadPhoto')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.uploadText,
                      styles.uploadText,
                    ])}
                  />
                </TouchableOpacity>
              </View>
              <View style={staticStyle.inputs}>
                <Components.Inputs.CustomInput
                  placeholder={t('name')}
                  setValue={setName}
                  value={name}
                />
                <Components.Inputs.CustomInput
                  placeholder={t('yearsOfExperience')}
                  setValue={setExperience}
                  value={experience}
                />
                <Components.Inputs.BioInputComponent
                  isNotBio={false}
                  placeholder={t('bio')}
                  setValue={setBio}
                  value={bio}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={staticStyle.bottomButton}>
          <Components.Buttons.PrimaryButton
            text={t('continue')}
            onPress={navigateToNext}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
