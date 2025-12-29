import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { Theme } from '../config/themes/themes';
import { appIcons } from '../config/icons/iconPath';
import { View, StyleSheet, Platform } from 'react-native';
import { RegularTextComponent } from './Text/RegularTextComponent';
import { CircularIconButtonComponent } from './Buttons/CircularIconButton';
import { createStyles, staticStyle } from '../screens/common/auth/LogIn/styles';

type socialLogInProps = {
  getTintColor: () => string;
  handleGoogleLogIn: () => Promise<void> | void;
};

export const SocialLogIn = (props: socialLogInProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.socialLogin}>
      <View
        style={StyleSheet.flatten([
          staticStyle.continueWith,
          styles.continueWith,
        ])}
      >
        <View style={StyleSheet.flatten([staticStyle.line, styles.line])} />
        <RegularTextComponent
          text={t('continueWith')}
          textStyle={StyleSheet.flatten([
            staticStyle.subTitle,
            staticStyle.centerText,
            styles.subTitle,
            styles.centerText,
          ])}
        />
      </View>
      {Platform.OS === 'ios' ? (
        <View style={staticStyle.bottomButtons}>
          <CircularIconButtonComponent
            buttonStyle={StyleSheet.flatten([
              StyleSheet.flatten([staticStyle.button, styles.button]),
            ])}
            iconPath={appIcons.ic_apple}
            iconStyle={staticStyle.buttonIcon}
            tintColor={props.getTintColor()}
            onPress={() => {}}
          />
          <CircularIconButtonComponent
            buttonStyle={StyleSheet.flatten([
              staticStyle.button,
              styles.button,
            ])}
            iconPath={appIcons.ic_google}
            iconStyle={staticStyle.googleButtonIcon}
            onPress={props.handleGoogleLogIn}
          />
        </View>
      ) : (
        <View style={staticStyle.bottomButtons}>
          <CircularIconButtonComponent
            buttonStyle={StyleSheet.flatten([
              staticStyle.button,
              styles.button,
            ])}
            iconPath={appIcons.ic_google}
            iconStyle={staticStyle.googleButtonIcon}
            onPress={props.handleGoogleLogIn}
          />
        </View>
      )}
    </View>
  );
};
