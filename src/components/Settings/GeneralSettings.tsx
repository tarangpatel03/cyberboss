import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { createStyles, staticStyle } from '@screens/common/Profile/styles';
import { UserDetailProps } from '@redux/features/userSlice';
import { Components } from '@components/index';
import { Theme } from '@config/themes/themes';
import { Config } from '@config/index';

type GeneralSettingsProps = {
  userData: UserDetailProps;
  navigateToContactSupport: () => void;
};

export const GeneralSettings = (props: GeneralSettingsProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View
      style={StyleSheet.flatten([
        props.userData.role === 'consultant'
          ? staticStyle.consultantOptionsCard
          : staticStyle.optionsCard,
        styles.utilCard,
      ])}
    >
      <Components.TextComponent
        family={'medium'}
        text={t('general')}
        textStyle={StyleSheet.flatten([
          staticStyle.optionTitle,
          styles.userEmail,
        ])}
      />
      <View
        style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
      />
      <View style={staticStyle.options}>
        {props.userData.role === 'client' && (
          <>
            <Components.Buttons.SettingOptionsButton
              navigate={props.navigateToContactSupport}
              title={t('contactSupport')}
              icon={Config.appIcons.ic_contactSupport}
            />
            <View
              style={StyleSheet.flatten([
                staticStyle.separator,
                styles.separator,
              ])}
            />
          </>
        )}
        <Components.Buttons.SettingOptionsButton
          navigate={() => {}}
          title={t('aboutUs')}
          icon={Config.appIcons.ic_aboutUs}
        />
        <View
          style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
        />
        <Components.Buttons.SettingOptionsButton
          navigate={() => {}}
          title={t('termsPrivacy')}
          icon={Config.appIcons.ic_terms}
        />
      </View>
    </View>
  );
};
