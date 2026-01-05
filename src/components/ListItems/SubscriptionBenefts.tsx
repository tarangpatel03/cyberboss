import { RegularTextComponent } from '@components/Text/RegularText';
import { appColors } from '@config/colors/colors';
import { appIcons } from '@config/icons/iconPath';
import { staticStyle } from '@screens/client/Subscription/styles';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

export const SubscriptionBenefits = ({ props }: { props: string }) => {
  const getGoldenGradient = () => {
    return [
      appColors.app_FFD84D12,
      appColors.app_FFE89312,
      appColors.app_FFD84D12,
    ];
  };

  const start = { x: 0, y: 0.5 };
  const end = { x: 1, y: 0.5 };

  return (
    <View style={staticStyle.horizontal8}>
      <LinearGradient
        colors={getGoldenGradient()}
        end={end}
        start={start}
        style={staticStyle.benefitImageContainer}
      >
        <FastImage
          source={appIcons.ic_calender2}
          style={staticStyle.energyIcon}
        />
      </LinearGradient>
      <RegularTextComponent
        text={props ?? ''}
        textStyle={staticStyle.text14400}
      />
    </View>
  );
};
