import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../config/themes/themes';
import { appIcons } from '../config/icons/iconPath';
import { MediumTextComponent } from './Text/MediumTextComponent';
import { SettingOptionsButton } from './Buttons/SettingsOptionsComponent';
import { staticStyle, createStyles } from '../screens/common/profile/styles';
import { Dispatch, SetStateAction } from 'react';

type authOptionsProps = {
  role: 'client' | 'consultant';
  setLogOutVisible: Dispatch<SetStateAction<boolean>>;
  setDeleteVisible: Dispatch<SetStateAction<boolean>>;
};

export const AuthOptions = (props: authOptionsProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View
      style={StyleSheet.flatten([
        props.role === 'consultant'
          ? staticStyle.consultantOptionsCard
          : staticStyle.optionsCard,
        styles.utilCard,
      ])}
    >
      <MediumTextComponent
        text={t('account')}
        textStyle={StyleSheet.flatten([
          staticStyle.optionTitle,
          styles.userEmail,
        ])}
      />
      <View
        style={StyleSheet.flatten([staticStyle.saperator, styles.saperator])}
      />
      <View style={staticStyle.options}>
        <SettingOptionsButton
          navigate={() => props.setDeleteVisible(true)}
          title={t('deleteAccount')}
          icon={appIcons.ic_bin}
        />
        <View
          style={StyleSheet.flatten([staticStyle.saperator, styles.saperator])}
        />
        <SettingOptionsButton
          navigate={() => props.setLogOutVisible(true)}
          title={t('logout')}
          icon={appIcons.ic_logOut}
        />
      </View>
    </View>
  );
};
