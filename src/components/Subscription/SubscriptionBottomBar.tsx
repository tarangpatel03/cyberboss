import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { appIcons } from '@config/icons/iconPath';
import { MediumTextComponent } from '@components/Text/MediumText';
import { RegularTextComponent } from '@components/Text/RegularText';
import { staticStyle } from '@screens/client/Subscription/styles';
import { PrimaryButtonWithIconComponent } from '@components/Buttons/PrimaryButtonWithIcon';

export const SubscriptionBottomBar = () => {
  const { t } = useTranslation();
  return (
    <View style={staticStyle.bottomButton}>
      <View style={staticStyle.bottomLine}>
        <View style={staticStyle.horizontal}>
          <MediumTextComponent
            text={t('d99')}
            textStyle={staticStyle.text20500}
          />
          <RegularTextComponent
            text={t('perMo')}
            textStyle={staticStyle.text16400}
          />
        </View>
        <View style={staticStyle.monthlyContainer}>
          <MediumTextComponent
            text={t('monthly')}
            textStyle={staticStyle.text12500}
          />
        </View>
      </View>
      <PrimaryButtonWithIconComponent
        onPress={() => {}}
        icon={appIcons.ic_next}
        text={t('subscribeNow')}
        buttonStyle={staticStyle.button}
        textStyle={staticStyle.text16500}
      />
      <View style={staticStyle.lastLine}>
        <RegularTextComponent
          text={t('termsOfUse')}
          textStyle={staticStyle.text12500}
        />
        <FastImage source={appIcons.ic_dot} />
        <RegularTextComponent
          text={t('privacyPolicy')}
          textStyle={staticStyle.text12500}
        />
      </View>
    </View>
  );
};
