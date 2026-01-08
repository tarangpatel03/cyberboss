import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';
import { Components } from '@components/index';
import { staticStyle } from '@screens/common/auth/LogIn/styles';

type LogInInputsContainerProps = {
  email: string;
  password: string;
  getIcon: () => any;
  buttonText: string;
  passVisible: boolean;
  getIconStyle: () => any;
  getTintColor: () => string;
  handleSignIn: () => Promise<void>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setPassVisible: Dispatch<SetStateAction<boolean>>;
};

export const LogInInputsContainer = (props: LogInInputsContainerProps) => {
  const { t } = useTranslation();

  return (
    <View style={staticStyle.emailPassInput}>
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
          iconPath={props.getIcon()}
          buttonStyle={staticStyle.passwordButton}
          iconStyle={props.getIconStyle()}
          tintColor={props.getTintColor()}
          onPress={() => props.setPassVisible(prev => !prev)}
        />
      </View>
      <Components.Buttons.PrimaryButton
        text={t(props.buttonText)}
        onPress={props.handleSignIn}
      />
    </View>
  );
};
