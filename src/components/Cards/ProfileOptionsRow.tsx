import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Dispatch, SetStateAction } from 'react';
import { Theme } from '@config/themes/themes';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Components } from '@components/index';
import { staticStyle, createStyles } from '@screens/common/Profile/styles';
import { Config } from '@config/index';

type ProfileOptionsRowProps = {
  role: 'client' | 'consultant';
  navigateToChangePassword: () => void;
  setThemeModalVisible: Dispatch<SetStateAction<boolean>>;
};

export const ProfileOptionsRow = (props: ProfileOptionsRowProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View
      style={
        props.role === 'consultant'
          ? staticStyle.consultantUtilCardContainer
          : staticStyle.utilCardContainer
      }
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => props.setThemeModalVisible(true)}
        style={StyleSheet.flatten([staticStyle.utilCard, styles.utilCard])}
      >
        <View
          style={StyleSheet.flatten([
            staticStyle.editProfile,
            styles.iconContainer,
          ])}
        >
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            tintColor={theme.colors.textSecondary}
            source={Config.appIcons.ic_theme}
            style={staticStyle.icon}
          />
        </View>
        <Components.Text.RegularTextComponent
          text={t('appearance')}
          textStyle={StyleSheet.flatten([
            staticStyle.infoText,
            styles.userName,
          ])}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={props.navigateToChangePassword}
        style={StyleSheet.flatten([staticStyle.utilCard, styles.utilCard])}
      >
        <View
          style={StyleSheet.flatten([
            staticStyle.editProfile,
            styles.iconContainer,
          ])}
        >
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            tintColor={theme.colors.textSecondary}
            source={Config.appIcons.ic_changePass}
            style={staticStyle.icon}
          />
        </View>
        <Components.Text.RegularTextComponent
          text={t('changePassword')}
          textStyle={StyleSheet.flatten([
            staticStyle.infoText,
            styles.userName,
          ])}
        />
      </TouchableOpacity>
    </View>
  );
};
