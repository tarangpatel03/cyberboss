import { staticStyle, createStyles } from '../../screens/client/Home/styles';
import { useTheme } from '@shopify/restyle';
import FastImage from 'react-native-fast-image';
import { Theme } from '../../config/themes/themes';
import { appColors } from '../../config/colors/colors';
import { appIcons } from '../../config/icons/iconPath';
import { appImages } from '../../config/images/imagePath';
import LinearGradient from 'react-native-linear-gradient';
import { SemiBoldTextComponent } from '../Text/SemiBoldTextComponent';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/store';
import { getProfilePicture } from '../../utils/extractURI/extractImageURI';

type topBarComponentProps = {
  isSubscriber: boolean;
  onPressProfile: () => void;
  onPressSubscription: () => void;
  onPressNotification: () => void;
};

export const TopBarComponent = (props: topBarComponentProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { name, profilePicture } = useSelector(
    (state: rootState) => state.user.userData,
  );
  const [profileImageError, setProfileImageError] = useState<boolean>(false);

  return (
    <LinearGradient
      style={staticStyle.topBar}
      colors={[appColors.app_3554FF26, appColors.app_3554FF00]}
    >
      <View style={staticStyle.profileInfo}>
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPressProfile}>
          <View style={staticStyle.profilePictureName}>
            <FastImage
              source={
                profileImageError
                  ? appImages.img_defaultProfile
                  : getProfilePicture(profilePicture)
              }
              style={staticStyle.image}
              onError={() => setProfileImageError(true)}
            />
            <SemiBoldTextComponent
              text={name}
              textStyle={StyleSheet.flatten([
                staticStyle.profileText,
                styles.profileText,
              ])}
            />
          </View>
        </TouchableOpacity>
        <View style={staticStyle.profilePictureName}>
          {props.isSubscriber ? (
            <FastImage
              source={appImages.img_proUser}
              style={staticStyle.proUser}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={props.onPressSubscription}
            >
              <FastImage
                source={appImages.img_freeUser}
                style={staticStyle.proUser}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onPressNotification}
          >
            <FastImage
              tintColor={theme.colors.textPrimary}
              source={appIcons.ic_notificationBell}
              style={staticStyle.bellButton}
            />
            <View
              style={StyleSheet.flatten([
                staticStyle.notificationDot,
                styles.background,
              ])}
            >
              <View style={staticStyle.notificationDotInner} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};
