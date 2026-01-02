import { useTheme } from '@shopify/restyle';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeaderComponent } from '../../../components/Headers/ScreenHeaderComponent';
import { rootNavigationProps } from '../../../models/navigationModel';
import { routeName } from '../../../config/constants/routes';
import { createStyles, staticStyle } from './styles';
import { useState } from 'react';
import { PasswordInputComponent } from '../../../components/Input/PasswordInput';
import { PrimaryButtonComponent } from '../../../components/Buttons/PrimaryButton';
import { useTranslation } from 'react-i18next';

export const ChangePasswordScreen = ({
  navigation,
}: rootNavigationProps<routeName.ChangePassword>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [oldPassword, setOldPassword] = useState<string | null>('');
  const [newPassword, setNewPassword] = useState<string | null>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string | null>(
    '',
  );
  const [oldPassVisible, setOldPassVisible] = useState(false);
  const [newPassVisible, setNewPassVisible] = useState(false);
  const [confirmNewPassVisible, setConfirmNewPassVisible] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <ScreenHeaderComponent
          onPress={goBack}
          headerText={t('changePassword')}
        />
        <View style={staticStyle.inputField}>
          <PasswordInputComponent
            placeholder={t('oldPassword')}
            setValue={setOldPassword}
            setVisible={setOldPassVisible}
            visible={oldPassVisible}
            value={oldPassword ?? ''}
          />
          <PasswordInputComponent
            placeholder={t('newPassword')}
            setValue={setNewPassword}
            setVisible={setNewPassVisible}
            visible={newPassVisible}
            value={newPassword ?? ''}
          />
          <PasswordInputComponent
            placeholder={t('confirmNewPassword')}
            setValue={setConfirmNewPassword}
            setVisible={setConfirmNewPassVisible}
            visible={confirmNewPassVisible}
            value={confirmNewPassword ?? ''}
          />
        </View>
        <View style={staticStyle.buttonContainer}>
          <PrimaryButtonComponent
            onPress={() => {}}
            text={t('updatePassword')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
