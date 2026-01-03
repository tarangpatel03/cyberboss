import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { appColors } from '../../config/colors/colors';
import { appIcons } from '../../config/icons/iconPath';
import LinearGradient from 'react-native-linear-gradient';
import { MediumTextComponent } from '../Text/MediumText';
import { RegularTextComponent } from '../Text/RegularText';
import { staticStyle } from '../../screens/client/Subscription/styles';
import { linearGradientDirection } from '../../screens/client/Subscription';

export const SubscriptionBenefitsCard = (props: linearGradientDirection) => {
  const { t } = useTranslation();

  const getGoldenGradient = () => {
    return [
      appColors.app_FFD84D12,
      appColors.app_FFE89312,
      appColors.app_FFD84D12,
    ];
  };

  return (
    <LinearGradient
      end={props.end}
      start={props.start}
      style={staticStyle.benefitContainer}
      colors={[
        appColors.app_202126,
        appColors.app_20212680,
        appColors.app_202126,
      ]}
    >
      <View style={staticStyle.benefitLine}>
        <FastImage source={appIcons.ic_energy} style={staticStyle.energyIcon} />
        <MediumTextComponent
          text={t('benefits')}
          textStyle={StyleSheet.flatten([
            staticStyle.text16500,
            staticStyle.latterSpace,
          ])}
        />
        <FastImage source={appIcons.ic_energy} style={staticStyle.energyIcon} />
      </View>
      <LinearGradient
        colors={[
          appColors.app_FFFFFF00,
          appColors.app_FFFFFF40,
          appColors.app_FFFFFF00,
        ]}
        end={props.end}
        start={props.start}
        style={staticStyle.separator}
      />
      <View style={staticStyle.benefits}>
        <View style={staticStyle.horizontal8}>
          <LinearGradient
            colors={getGoldenGradient()}
            end={props.end}
            start={props.start}
            style={staticStyle.benefitImageContainer}
          >
            <FastImage
              source={appIcons.ic_calender2}
              style={staticStyle.energyIcon}
            />
          </LinearGradient>
          <RegularTextComponent
            text={t('workshopsEveryMondayThroughSaturday')}
            textStyle={staticStyle.text14400}
          />
        </View>
        <View style={staticStyle.horizontal8}>
          <LinearGradient
            colors={getGoldenGradient()}
            end={props.end}
            start={props.start}
            style={staticStyle.benefitImageContainer}
          >
            <FastImage
              source={appIcons.ic_chat}
              style={staticStyle.energyIcon}
            />
          </LinearGradient>
          <RegularTextComponent
            text={t('realTimeQAwithExperts')}
            textStyle={staticStyle.text14400}
          />
        </View>
        <View style={staticStyle.horizontal8}>
          <LinearGradient
            colors={getGoldenGradient()}
            end={props.end}
            start={props.start}
            style={staticStyle.benefitImageContainer}
          >
            <FastImage
              source={appIcons.ic_book}
              style={staticStyle.energyIcon}
            />
          </LinearGradient>
          <RegularTextComponent
            text={t('threatDetectionCareerGrowthToolsMore')}
            textStyle={staticStyle.text14400}
          />
        </View>
      </View>
    </LinearGradient>
  );
};
