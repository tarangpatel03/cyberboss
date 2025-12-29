import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  staticStyle,
  createStyles,
} from '../../screens/client/BookingDetails/styles';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import {
  getGradientColor,
  getServiceImage,
} from '../../utils/gradientColor/gradiantColor';
import FastImage from 'react-native-fast-image';
import { appIcons } from '../../config/icons/iconPath';
import { CircularIconButtonComponent } from '../Buttons/CircularIconButton';
import { SemiBoldTextComponent } from '../Text/SemiBoldTextComponent';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { appImages } from '../../config/images/imagePath';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../config/themes/themes';
import { IConsultantDetailsModel } from '../../models/formattedAPI/tConsultant';

type consultantServiceSummaryCardProps = {
  consultantData: IConsultantDetailsModel;
  type: string;
  hrBook: number;
  setHrBook: Dispatch<SetStateAction<number>>;
  total: number;
  reduceHr: () => void;
};

export const ConsultantServiceSummaryCard = (
  props: consultantServiceSummaryCardProps,
) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={StyleSheet.flatten([staticStyle.card, styles.bgPrimary])}>
      <MediumTextComponent
        text={t('serviceConsultant')}
        textStyle={StyleSheet.flatten([
          staticStyle.titleText,
          styles.textSecondary,
        ])}
      />
      <View
        style={StyleSheet.flatten([staticStyle.saperator, styles.saperator])}
      />
      <View style={staticStyle.consultantProfile}>
        <FastImage
          source={
            props.consultantData.profilePicture
              ? {
                  uri: props.consultantData.profilePicture,
                }
              : appImages.img_defaultProfile
          }
          style={staticStyle.image}
        />
        <View style={staticStyle.profileName}>
          <MediumTextComponent
            text={props.consultantData.name}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              styles.textPrimary,
            ])}
          />
          <RegularTextComponent
            text={`$${props.total}`}
            textStyle={StyleSheet.flatten([
              staticStyle.subtitleText,
              staticStyle.rightShift,
              styles.textSecondary,
            ])}
          />
        </View>
        <View
          style={StyleSheet.flatten([staticStyle.counter, styles.saperator])}
        >
          <CircularIconButtonComponent
            props={{
              buttonStyle: staticStyle.countorButton,
              iconPath: appIcons.ic_minus,
              iconStyle: staticStyle.minusIcon,
              onPress: props.reduceHr,
            }}
          />
          <SemiBoldTextComponent
            text={`${props.hrBook}h`}
            textStyle={StyleSheet.flatten([
              staticStyle.counterText,
              styles.textSecondary,
            ])}
          />
          <CircularIconButtonComponent
            props={{
              buttonStyle: staticStyle.countorButton,
              iconPath: appIcons.ic_plus,
              iconStyle: staticStyle.plusIcon,
              onPress: () => props.setHrBook(prev => prev + 1),
            }}
          />
        </View>
      </View>
      <LinearGradient
        colors={getGradientColor(props.type)}
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
          source={getServiceImage(props.type)}
          style={staticStyle.typeIcon}
        />
        <RegularTextComponent
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
