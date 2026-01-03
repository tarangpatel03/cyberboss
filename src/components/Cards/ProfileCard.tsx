import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Theme } from '../../config/themes/themes';
import { appIcons } from '../../config/icons/iconPath';
import { UserDetailProps } from '../../redux/features/userSlice';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MediumTextComponent } from '../Text/MediumText';
import { RegularTextComponent } from '../Text/RegularText';
import { SettingOptionsButton } from '../Buttons/SettingsButton';
import { staticStyle, createStyles } from '../../screens/common/Profile/styles';
import { useState } from 'react';
import { appImages } from '../../config/images/imagePath';

type ProfileCardProps = {
  userData: UserDetailProps;
  navigateToEditProfile: () => void;
  getPicture: () => number | { uri: string } | undefined;
};

export const ProfileCard = (props: ProfileCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [profileImageError, setProfileImageError] = useState<boolean>(false);
  return (
    <View style={staticStyle.profileCard}>
      <View
        style={StyleSheet.flatten([
          props.userData.role === 'consultant'
            ? staticStyle.consultantUserCard
            : staticStyle.userDetailCard,
          styles.userDetailCard,
        ])}
      >
        <FastImage
          source={
            profileImageError
              ? appImages.img_defaultProfile
              : props.getPicture()
          }
          style={staticStyle.profileImage}
          onError={() => setProfileImageError(true)}
        />
        <View style={staticStyle.userNameCard}>
          <View>
            <MediumTextComponent
              text={props.userData.name ?? 'user'}
              textStyle={StyleSheet.flatten([
                staticStyle.userName,
                styles.userName,
              ])}
            />
            <RegularTextComponent
              text={props.userData.email ?? ''}
              textStyle={StyleSheet.flatten([
                staticStyle.userEmail,
                styles.userEmail,
              ])}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.navigateToEditProfile}
            style={StyleSheet.flatten([
              staticStyle.editProfile,
              styles.editProfile,
            ])}
          >
            <FastImage source={appIcons.ic_pen} style={staticStyle.editIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {props.userData.role === 'consultant' && (
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
          <SettingOptionsButton
            navigate={() => {}}
            title={t('expertise')}
            icon={appIcons.ic_briefCase}
          />
        </View>
      )}
    </View>
  );
};
