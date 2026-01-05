import { useTranslation } from 'react-i18next';
import { View, StyleSheet, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { appColors } from '@config/colors/colors';
import { appIcons } from '@config/icons/iconPath';
import LinearGradient from 'react-native-linear-gradient';
import { MediumTextComponent } from '@components/Text/MediumText';
import { staticStyle } from '@screens/client/Subscription/styles';
import { SubscriptionBenefits } from '@components/ListItems/SubscriptionBenefts';

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
        appColors.app_20212680,
        appColors.app_202126,
        appColors.app_20212680,
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
          appColors.app_FFFFFF40,
          appColors.app_FFFFFF00,
          appColors.app_FFFFFF40,
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
        renderItem={({ item }) => <SubscriptionBenefits props={item} />}
      />
    </LinearGradient>
  );
};
