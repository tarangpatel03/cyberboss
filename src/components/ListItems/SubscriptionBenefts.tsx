import { Components } from '@components/index';
import { Config } from '@config/index';
import { staticStyle } from '@screens/client/Subscription/styles';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

export const SubscriptionBenefits = ({ props }: { props: string }) => {
  const getGoldenGradient = () => {
    return [
      Config.appColors.app_FFD84D12,
      Config.appColors.app_FFE89312,
      Config.appColors.app_FFD84D12,
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
          source={Config.appIcons.ic_calender2}
          style={staticStyle.energyIcon}
        />
      </LinearGradient>
      <Components.TextComponent
        family={'regular'}
        text={props ?? ''}
        textStyle={staticStyle.text14400}
      />
    </View>
  );
};
