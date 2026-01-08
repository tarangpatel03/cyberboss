import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { staticStyle } from '@screens/common/EditProfile/styles';
import { useState } from 'react';
import { Config } from '@config/index';
import { Components } from '@components/index';

type PickProfilePictureContainerProps = {
  pickImage: () => void;
  changePhotoText?: object;
  getPicture: () => number | { uri: string } | undefined;
};

export const PickProfilePictureContainer = (
  props: PickProfilePictureContainerProps,
) => {
  const { t } = useTranslation();
  const [profilePictureError, setProfilePictureError] =
    useState<boolean>(false);

  return (
    <View style={staticStyle.profilePictureContainer}>
      <FastImage
        source={
          profilePictureError
            ? Config.appImages.img_defaultProfile
            : props.getPicture()
        }
        onError={() => setProfilePictureError(true)}
        style={staticStyle.profileImage}
      />
      <TouchableOpacity onPress={props.pickImage} activeOpacity={0.7}>
        <Components.TextComponent
          family={'medium'}
          text={t('changePhoto')}
          textStyle={StyleSheet.flatten([
            staticStyle.changePhotoText,
            props.changePhotoText,
          ])}
        />
      </TouchableOpacity>
    </View>
  );
};
