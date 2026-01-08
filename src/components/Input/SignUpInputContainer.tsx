import {
  createStyles,
  staticStyle,
} from '@screens/common/auth/SignUp/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Dispatch, SetStateAction } from 'react';
import { Theme } from '@config/themes/themes';
import { Components } from '@components/index';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Config } from '@config/index';

type SignUpInputContainerProps = {
  email: string;
  password: string;
  checkBox: boolean;
  buttonText: string;
  passVisible: boolean;
  handleSignUp: () => void;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setCheckBox: Dispatch<SetStateAction<boolean>>;
  setPassVisible: Dispatch<SetStateAction<boolean>>;
};

export const SignUpInputContainer = (props: SignUpInputContainerProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={staticStyle.inputs}>
      <Components.Inputs.CustomInput
        keyboardType="email-address"
        placeholder={t('email')}
        value={props.email}
        setValue={props.setEmail}
      />
      <View style={staticStyle.passwordInput}>
        <Components.Inputs.CustomInput
          placeholder={t('password')}
          value={props.password}
          setValue={props.setPassword}
          secureText={!props.passVisible}
        />
        <Components.Buttons.CircularIconButton
          iconPath={
            props.passVisible
              ? Config.appIcons.ic_showPassword
              : Config.appIcons.ic_hiddenPassword
          }
          buttonStyle={staticStyle.passwordButton}
          iconStyle={
            props.passVisible
              ? staticStyle.showPasswordIcon
              : staticStyle.hiddenPasswordIcon
          }
          tintColor={theme.colors.textPrimary}
          onPress={() => props.setPassVisible(prev => !prev)}
        />
      </View>
      <View style={staticStyle.signUpLine}>
        <View>
          <TouchableOpacity
            onPress={() => props.setCheckBox(prev => !prev)}
            style={StyleSheet.flatten([staticStyle.checkBox, styles.checkBox])}
          >
            {props.checkBox && (
              <View
                style={StyleSheet.flatten([
                  staticStyle.checkedBox,
                  styles.checkedBox,
                ])}
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={Config.appIcons.ic_checkMark}
                  style={staticStyle.checkMark}
                  tintColor={theme.colors.pureWhite}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <Components.TextComponent
          family={'regular'}
          text={t('agreeTo')}
          textStyle={StyleSheet.flatten([
            staticStyle.termsLine,
            styles.subTitle,
          ])}
        />
        <TouchableOpacity activeOpacity={0.7}>
          <Components.TextComponent
            family={'regular'}
            text={t('privacyPolicy')}
            textStyle={StyleSheet.flatten([
              staticStyle.termsLine,
              styles.logIn,
            ])}
          />
        </TouchableOpacity>
        <Components.TextComponent
          family={'regular'}
          text={t('and')}
          textStyle={StyleSheet.flatten([
            staticStyle.termsLine,
            styles.subTitle,
          ])}
        />
        <TouchableOpacity activeOpacity={0.7}>
          <Components.TextComponent
            family={'regular'}
            text={t('terms')}
            textStyle={StyleSheet.flatten([
              staticStyle.termsLine,
              styles.logIn,
            ])}
          />
        </TouchableOpacity>
      </View>
      <Components.Buttons.PrimaryButton
        text={t(props.buttonText)}
        onPress={props.handleSignUp}
      />
    </View>
  );
};
