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
import { getAPIData } from '@services/api/common/getCommonApi';
import { useTranslation } from 'react-i18next';
import {
  updateClientProfile,
  updateConsultantProfile,
} from '@services/api/profile/updateProfile';
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
import { Config } from '@config/index';
import { Components } from '@components/index';
import { Utils } from '@utils/index';

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
  const [bio, setBio] = useState<string>(profileData.bio ?? '');
  const [name, setUserName] = useState<string>(profileData.name);
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
      Utils.showErrorToast({ title: error as string });
    }
  };

  const updateProfile = async () => {
    profileData.role === 'client'
      ? await updateClientProfile(name ?? '', profilePictureRef.current)
      : await updateConsultantProfile(name, bio, Number(experience ?? '0'));
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
        Config.endPoints.consultantProfile,
      );
      if (!response) return;
      const transformedData = transformProfileModel(response.payload);
      setProfileData(transformedData);
      setBio(transformedData.bio ?? '');
      setEmail(transformedData.email);
      setUserName(transformedData.name);
      profilePictureRef.current = transformedData.profilePicture;
      setExperience(transformedData.experienceYear?.toString() ?? '');
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
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
        <Components.Headers.ScreenHeader
          onPress={goBack}
          headerText={t('editProfile')}
        />
        <View style={staticStyle.innerContainer}>
          <Components.PickProfilePictureContainer
            getPicture={getPicture}
            pickImage={pickImage}
            changePhotoText={styles.changePhotoText}
          />
          <View style={staticStyle.inputContainer}>
            <Components.Inputs.CustomInput
              placeholder={t('name')}
              setValue={setUserName}
              value={name}
            />
            <View
              style={StyleSheet.flatten([
                staticStyle.disableInputContainer,
                styles.disableInputContainer,
              ])}
            >
              <Components.TextComponent
                family={'regular'}
                textStyle={StyleSheet.flatten([
                  staticStyle.placeHolder,
                  styles.text,
                ])}
                text={t('email')}
              />
              <Components.TextComponent
                family={'regular'}
                text={email}
                textStyle={StyleSheet.flatten([staticStyle.text, styles.text])}
              />
            </View>
            {profileData.role === 'consultant' && (
              <>
                <Components.Inputs.CustomInput
                  placeholder={t('yearsOfExperience')}
                  setValue={setExperience ?? (() => {})}
                  value={experience ?? ''}
                />
                <Components.Inputs.BioInputComponent
                  placeholder={t('bio')}
                  setValue={setBio}
                  value={bio}
                />
              </>
            )}
          </View>
        </View>
        <View style={staticStyle.button}>
          <Components.Buttons.PrimaryButton
            onPress={updateProfile}
            text={t('updateProfile')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
