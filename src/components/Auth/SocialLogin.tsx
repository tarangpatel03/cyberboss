import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { Theme } from '@config/themes/themes';
import { Config } from '@config/index';
import { View, StyleSheet, Platform } from 'react-native';
import { Components } from '@components/index';
import { createStyles, staticStyle } from '@screens/common/auth/LogIn/styles';

type SocialLogInProps = {
  getTintColor: () => string;
  handleAppleLogIn: () => void;
  handleGoogleLogIn: () => Promise<void> | void;
};

export const SocialLogIn = (props: SocialLogInProps) => {
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
        <Components.TextComponent
          text={t('continueWith')}
          family={'regular'}
          textStyle={StyleSheet.flatten([
            staticStyle.subTitle,
            staticStyle.centerText,
            styles.subTitle,
            styles.centerText,
          ])}
        />
      </View>
      <View style={staticStyle.bottomButtons}>
        {Platform.OS === 'ios' ? (
          <Components.Buttons.CircularIconButton
            buttonStyle={StyleSheet.flatten([
              StyleSheet.flatten([staticStyle.button, styles.button]),
            ])}
            iconPath={Config.appIcons.ic_apple}
            iconStyle={staticStyle.buttonIcon}
            tintColor={props.getTintColor()}
            onPress={props.handleAppleLogIn}
          />
        ) : null}
        <View style={staticStyle.bottomButtons}>
          <Components.Buttons.CircularIconButton
            buttonStyle={StyleSheet.flatten([
              staticStyle.button,
              styles.button,
            ])}
            iconPath={Config.appIcons.ic_google}
            iconStyle={staticStyle.googleButtonIcon}
            onPress={props.handleGoogleLogIn}
          />
        </View>
      </View>
    </View>
  );
};
