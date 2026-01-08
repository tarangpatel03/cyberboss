import { Dispatch, SetStateAction } from 'react';
import { Components } from '@components/index';
import { StyleSheet, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import {Utils} from '@utils/index';
import { Config } from '@config/index';

type PasswordInputProps = {
  value: string;
  visible: boolean;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string | null>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export const PasswordInput = ({
  setValue,
  placeholder,
  setVisible,
  value,
  visible,
}: PasswordInputProps) => {
  const theme = useTheme<Theme>();
  return (
    <View style={staticStyle.passwordInput}>
      <Components.Inputs.BorderInput
        placeholder={placeholder}
        value={value}
        setValue={setValue}
        secureText={!visible}
      />
      <Components.Buttons.CircularIconButton
        iconPath={
          visible ? Config.appIcons.ic_showPassword : Config.appIcons.ic_hiddenPassword
        }
        buttonStyle={staticStyle.passwordButton}
        iconStyle={
          visible
            ? staticStyle.showPasswordIcon
            : staticStyle.hiddenPasswordIcon
        }
        tintColor={theme.colors.textPrimary}
        onPress={() => setVisible(prev => !prev)}
      />
    </View>
  );
};

const staticStyle = StyleSheet.create({
  passwordInput: {
    justifyContent: 'center',
  },
  passwordButton: {
    position: 'absolute',
    width: Utils.normalize(24),
    height: Utils.normalize(24),
    right: Utils.normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenPasswordIcon: {
    width: Utils.normalize(18),
    height: Utils.normalize(10, 'height'),
    resizeMode: 'contain',
  },
  showPasswordIcon: {
    width: Utils.normalize(22),
    height: Utils.normalize(12, 'height'),
    resizeMode: 'contain',
  },
});
