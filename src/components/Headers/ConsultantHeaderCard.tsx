import { createStyles, staticStyle } from '@screens/consultant/Home/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Theme } from '@config/themes/themes';
import LinearGradient from 'react-native-linear-gradient';
import { Components } from '@components/index';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import RadialGradient from 'react-native-radial-gradient';
import { width } from '@config/constants/variables';
import { TConsultantHomeModel } from '@models/formattedAPI/tHome';
import { TProfileModel } from '@models/formattedAPI/tProfile';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { Utils } from '@utils/index';
import { Config } from '@config/index';

type ConsultantHeaderCardProps = {
  profileData: TProfileModel;
  userData: TConsultantHomeModel;
  navigateToNotification: () => void;
  navigateToProfile: () => void;
};

export const ConsultantHeaderCard = (props: ConsultantHeaderCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { name, profilePicture } = useSelector(
    (state: RootState) => state.user.userData,
  );
  const [profilePictureError, setProfilePictureError] =
    useState<boolean>(false);

  return (
    <RadialGradient
      radius={200}
      style={staticStyle.gradientCard}
      colors={[Config.appColors.app_1E3D92, Config.appColors.app_1D2742]}
      center={[width / 2, 300]}
    >
      <View style={staticStyle.container}>
        <View
          style={StyleSheet.flatten([staticStyle.row, staticStyle.paddingTop])}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.navigateToProfile}
          >
            <View style={staticStyle.row}>
              <View style={staticStyle.image}>
                <FastImage
                  source={
                    profilePictureError
                      ? Config.appImages.img_defaultProfile
                      : profilePicture
                      ? Utils.getProfilePicture(profilePicture)
                      : Config.appImages.img_defaultProfile
                  }
                  style={staticStyle.image}
                  onError={() => setProfilePictureError(true)}
                />
              </View>
              <Components.Text.SemiBoldTextComponent
                text={name}
                textStyle={StyleSheet.flatten([
                  staticStyle.name,
                  styles.whiteText,
                ])}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.navigateToNotification}
          >
            <FastImage
              source={Config.appIcons.ic_notificationBell}
              style={staticStyle.bellButton}
              tintColor={theme.colors.pureWhite}
            />
          </TouchableOpacity>
        </View>
        <View
          style={StyleSheet.flatten([
            staticStyle.statusContainer,
            styles.statusContainer,
          ])}
        >
          <View style={staticStyle.centerRow}>
            <View style={staticStyle.counter}>
              <Components.Text.BoldTextComponent
                text={`$${props.userData.totalEarnings}`}
                textStyle={StyleSheet.flatten([
                  staticStyle.countText,
                  styles.whiteText,
                ])}
              />
              <Components.Text.RegularTextComponent
                text="Total Earnings"
                textStyle={StyleSheet.flatten([
                  staticStyle.subtitleText,
                  styles.textSecondary,
                ])}
              />
            </View>
            <LinearGradient
              style={staticStyle.verticalSeparator}
              colors={[
                Config.appColors.app_FFFFFF40,
                Config.appColors.app_FFFFFF00,
                Config.appColors.app_FFFFFF40,
              ]}
            />
            <View style={staticStyle.counter}>
              <View style={staticStyle.directionRow}>
                <Components.Text.BoldTextComponent
                  text={`${props.userData.averageRating}`}
                  textStyle={StyleSheet.flatten([
                    staticStyle.countText,
                    styles.whiteText,
                  ])}
                />
                <FastImage
                  source={Config.appIcons.ic_ratingStarFill}
                  style={staticStyle.star}
                />
              </View>
              <Components.Text.RegularTextComponent
                text="Avg. Rating"
                textStyle={StyleSheet.flatten([
                  staticStyle.subtitleText,
                  styles.textSecondary,
                ])}
              />
            </View>
          </View>
          <LinearGradient
            style={staticStyle.separator}
            start={{
              x: 0,
              y: 0.5,
            }}
            end={{
              x: 1,
              y: 0.5,
            }}
            colors={[
              Config.appColors.app_FFFFFF40,
              Config.appColors.app_FFFFFF00,
              Config.appColors.app_FFFFFF40,
            ]}
          />
          <View
            style={StyleSheet.flatten([
              staticStyle.row,
              staticStyle.transparentBG,
              styles.transparentBG,
            ])}
          >
            <View style={staticStyle.directionRow}>
              <FastImage
                source={Config.appIcons.ic_wallet}
                style={staticStyle.walletIcon}
              />
              <Components.Text.RegularTextComponent
                text={t('walletBalance')}
                textStyle={StyleSheet.flatten([
                  staticStyle.viewAllText,
                  styles.whiteText,
                ])}
              />
            </View>
            <Components.Text.MediumTextComponent
              text={`$${props.userData.walletBalance}`}
              textStyle={StyleSheet.flatten([
                staticStyle.viewAllText,
                styles.whiteText,
              ])}
            />
          </View>
        </View>
      </View>
    </RadialGradient>
  );
};
