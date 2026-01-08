import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Theme } from '@config/themes/themes';
import { UserDetailProps } from '@redux/features/userSlice';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Components } from '@components/index';
import { staticStyle, createStyles } from '@screens/common/Profile/styles';
import { useState } from 'react';
import { Config } from '@config/index';

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
              ? Config.appImages.img_defaultProfile
              : props.getPicture()
              ? props.getPicture()
              : Config.appImages.img_defaultProfile
          }
          style={staticStyle.profileImage}
          onError={() => setProfileImageError(true)}
        />
        <View style={staticStyle.userNameCard}>
          <View>
            <Components.Text.MediumTextComponent
              text={props.userData.name ?? 'user'}
              textStyle={StyleSheet.flatten([
                staticStyle.userName,
                styles.userName,
              ])}
            />
            <Components.Text.RegularTextComponent
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
            <FastImage source={Config.appIcons.ic_pen} style={staticStyle.editIcon} />
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
          <Components.Buttons.SettingOptionsButton
            navigate={() => {}}
            title={t('expertise')}
            icon={Config.appIcons.ic_briefCase}
          />
        </View>
      )}
    </View>
  );
};
