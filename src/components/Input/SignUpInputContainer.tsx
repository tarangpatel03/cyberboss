import {
  createStyles,
  staticStyle,
} from '@screens/common/auth/SignUp/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Dispatch, SetStateAction } from 'react';
import { Theme } from '@config/themes/themes';
import { appIcons } from '@config/icons/iconPath';
import { CustomInputComponent } from '@components/Input/EmailAndPasswordInput';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { PrimaryButtonComponent } from '@components/Buttons/PrimaryButton';
import { RegularTextComponent } from '@components/Text/RegularText';
import { CircularIconButtonComponent } from '@components/Buttons/CircularIconButton';

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
      <CustomInputComponent
        keyboardType="email-address"
        placeholder={t('email')}
        value={props.email}
        setValue={props.setEmail}
      />
      <View style={staticStyle.passwordInput}>
        <CustomInputComponent
          placeholder={t('password')}
          value={props.password}
          setValue={props.setPassword}
          secureText={!props.passVisible}
        />
        <CircularIconButtonComponent
          iconPath={
            props.passVisible
              ? appIcons.ic_showPassword
              : appIcons.ic_hiddenPassword
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
                  source={appIcons.ic_checkMark}
                  style={staticStyle.checkMark}
                  tintColor={theme.colors.pureWhite}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <RegularTextComponent
          text={t('agreeTo')}
          textStyle={StyleSheet.flatten([
            staticStyle.termsLine,
            styles.subTitle,
          ])}
        />
        <TouchableOpacity activeOpacity={0.7}>
          <RegularTextComponent
            text={t('privacyPolicy')}
            textStyle={StyleSheet.flatten([
              staticStyle.termsLine,
              styles.logIn,
            ])}
          />
        </TouchableOpacity>
        <RegularTextComponent
          text={t('and')}
          textStyle={StyleSheet.flatten([
            staticStyle.termsLine,
            styles.subTitle,
          ])}
        />
        <TouchableOpacity activeOpacity={0.7}>
          <RegularTextComponent
            text={t('terms')}
            textStyle={StyleSheet.flatten([
              staticStyle.termsLine,
              styles.logIn,
            ])}
          />
        </TouchableOpacity>
      </View>
      <PrimaryButtonComponent
        text={t(props.buttonText)}
        onPress={props.handleSignUp}
      />
    </View>
  );
};
