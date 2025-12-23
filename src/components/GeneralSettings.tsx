import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../config/themes/themes';
import { appIcons } from '../config/icons/iconPath';
import { userDetailProps } from '../redux/features/userSlice';
import { MediumTextComponent } from './Text/MediumTextComponent';
import { SettingOptionsButton } from './Buttons/SettingsOptionsComponent';
import { staticStyle, createStyles } from '../screens/common/profile/styles';

type generalSettingsProps = {
  userData: userDetailProps;
  navigateToContactSupport: () => void;
};

export const GeneralSettings = (props: generalSettingsProps) => {
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
      <MediumTextComponent
        text={t('general')}
        textStyle={StyleSheet.flatten([
          staticStyle.optionTitle,
          styles.userEmail,
        ])}
      />
      <View
        style={StyleSheet.flatten([staticStyle.saperator, styles.saperator])}
      />
      <View style={staticStyle.options}>
        {props.userData.role === 'client' && (
          <>
            <SettingOptionsButton
              navigate={props.navigateToContactSupport}
              title={t('contactSupport')}
              icon={appIcons.ic_contactSupport}
            />
            <View
              style={StyleSheet.flatten([
                staticStyle.saperator,
                styles.saperator,
              ])}
            />
          </>
        )}
        <SettingOptionsButton
          navigate={() => {}}
          title={t('aboutUs')}
          icon={appIcons.ic_aboutUs}
        />
        <View
          style={StyleSheet.flatten([staticStyle.saperator, styles.saperator])}
        />
        <SettingOptionsButton
          navigate={() => {}}
          title={t('termsPrivacy')}
          icon={appIcons.ic_terms}
        />
      </View>
    </View>
  );
};
