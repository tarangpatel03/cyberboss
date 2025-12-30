import { useTheme } from '@shopify/restyle';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Theme } from '../../config/themes/themes';
import { appIcons } from '../../config/icons/iconPath';
import { appImages } from '../../config/images/imagePath';
import { ConsultantInfoBadge } from '../ConsultantInfoBadge';
import { formatBooking } from '../../utils/format/formatDate';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import {
  createStyles,
  staticStyle,
} from '../../screens/client/ConsultantProfile/styles';
import { tConsultantDetailsModel } from '../../models/formattedAPI/tConsultant';
import { getProfilePicture } from '../../utils/extractURI/extractImageURI';
import { useState } from 'react';

type consultantProfileHeaderProps = {
  data: tConsultantDetailsModel;
};

export const ConsultantProfileHeader = (
  props: consultantProfileHeaderProps,
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
              ? appImages.img_defaultProfile
              : getProfilePicture(props.data.profilePicture)
          }
          onError={() => setProfilePctureError(true)}
          style={staticStyle.image}
        />
        <View>
          <MediumTextComponent
            text={props.data.name}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              styles.primaryText,
            ])}
          />
          <View style={staticStyle.rowLine}>
            <RegularTextComponent
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
        <ConsultantInfoBadge
          imagePath={appIcons.ic_cash}
          text={`$${Number(props.data.rate)}/hr`}
        />
        <ConsultantInfoBadge
          imagePath={appIcons.ic_experience}
          text={`${props.data.experienceYear}y Exp.`}
        />
        {props.data.bookingsCount > 0 && (
          <ConsultantInfoBadge
            imagePath={appIcons.ic_check}
            text={formatBooking(props.data.bookingsCount)}
          />
        )}
      </View>
    </View>
  );
};
