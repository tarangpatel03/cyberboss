import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { staticStyle } from '@screens/client/Subscription/styles';
import { linearGradientDirection } from '@screens/client/Subscription';
import FastImage from 'react-native-fast-image';
import { Utils } from '@utils/index';
import { Config } from '@config/index';
import { Components } from '@components/index';

type SubscriptionTrustedUserProps = {
  direction: linearGradientDirection;
  noOfUser: number | undefined;
  userImages: string[] | undefined;
};

export const SubscriptionTrustedUser = (
  props: SubscriptionTrustedUserProps,
) => {
  const { t } = useTranslation();
  return (
    <>
      <View style={staticStyle.horizontal8}>
        <Components.TextComponent
          family={'medium'}
          text={t('kyoraIQ')}
          textStyle={staticStyle.text24500}
        />
        <LinearGradient
          end={props.direction.end}
          start={props.direction.start}
          style={staticStyle.proContainer}
          colors={[
            Config.appColors.app_FFD84D,
            Config.appColors.app_FFE893,
            Config.appColors.app_FFD84D,
          ]}
        >
          <Components.TextComponent
            family={'semiBold'}
            text={t('pro')}
            textStyle={staticStyle.text14600}
          />
        </LinearGradient>
      </View>
      <View style={staticStyle.trustedUserContainer}>
        <LinearGradient
          colors={['#3554FF', '#111D5F']}
          end={props.direction.end}
          start={props.direction.start}
          style={staticStyle.features}
        >
          <FastImage
            source={Config.appIcons.ic_proFeatures}
            style={staticStyle.featuresIcon}
          />
          <Components.TextComponent
            family={'regular'}
            text={t('unlockExpertLedWorkshops')}
            textStyle={staticStyle.text14400}
          />
        </LinearGradient>
        {props.noOfUser !== 0 && (
          <View style={staticStyle.horizontal12}>
            <View style={[staticStyle.horizontalUsers]}>
              <FastImage
                source={Utils.getProfilePicture(props.userImages?.[0] ?? '')}
                style={staticStyle.trustedUserImage}
              />
              <FastImage
                source={Utils.getProfilePicture(props.userImages?.[1] ?? '')}
                style={StyleSheet.flatten([
                  staticStyle.trustedUserImage,
                  staticStyle.trustedUserImage2,
                ])}
              />
              <FastImage
                source={Utils.getProfilePicture(props.userImages?.[2] ?? '')}
                style={StyleSheet.flatten([
                  staticStyle.trustedUserImage,
                  staticStyle.trustedUserImage3,
                ])}
              />
              <FastImage
                source={Utils.getProfilePicture(props.userImages?.[3] ?? '')}
                style={StyleSheet.flatten([
                  staticStyle.trustedUserImage,
                  staticStyle.trustedUserImage4,
                ])}
              />
              <FastImage
                source={Utils.getProfilePicture(props.userImages?.[4] ?? '')}
                style={StyleSheet.flatten([
                  staticStyle.trustedUserImage,
                  staticStyle.trustedUserImage5,
                ])}
              />
            </View>
            <Components.TextComponent
              family={'regular'}
              text={`Trusted By ${props.noOfUser ?? 0} Users`}
              textStyle={staticStyle.text14400}
            />
          </View>
        )}
      </View>
    </>
  );
};
