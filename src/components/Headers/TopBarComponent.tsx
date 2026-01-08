import { staticStyle, createStyles } from '@screens/client/Home/styles';
import { useTheme } from '@shopify/restyle';
import FastImage from 'react-native-fast-image';
import { Theme } from '@config/themes/themes';
import LinearGradient from 'react-native-linear-gradient';
import { Components } from '@components/index';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { Utils } from '@utils/index';
import { Config } from '@config/index';

type TopBarComponentProps = {
  isSubscriber: boolean;
  onPressProfile: () => void;
  onPressSubscription: () => void;
  onPressNotification: () => void;
};

export const TopBarHeader = (props: TopBarComponentProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { name, profilePicture } = useSelector(
    (state: RootState) => state.user.userData,
  );
  const [profileImageError, setProfileImageError] = useState<boolean>(false);

  return (
    <LinearGradient
      style={staticStyle.topBar}
      colors={[Config.appColors.app_3554FF26, Config.appColors.app_3554FF00]}
    >
      <View style={staticStyle.profileInfo}>
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPressProfile}>
          <View style={staticStyle.profilePictureName}>
            <FastImage
              source={
                profileImageError
                  ? Config.appImages.img_defaultProfile
                  : profilePicture
                  ? Utils.getProfilePicture(profilePicture)
                  : Config.appImages.img_defaultProfile
              }
              style={staticStyle.image}
              onError={() => setProfileImageError(true)}
            />
            <Components.Text.SemiBoldTextComponent
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
              source={Config.appImages.img_proUser}
              style={staticStyle.proUser}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={props.onPressSubscription}
            >
              <FastImage
                source={Config.appImages.img_freeUser}
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
              source={Config.appIcons.ic_notificationBell}
              style={staticStyle.bellButton}
            />
            {/* <View
              style={StyleSheet.flatten([
                staticStyle.notificationDot,
                styles.background,
              ])}
            >
              <View style={staticStyle.notificationDotInner} />
            </View> */}
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};
