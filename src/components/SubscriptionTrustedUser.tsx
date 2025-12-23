import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { appColors } from '../config/colors/colors';
import LinearGradient from 'react-native-linear-gradient';
import { MediumTextComponent } from './Text/MediumTextComponent';
import { staticStyle } from '../screens/client/Subscription/styles';
import { SemiBoldTextComponent } from './Text/SemiBoldTextComponent';
import { linearGradientDirection } from '../screens/client/Subscription';

export const SubscriptionTrustedUser = (props: linearGradientDirection) => {
  const { t } = useTranslation();
  return (
    <View style={staticStyle.horizontal8}>
      <MediumTextComponent
        text={t('kyoraIQ')}
        textStyle={staticStyle.text24500}
      />
      <LinearGradient
        end={props.end}
        start={props.start}
        style={staticStyle.proContainer}
        colors={[
          appColors.app_FFD84D,
          appColors.app_FFE893,
          appColors.app_FFD84D,
        ]}
      >
        <SemiBoldTextComponent
          text={t('pro')}
          textStyle={staticStyle.text14600}
        />
      </LinearGradient>
    </View>
  );
};
