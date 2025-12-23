import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';
import { EmailAndPasswordInput } from './EmailAndPasswordInput';
import { PrimaryButtonComponent } from '../Buttons/PrimaryButton';
import { staticStyle } from '../../screens/common/auth/LogIn/styles';
import { CircularIconButtonComponent } from '../Buttons/CircularIconButton';

type logInInputsContainerProps = {
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

export const LogInInputsContainer = (props: logInInputsContainerProps) => {
  const { t } = useTranslation();

  return (
    <View style={staticStyle.emailPassInput}>
      <EmailAndPasswordInput
        keyboardType="email-address"
        placeholder={t('email')}
        value={props.email}
        setValue={props.setEmail}
      />
      <View style={staticStyle.passwordInput}>
        <EmailAndPasswordInput
          placeholder={t('password')}
          value={props.password}
          setValue={props.setPassword}
          secureText={!props.passVisible}
        />
        <CircularIconButtonComponent
          obj={{
            iconPath: props.getIcon(),
            buttonStyle: staticStyle.passwordButton,
            iconStyle: props.getIconStyle(),
            tintColor: props.getTintColor(),
            onPress: () => props.setPassVisible(prev => !prev),
          }}
        />
      </View>
      <PrimaryButtonComponent
        obj={{
          text: t(props.buttonText),
          onPress: props.handleSignIn,
        }}
      />
    </View>
  );
};
