import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import {
  createStyles,
  staticStyle,
} from '@screens/common/auth/ForgotPassword/styles';
import { RootNavigationProps } from '@models/navigationModel';
import { routeName } from '@config/constants/routes';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';
import { Utils } from '@utils/index';
import { Components } from '@components/index';

export const ForgotPasswordScreen = ({
  navigation,
}: RootNavigationProps<routeName.ForgotPassword>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [email, setEmail] = useState<string>('');
  const goBack = () => {
    navigation.goBack();
  };

  const resetPassword = async () => {
    try {
      if (email.trim()) {
        await sendPasswordResetEmail(getAuth(), email);
        Utils.showSuccessToast({ title: t('linkSend') });
        goBack();
      } else Utils.showErrorToast({ title: t('enterValidEmail') });
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
    }
  };

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View
          style={StyleSheet.flatten([staticStyle.container, styles.container])}
        >
          <View style={staticStyle.topBar}>
            <Components.Headers.ScreenHeader onPress={goBack} />
          </View>
          <View style={staticStyle.content}>
            <View style={staticStyle.titleLine}>
              <Components.TextComponent
                family={'semiBold'}
                text={t('forgotPassword')}
                textStyle={StyleSheet.flatten([
                  staticStyle.title,
                  styles.title,
                ])}
              />
              <Components.TextComponent
                family={'semiBold'}
                text={t('forgotPasswordLine')}
                noOfLines={2}
                textStyle={StyleSheet.flatten([
                  staticStyle.subTitle,
                  styles.subTitle,
                ])}
              />
            </View>
            <View style={staticStyle.bottomContainer}>
              <Components.Inputs.CustomInput
                keyboardType="email-address"
                placeholder={t('email')}
                value={email}
                setValue={setEmail}
              />
              <Components.Buttons.PrimaryButton
                text={t('sendNow')}
                onPress={resetPassword}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
