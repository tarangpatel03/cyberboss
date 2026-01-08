import { useTheme } from '@shopify/restyle';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Theme } from '@config/themes/themes';
import { Components } from '@components/index';
import {
  createStyles,
  staticStyle,
} from '@screens/client/ConsultantProfile/styles';
import { TConsultantDetailsModel } from '@models/formattedAPI/tConsultant';
import { useState } from 'react';
import { Utils } from '@utils/index';
import { Config } from '@config/index';

type ConsultantProfileHeaderProps = {
  data: TConsultantDetailsModel;
};

export const ConsultantProfileHeader = (
  props: ConsultantProfileHeaderProps,
) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [profilePictureError, setProfilePctureError] = useState<boolean>(false);

  return (
    <View style={staticStyle.profileContainer}>
      <View
        style={StyleSheet.flatten([staticStyle.rowLine, staticStyle.titleLine])}
      >
        <FastImage
          source={
            profilePictureError
              ? Config.appImages.img_defaultProfile
              : Utils.getProfilePicture(props.data.profilePicture)
          }
          onError={() => setProfilePctureError(true)}
          style={staticStyle.image}
        />
        <View>
          <Components.TextComponent
            family={'medium'}
            text={props.data.name}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              styles.primaryText,
            ])}
          />
          <View style={staticStyle.rowLine}>
            <Components.TextComponent
              family={'regular'}
              text={props.data.expertises.at(0)?.name || ''}
              textStyle={StyleSheet.flatten([
                staticStyle.subTitleText,
                staticStyle.leftMoveText,
                styles.secondaryText,
              ])}
            />
          </View>
        </View>
      </View>
      <View style={StyleSheet.flatten([staticStyle.rowLine, staticStyle.line])}>
        <Components.ConsultantInfoBadge
          imagePath={Config.appIcons.ic_cash}
          text={`$${Number(props.data.rate)}/hr`}
        />
        <Components.ConsultantInfoBadge
          imagePath={Config.appIcons.ic_experience}
          text={`${props.data.experienceYear}y Exp.`}
        />
        {props.data.bookingsCount > 0 && (
          <Components.ConsultantInfoBadge
            imagePath={Config.appIcons.ic_check}
            text={Utils.formatBooking(props.data.bookingsCount)}
          />
        )}
      </View>
    </View>
  );
};
