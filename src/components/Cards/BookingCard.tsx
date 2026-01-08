import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import {Utils} from '@utils/index';
import { Components } from '@components/index';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TBookingHistoryModel } from '@models/formattedAPI/tBookings';
import { Config } from '@config/index';

type BookingCardProps = {
  onMessage: ({
    id,
    image,
    name,
    bookingId,
  }: {
    id: string;
    image: string | number | { uri: string } | undefined;
    name: string;
    bookingId: string;
  }) => void;
  data: TBookingHistoryModel;
  onMorePress: (x: number, y: number) => void;
  navigateToDetails: (id: string) => void;
};

export const BookingCard = memo((props: BookingCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const moreButtonRef = useRef<View>(null);
  const [imageError, setimageError] = useState<boolean>(false);

  const handleMorePress = () => {
    if (moreButtonRef.current) {
      moreButtonRef.current.measureInWindow((x, y, width, height) => {
        props.onMorePress(x, y + height);
      });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => props.navigateToDetails(props.data.id)}
      style={StyleSheet.flatten([staticStyle.container, styles.container])}
    >
      <View style={staticStyle.row}>
        <Components.Text.MediumTextComponent
          text={`${t('bookingId')}: ${props.data.bookingId}`}
          textStyle={StyleSheet.flatten([
            staticStyle.titleText,
            styles.secondaryText,
          ])}
        />
        <View
          style={StyleSheet.flatten([
            staticStyle.statusContainer,
            props.data.status === 'Completed' ? styles.greenBG : styles.redBG,
          ])}
        >
          <FastImage
            source={
              props.data.status === 'Completed'
                ? Config.appIcons.ic_completed
                : Config.appIcons.ic_inProgress
            }
            style={staticStyle.icon}
          />
          <Components.Text.MediumTextComponent
            text={props.data.status}
            textStyle={StyleSheet.flatten([
              staticStyle.tinyText,
              props.data.status === 'Completed'
                ? styles.greenText
                : styles.redText,
            ])}
          />
        </View>
      </View>
      <View
        style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
      />
      <View style={staticStyle.rowLine}>
        <FastImage
          source={
            imageError
              ? Config.appImages.img_defaultProfile
              : Utils.getProfilePicture(props.data.userProfilePicture)
          }
          onError={() => setimageError(true)}
          style={staticStyle.profileImage}
        />
        <View style={staticStyle.fullLengthView}>
          <Components.Text.MediumTextComponent
            text={props.data.userName}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              styles.primaryText,
            ])}
          />
          <Components.Text.RegularTextComponent
            text={`${props.data.hours}hr`}
            textStyle={StyleSheet.flatten([
              staticStyle.subtitleText,
              styles.secondaryText,
            ])}
          />
        </View>
        <Components.Text.MediumTextComponent
          text={`$${props.data.grandTotal}`}
          textStyle={StyleSheet.flatten([
            staticStyle.titleText,
            staticStyle.text,
            styles.primaryText,
          ])}
        />
      </View>
      <LinearGradient
        colors={Utils.getGradientColor(props.data.categoryName)}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={staticStyle.gradient}
      >
        <View
          style={StyleSheet.flatten([
            staticStyle.rowLine,
            staticStyle.padding8,
          ])}
        >
          <FastImage
            style={staticStyle.categoryIcon}
            resizeMode={FastImage.resizeMode.contain}
            source={Utils.getServiceImage(props.data.categoryName)}
          />
          <Components.Text.RegularTextComponent
            text={props.data.categoryName}
            textStyle={StyleSheet.flatten([
              staticStyle.subtitleText,
              styles.primaryText,
            ])}
          />
        </View>
      </LinearGradient>
      {props.data.status === 'In progress' && (
        <View style={staticStyle.rowLine}>
          <Components.Buttons.PrimaryButton
            onPress={() =>
              props.onMessage({
                bookingId: props.data.bookingId,
                id: props.data.userId,
                image: props.data.userProfilePicture,
                name: props.data.userName,
              })
            }
            text={t('message')}
            buttonStyle={StyleSheet.flatten([
              staticStyle.button,
              styles.button,
            ])}
            textStyle={StyleSheet.flatten([
              staticStyle.subtitleText,
              styles.primaryText,
            ])}
          />
          <Components.Buttons.CircularIconButton
            onPress={handleMorePress}
            buttonStyle={StyleSheet.flatten([
              staticStyle.iconButton,
              styles.button,
            ])}
            iconPath={Config.appIcons.ic_more}
            tintColor={theme.colors.textPrimary}
            iconStyle={staticStyle.moreIcon}
            ref={moreButtonRef}
          />
        </View>
      )}
    </TouchableOpacity>
  );
});

const staticStyle = StyleSheet.create({
  container: {
    borderRadius: Utils.normalize(12),
    borderWidth: 0.75,
    padding: Utils.normalize(12),
    gap: Utils.normalize(16, 'height'),
  },
  titleText: {
    fontSize: Utils.normalize(14),
    fontWeight: '500',
  },
  subtitleText: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  fullLengthView: {
    paddingLeft: Utils.normalize(2),
    gap: Utils.normalize(8),
    flex: 1,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    left: Utils.normalize(-12),
    width: '107.5%',
    borderWidth: 0.75,
  },
  text: {
    alignSelf: 'flex-end',
  },
  gradient: {
    borderRadius: Utils.normalize(8),
  },
  profileImage: {
    width: Utils.normalize(48),
    height: Utils.normalize(48),
    borderRadius: Utils.normalize(25),
    marginRight: Utils.normalize(8),
  },
  padding8: {
    padding: Utils.normalize(8),
  },
  rowLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
  iconButton: {
    marginLeft: Utils.normalize(8),
    width: Utils.normalize(45),
    height: Utils.normalize(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Utils.normalize(8),
  },
  moreIcon: {
    width: Utils.normalize(17),
    height: Utils.normalize(4),
  },
  statusContainer: {
    paddingVertical: Utils.normalize(6),
    paddingHorizontal: Utils.normalize(12),
    gap: Utils.normalize(6),
    borderRadius: Utils.normalize(24),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: Utils.normalize(14),
    height: Utils.normalize(14),
    borderRadius: Utils.normalize(10),
  },
  categoryIcon: {
    width: Utils.normalize(16),
    height: Utils.normalize(16),
    marginRight: Utils.normalize(12),
  },
  tinyText: {
    fontSize: Utils.normalize(12),
    fontWeight: '500',
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderPrimary,
    },
    secondaryText: {
      color: theme.colors.textSecondary,
    },
    primaryText: {
      color: theme.colors.textPrimary,
    },
    separator: {
      borderColor: theme.colors.borderPrimary,
    },
    redBG: {
      backgroundColor: theme.colors.pureTransparentOrange,
    },
    greenBG: {
      backgroundColor: theme.colors.pureTransparentGreen,
    },
    redText: {
      color: theme.colors.pureOrange,
    },
    greenText: {
      color: theme.colors.pureGreen,
    },
    button: {
      backgroundColor: theme.colors.borderPrimary,
    },
  });
