import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Config } from '@config/index';
import { Components } from '@components/index';
import { staticStyle, createStyles } from '@screens/common/Profile/styles';
import { Dispatch, SetStateAction } from 'react';

type AuthOptionsProps = {
  role: 'client' | 'consultant';
  setLogOutVisible: Dispatch<SetStateAction<boolean>>;
  setDeleteVisible: Dispatch<SetStateAction<boolean>>;
};

export const AuthOptions = (props: AuthOptionsProps) => {
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
      <Components.TextComponent
        text={t('account')}
        family={'medium'}
        textStyle={StyleSheet.flatten([
          staticStyle.optionTitle,
          styles.userEmail,
        ])}
      />
      <View
        style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
      />
      <View style={staticStyle.options}>
        <Components.Buttons.SettingOptionsButton
          navigate={() => props.setDeleteVisible(true)}
          title={t('deleteAccount')}
          icon={Config.appIcons.ic_bin}
        />
        <View
          style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
        />
        <Components.Buttons.SettingOptionsButton
          navigate={() => props.setLogOutVisible(true)}
          title={t('logout')}
          icon={Config.appIcons.ic_logOut}
        />
      </View>
    </View>
  );
};
