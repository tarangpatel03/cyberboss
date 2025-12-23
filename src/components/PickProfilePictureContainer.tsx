import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { MediumTextComponent } from './Text/MediumTextComponent';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { staticStyle } from '../screens/common/EditProfile/styles';

type pickPrifilePictureContainerProps = {
  pickImage: () => void;
  changePhotoText?: object;
  getPicture: () => number | { uri: string } | undefined;
};

export const PickPrifilePictureContainer = (
  props: pickPrifilePictureContainerProps,
) => {
  const { t } = useTranslation();
  return (
    <View style={staticStyle.profilePictureContainer}>
      <FastImage source={props.getPicture()} style={staticStyle.profileImage} />
      <TouchableOpacity onPress={props.pickImage} activeOpacity={0.7}>
        <MediumTextComponent
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
