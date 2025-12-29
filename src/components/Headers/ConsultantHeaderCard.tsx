import {
  createStyles,
  staticStyle,
} from '../../screens/consultant/home/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Theme } from '../../config/themes/themes';
import { appColors } from '../../config/colors/colors';
import { appIcons } from '../../config/icons/iconPath';
import LinearGradient from 'react-native-linear-gradient';
import { BoldTextComponent } from '../Text/BoldTextComponent';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { SemiBoldTextComponent } from '../Text/SemiBoldTextComponent';
import { useState } from 'react';
import { appImages } from '../../config/images/imagePath';
import RadialGradient from 'react-native-radial-gradient';
import { width } from '../../config/constants/variables';
import { tConsultantHomeModel } from '../../models/formattedAPI/tHome';
import { tProfileModel } from '../../models/formattedAPI/tProfile';

type consultantHeaderCardProps = {
  profileData: tProfileModel;
  userData: tConsultantHomeModel;
  navigateToNotification: () => void;
};

export const ConsultantHeaderCard = (props: consultantHeaderCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [profilePictureError, setProfilePictureError] =
    useState<boolean>(false);

  return (
    <RadialGradient
      radius={200}
      style={staticStyle.gradientCard}
      colors={[appColors.app_1E3D92, appColors.app_1D2742]}
      center={[width / 2, 300]}
    >
      <View style={staticStyle.container}>
        <View
          style={StyleSheet.flatten([staticStyle.row, staticStyle.paddingTop])}
        >
          <View style={staticStyle.row}>
            <View style={staticStyle.image}>
              <FastImage
                source={
                  profilePictureError
                    ? appImages.img_defaultProfile
                    : // : appImages.img_defaultProfile
                      props.profileData.profilePicture
                }
                style={staticStyle.image}
                onError={() => setProfilePictureError(true)}
              />
            </View>
            <SemiBoldTextComponent
              text={props.profileData.name}
              textStyle={StyleSheet.flatten([
                staticStyle.name,
                styles.whiteText,
              ])}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.navigateToNotification}
          >
            <FastImage
              source={appIcons.ic_notificationBell}
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
              <BoldTextComponent
                text={`$${props.userData.totalEarnings}`}
                textStyle={StyleSheet.flatten([
                  staticStyle.countText,
                  styles.whiteText,
                ])}
              />
              <RegularTextComponent
                text="Total Earnings"
                textStyle={StyleSheet.flatten([
                  staticStyle.subtitleText,
                  styles.textSecondary,
                ])}
              />
            </View>
            <LinearGradient
              style={staticStyle.verticalVaperator}
              colors={[
                appColors.app_FFFFFF40,
                appColors.app_FFFFFF00,
                appColors.app_FFFFFF40,
              ]}
            />
            <View style={staticStyle.counter}>
              <View style={staticStyle.directionRow}>
                <BoldTextComponent
                  text={`${props.userData.averageRating}`}
                  textStyle={StyleSheet.flatten([
                    staticStyle.countText,
                    styles.whiteText,
                  ])}
                />
                <FastImage
                  source={appIcons.ic_ratingStarFill}
                  style={staticStyle.star}
                />
              </View>
              <RegularTextComponent
                text="Avg. Rating"
                textStyle={StyleSheet.flatten([
                  staticStyle.subtitleText,
                  styles.textSecondary,
                ])}
              />
            </View>
          </View>
          <LinearGradient
            style={staticStyle.saperator}
            start={{
              x: 0,
              y: 0.5,
            }}
            end={{
              x: 1,
              y: 0.5,
            }}
            colors={[
              appColors.app_FFFFFF40,
              appColors.app_FFFFFF00,
              appColors.app_FFFFFF40,
            ]}
          />
          <View
            style={StyleSheet.flatten([
              staticStyle.row,
              staticStyle.transparantBG,
              styles.transparantBG,
            ])}
          >
            <View style={staticStyle.directionRow}>
              <FastImage
                source={appIcons.ic_wallet}
                style={staticStyle.walletIcon}
              />
              <RegularTextComponent
                text={t('walletBalance')}
                textStyle={StyleSheet.flatten([
                  staticStyle.viewAllText,
                  styles.whiteText,
                ])}
              />
            </View>
            <MediumTextComponent
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
