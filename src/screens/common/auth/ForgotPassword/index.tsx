import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SemiBoldTextComponent } from '../../../../components/Text/SemiBoldTextComponent';
import { useTheme } from '@shopify/restyle';
import { DarkTheme, Theme } from '../../../../config/themes/themes';
import { createStyles, staticStyles } from './styles';
import { rootNavigationProps } from '../../../../models/navigationModal';
import { routeName } from '../../../../config/constants/routes';
import { useState } from 'react';
import { PrimaryButtonComponent } from '../../../../components/Buttons/PrimaryButton';
import { ScreenHeaderComponent } from '../../../../components/Headers/ScreenHeaderComponent';
import { EmailAndPasswordInput } from '../../../../components/Input/EmailAndPasswordInput';
import { useTranslation } from 'react-i18next';

export const ForgotPasswordScreen = ({
  navigation,
}: rootNavigationProps<routeName.ForgotPassword>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const isDarkTheme = theme === DarkTheme;
  const [email, setEmail] = useState<string>('');
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
      <SafeAreaView
        style={StyleSheet.flatten([staticStyles.container, styles.container])}
      >
        <View
          style={StyleSheet.flatten([staticStyles.container, styles.container])}
        >
          <View style={staticStyles.topBar}>
            <ScreenHeaderComponent onPress={goBack} />
          </View>
          <View style={staticStyles.content}>
            <View style={staticStyles.titleLine}>
              <SemiBoldTextComponent
                text={t('forgotPassword')}
                textStyle={StyleSheet.flatten([
                  staticStyles.title,
                  styles.title,
                ])}
              />
              <SemiBoldTextComponent
                text={t('forgotPasswordLine')}
                noOfLines={2}
                textStyle={StyleSheet.flatten([
                  staticStyles.subTitle,
                  styles.subTitle,
                ])}
              />
            </View>
            <View style={staticStyles.bottomContainer}>
              <EmailAndPasswordInput
                keyboardType="email-address"
                placeholder={t('email')}
                value={email}
                setValue={setEmail}
              />
              <PrimaryButtonComponent
                obj={{
                  text: t('sendNow'),
                  onPress: () => {},
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
