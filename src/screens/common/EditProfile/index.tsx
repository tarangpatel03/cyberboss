import { StyleSheet, View } from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from '@screens/common/EditProfile/styles';
import { Theme } from '@config/themes/themes';
import { routeName } from '@config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigationProps } from '@models/navigationModel';
import { ScreenHeaderComponent } from '@components/Headers/ScreenHeader';
import { PrimaryButtonComponent } from '@components/Buttons/PrimaryButton';
import { getAPIData } from '@services/api/common/getCommonApi';
import { endPoints } from '@config/endPoint/apiEndPoint';
import { useTranslation } from 'react-i18next';
import { updateClientProfile } from '@services/api/profile/updateProfile';
import { EditProfileInputs } from '@components/Input/EditProfileInput';
import { PickProfilePictureContainer } from '@components/PickProfilePictureContainer';
import { ApiProfileModel } from '@models/api/profile';
import {
  TProfileModel,
  transformProfileModel,
} from '@models/formattedAPI/tProfile';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '@redux/features/userSlice';
import firestore from '@react-native-firebase/firestore';
import { ApiResponse } from '@models/apiModel';
import { RootState } from '@redux/store';

export const EditProfileScreen = ({
  navigation,
}: RootNavigationProps<routeName.EditProfile>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.user.userData.id);
  const [experience, setExperience] = useState<string | null>('');
  const profilePictureRef = useRef<number | { uri: string } | undefined>(
    undefined,
  );
  const [profileData, setProfileData] = useState<TProfileModel>({
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
  const mediaOptions: ImageLibraryOptions = {
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
      const res = await launchImageLibrary(mediaOptions);

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
    dispatch(
      setUserData({
        name: name ?? '',
      }),
    );
    updateUserName();
    goBack();
  };

  const updateUserName = () => {
    firestore().collection('users').doc(id).update({
      name: name,
    });
  };

  const getData = async () => {
    try {
      const response = await getAPIData<ApiResponse<ApiProfileModel>>(
        endPoints.consultantProfile,
      );
      if (!response) return;
      const transformedData = transformProfileModel(response.payload);
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
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <ScreenHeaderComponent onPress={goBack} headerText={t('editProfile')} />
        <View style={staticStyle.innerContainer}>
          <PickProfilePictureContainer
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
            onPress={updateProfile}
            text={t('updateProfile')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
