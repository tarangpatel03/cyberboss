import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SemiBoldTextComponent } from '@components/Text/SemiBoldText';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import {
  createStyles,
  staticStyle,
} from '@screens/common/auth/ForgotPassword/styles';
import { RootNavigationProps } from '@models/navigationModel';
import { routeName } from '@config/constants/routes';
import { useState } from 'react';
import { PrimaryButtonComponent } from '@components/Buttons/PrimaryButton';
import { ScreenHeaderComponent } from '@components/Headers/ScreenHeader';
import { CustomInputComponent } from '@components/Input/EmailAndPasswordInput';
import { useTranslation } from 'react-i18next';
import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';
import { showErrorToast, showSuccessToast } from '@utils/toast/toast';

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
        showSuccessToast({ title: t('linkSend') });
        goBack();
      } else showErrorToast({ title: t('enterValidEmail') });
    } catch (error) {
      console.log(error);
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
            <ScreenHeaderComponent onPress={goBack} />
          </View>
          <View style={staticStyle.content}>
            <View style={staticStyle.titleLine}>
              <SemiBoldTextComponent
                text={t('forgotPassword')}
                textStyle={StyleSheet.flatten([
                  staticStyle.title,
                  styles.title,
                ])}
              />
              <SemiBoldTextComponent
                text={t('forgotPasswordLine')}
                noOfLines={2}
                textStyle={StyleSheet.flatten([
                  staticStyle.subTitle,
                  styles.subTitle,
                ])}
              />
            </View>
            <View style={staticStyle.bottomContainer}>
              <CustomInputComponent
                keyboardType="email-address"
                placeholder={t('email')}
                value={email}
                setValue={setEmail}
              />
              <PrimaryButtonComponent
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
