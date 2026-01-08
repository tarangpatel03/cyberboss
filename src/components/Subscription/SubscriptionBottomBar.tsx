import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { staticStyle } from '@screens/client/Subscription/styles';
import { Config } from '@config/index';
import { Components } from '..';

type SubscriptionBottomBarPorps = {
  price: string | undefined;
  duration: string | undefined;
};

export const SubscriptionBottomBar = (props: SubscriptionBottomBarPorps) => {
  const { t } = useTranslation();
  return (
    <View style={staticStyle.bottomButton}>
      <View style={staticStyle.bottomLine}>
        <View style={staticStyle.horizontal}>
          <Components.Text.MediumTextComponent
            text={props.price ?? ''}
            textStyle={staticStyle.text20500}
          />
          <Components.Text.RegularTextComponent
            text={`/${props.duration?.slice(0, 2) ?? ''}`}
            textStyle={staticStyle.text16400}
          />
        </View>
        <View style={staticStyle.monthlyContainer}>
          <Components.Text.MediumTextComponent
            text={props.duration?.toUpperCase() ?? ''}
            textStyle={staticStyle.text12500}
          />
        </View>
      </View>
      <Components.Buttons.PrimaryButtonWithIcon
        onPress={() => {}}
        icon={Config.appIcons.ic_next}
        text={t('subscribeNow')}
        buttonStyle={staticStyle.button}
        textStyle={staticStyle.text16500}
      />
      <View style={staticStyle.lastLine}>
        <Components.Text.RegularTextComponent
          text={t('termsOfUse')}
          textStyle={staticStyle.text12500}
        />
        <FastImage source={Config.appIcons.ic_dot} />
        <Components.Text.RegularTextComponent
          text={t('privacyPolicy')}
          textStyle={staticStyle.text12500}
        />
      </View>
    </View>
  );
};
