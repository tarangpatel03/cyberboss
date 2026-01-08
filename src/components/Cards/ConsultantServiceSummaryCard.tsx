import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  staticStyle,
  createStyles,
} from '@screens/client/BookingDetails/styles';
import FastImage from 'react-native-fast-image';
import { Components } from '@components/index';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { TConsultantDetailsModel } from '@models/formattedAPI/tConsultant';
import { Utils } from '@utils/index';
import { Config } from '@config/index';

type ConsultantServiceSummaryCardProps = {
  consultantData: TConsultantDetailsModel;
  type: string;
  hrBook: number;
  setHrBook: Dispatch<SetStateAction<number>>;
  total: number;
  reduceHr: () => void;
};

export const ConsultantServiceSummaryCard = (
  props: ConsultantServiceSummaryCardProps,
) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={StyleSheet.flatten([staticStyle.card, styles.bgPrimary])}>
      <Components.TextComponent
        family={'medium'}
        text={t('serviceConsultant')}
        textStyle={StyleSheet.flatten([
          staticStyle.titleText,
          styles.textSecondary,
        ])}
      />
      <View
        style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
      />
      <View style={staticStyle.consultantProfile}>
        <FastImage
          source={
            props.consultantData.profilePicture
              ? {
                  uri: props.consultantData.profilePicture,
                }
              : Config.appImages.img_defaultProfile
          }
          style={staticStyle.image}
        />
        <View style={staticStyle.profileName}>
          <Components.TextComponent
            family={'medium'}
            text={props.consultantData.name}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              styles.textPrimary,
            ])}
          />
          <Components.TextComponent
            family={'regular'}
            text={`$${props.total}`}
            textStyle={StyleSheet.flatten([
              staticStyle.subtitleText,
              staticStyle.rightShift,
              styles.textSecondary,
            ])}
          />
        </View>
        <View
          style={StyleSheet.flatten([staticStyle.counter, styles.separator])}
        >
          <Components.Buttons.CircularIconButton
            buttonStyle={staticStyle.counterButton}
            iconPath={Config.appIcons.ic_minus}
            iconStyle={staticStyle.minusIcon}
            onPress={props.reduceHr}
          />
          <Components.TextComponent
            family={'semiBold'}
            text={`${props.hrBook}h`}
            textStyle={StyleSheet.flatten([
              staticStyle.counterText,
              styles.textSecondary,
            ])}
          />
          <Components.Buttons.CircularIconButton
            buttonStyle={staticStyle.counterButton}
            iconPath={Config.appIcons.ic_plus}
            iconStyle={staticStyle.plusIcon}
            onPress={() => props.setHrBook(prev => prev + 1)}
          />
        </View>
      </View>
      <LinearGradient
        colors={Utils.getGradientColor(props.type)}
        start={{
          x: 0,
          y: 0.5,
        }}
        end={{
          x: 1,
          y: 0.5,
        }}
        style={staticStyle.serviceContainer}
      >
        <FastImage
          source={Utils.getServiceImage(props.type)}
          style={staticStyle.typeIcon}
        />
        <Components.TextComponent
          family={'regular'}
          text={props.type}
          textStyle={StyleSheet.flatten([
            staticStyle.subtitleText,
            styles.textSecondary,
          ])}
        />
      </LinearGradient>
    </View>
  );
};
