import { useTranslation } from 'react-i18next';
import { View, StyleSheet, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Config } from '@config/index';
import LinearGradient from 'react-native-linear-gradient';
import { staticStyle } from '@screens/client/Subscription/styles';
import { Components } from '@components/index';

export const SubscriptionBenefitsCard = ({
  benefits,
}: {
  benefits: string[] | undefined;
}) => {
  const { t } = useTranslation();

  const start = { x: 0, y: 0.5 };
  const end = { x: 1, y: 0.5 };

  return (
    <LinearGradient
      end={end}
      start={start}
      style={staticStyle.benefitContainer}
      colors={[
        Config.appColors.app_20212680,
        Config.appColors.app_202126,
        Config.appColors.app_20212680,
      ]}
    >
      <View style={staticStyle.benefitLine}>
        <FastImage source={Config.appIcons.ic_energy} style={staticStyle.energyIcon} />
        <Components.Text.MediumTextComponent
          text={t('benefits')}
          textStyle={StyleSheet.flatten([
            staticStyle.text16500,
            staticStyle.latterSpace,
          ])}
        />
        <FastImage source={Config.appIcons.ic_energy} style={staticStyle.energyIcon} />
      </View>
      <LinearGradient
        colors={[
          Config.appColors.app_FFFFFF40,
          Config.appColors.app_FFFFFF00,
          Config.appColors.app_FFFFFF40,
        ]}
        end={end}
        start={start}
        style={staticStyle.separator}
      />
      <FlatList
        data={benefits}
        scrollEnabled={false}
        contentContainerStyle={staticStyle.benefits}
        keyExtractor={item => item}
        renderItem={({ item }) => <Components.ListItems.SubscriptionBenefits props={item} />}
      />
    </LinearGradient>
  );
};
