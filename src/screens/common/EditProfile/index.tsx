import { StatusBar, StyleSheet, View } from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { isDarkMode } from '../../../utils/theme/darkMode';
import { routeName } from '../../../config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rootNavigationProps } from '../../../models/navigationModal';
import { ScreenHeaderComponent } from '../../../components/Headers/ScreenHeaderComponent';
import { PrimaryButtonComponent } from '../../../components/Buttons/PrimaryButton';
import { getAPIData } from '../../../services/api/getApi/getAPI';
import {
  IProfileModal,
  transformProfileModal,
} from '../../../models/formattedAPI/formatedModals';
import { ApiProfileModel } from '../../../models/api/models';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { useTranslation } from 'react-i18next';
import { updateClientProfile } from '../../../services/api/postApi/updateProfile';
import { EditProfileInputs } from '../../../components/Input/EditProfileInput';
import { PickPrifilePictureContainer } from '../../../components/PickProfilePictureContainer';

export const EditProfileScreen = ({
  navigation,
}: rootNavigationProps<routeName.EditProfile>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [experience, setExperience] = useState<string | null>('');
  const profilePictureRef = useRef<number | { uri: string } | undefined>(
    undefined,
  );
  const [profileData, setProfileData] = useState<IProfileModal>({
    id: '',
    name: 'User',
    email: '',
    phoneNumber: null,
    profilePicture: undefined,
    role: 'client',
    bio: null,
    experienceYear: null,
    rate: null,
    expertises: [],
    services: [],
    isVerified: false,
    loginType: 'social',
    profileSetup: false,
  });

  const [email, setEmail] = useState<string>(profileData.email);
  const [bio, setBio] = useState<string | null>(profileData.bio);
  const [name, setUserName] = useState<string | null>(profileData.name);
  const mediaOptoins: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
  };

  const getPicture = () => {
    if (typeof profileData.profilePicture === 'string') {
      return { uri: profileData.profilePicture };
    } else {
      return profileData.profilePicture;
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const pickImage = async () => {
    try {
      const res = await launchImageLibrary(mediaOptoins);

      if (res.assets && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        if (uri) {
          profilePictureRef.current = { uri };
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    // profileData.role === 'client' ?
    await updateClientProfile(name ?? '', profilePictureRef.current);
    goBack();
  };

  const getData = async () => {
    try {
      const res: ApiProfileModel = await getAPIData(
        endPoints.consultantProfile,
      );
      const transformedData = transformProfileModal(res);
      setProfileData(transformedData);
      setBio(transformedData.bio);
      setEmail(transformedData.email);
      setUserName(transformedData.name);
      profilePictureRef.current = transformedData.profilePicture;
      setExperience(transformedData.experienceYear?.toString() ?? '');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <ScreenHeaderComponent onPress={goBack} headerText={t('editProfile')} />
        <View style={staticStyle.innerContainer}>
          <PickPrifilePictureContainer
            getPicture={getPicture}
            pickImage={pickImage}
            changePhotoText={styles.changePhotoText}
          />
          <EditProfileInputs
            experience={experience}
            setExperience={setExperience}
            role={profileData.role}
            email={email}
            bio={bio}
            setBio={setBio}
            name={name}
            setUserName={setUserName}
          />
        </View>
        <View style={staticStyle.button}>
          <PrimaryButtonComponent
            obj={{
              onPress: updateProfile,
              text: t('updateProfile'),
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
