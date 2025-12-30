import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButtonComponent } from '../../../../components/Buttons/PrimaryButton';
import { CircularIconButtonComponent } from '../../../../components/Buttons/CircularIconButton';
import { appIcons } from '../../../../config/icons/iconPath';
import { routeName } from '../../../../config/constants/routes';
import { rootNavigationProps } from '../../../../models/navigationModal';
import { MediumTextComponent } from '../../../../components/Text/MediumTextComponent';
import { useState } from 'react';
import { appImages } from '../../../../config/images/imagePath';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { SemiBoldTextComponent } from '../../../../components/Text/SemiBoldTextComponent';
import { RegularTextComponent } from '../../../../components/Text/RegularTextComponent';
import { BioInputComponent } from '../../../../components/Input/MultiLineInput';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { rootState } from '../../../../redux/store';
import { updateConsultantProfileSetup } from '../../../../services/api/profile/updateProfile';
import { CustomInputComponent } from '../../../../components/Input/EmailAndPasswordInput';

export const PersonalDetailsScreen = ({
  navigation,
}: rootNavigationProps<routeName.PersonalDetails>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [name, setName] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [bio, setBio] = useState<string | null>(null);
  const { expertises, services } = useSelector(
    (state: rootState) => state.user.userData,
  );

  const goBack = () => {
    navigation.goBack();
  };

  const [profileImage, setProfileImage] = useState<
    number | { uri: string } | undefined
  >(appImages.img_defaultProfile);

  const navigateToNext = () => {
    updateConsultantProfileSetup(
      name,
      experience,
      bio ?? '',
      profileImage,
      expertises ?? [],
      services ?? [],
    );
    navigation.navigate(routeName.PendingVerification);
  };

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

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View
          style={StyleSheet.flatten([staticStyle.container, styles.container])}
        >
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
                <SemiBoldTextComponent
                  text={t('addPersonalDetails')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.title,
                    styles.title,
                  ])}
                />
                <RegularTextComponent
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
                  <MediumTextComponent
                    text={t('uploadPhoto')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.uploadText,
                      styles.uploadText,
                    ])}
                  />
                </TouchableOpacity>
              </View>
              <View style={staticStyle.inputs}>
                <CustomInputComponent
                  placeholder={t('name')}
                  setValue={setName}
                  value={name}
                />
                <CustomInputComponent
                  placeholder={t('yearsOfExperience')}
                  setValue={setExperience}
                  value={experience}
                />
                <BioInputComponent
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
          <PrimaryButtonComponent
            text={t('continue')}
            onPress={navigateToNext}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
