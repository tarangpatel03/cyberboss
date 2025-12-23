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

type topBarComponentProps = {
  name: string;
  picture: number | { uri: string } | undefined;
  isSubscriber: boolean;
  onPressProfile: () => void;
  onPressSubscription: () => void;
  onPressNotification: () => void;
};

export const TopBarComponent = ({
  name,
  picture,
  isSubscriber,
  onPressProfile,
  onPressSubscription,
  onPressNotification,
}: topBarComponentProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <LinearGradient
      style={staticStyle.topBar}
      colors={[appColors.app_3554FF26, appColors.app_3554FF00]}
    >
      <View style={staticStyle.profileInfo}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressProfile}>
          <View style={staticStyle.profilePictureName}>
            <FastImage source={picture} style={staticStyle.image} />
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
          {isSubscriber ? (
            <FastImage
              source={appImages.img_proUser}
              style={staticStyle.proUser}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <TouchableOpacity activeOpacity={0.7} onPress={onPressSubscription}>
              <FastImage
                source={appImages.img_freeUser}
                style={staticStyle.proUser}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity activeOpacity={0.7} onPress={onPressNotification}>
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
              <View style={staticStyle.notificatinDotInner} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};
