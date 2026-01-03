import { Dispatch, SetStateAction } from 'react';
import { BorderInputComponent } from '@components/Input/BorderInput';
import { CircularIconButtonComponent } from '@components/Buttons/CircularIconButton';
import { appIcons } from '@config/icons/iconPath';
import { StyleSheet, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import normalize from '@utils/normalize/normalize';

type PasswordInputProps = {
  value: string;
  visible: boolean;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string | null>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export const PasswordInputComponent = ({
  setValue,
  placeholder,
  setVisible,
  value,
  visible,
}: PasswordInputProps) => {
  const theme = useTheme<Theme>();
  return (
    <View style={staticStyle.passwordInput}>
      <BorderInputComponent
        placeholder={placeholder}
        value={value}
        setValue={setValue}
        secureText={!visible}
      />
      <CircularIconButtonComponent
        iconPath={
          visible ? appIcons.ic_showPassword : appIcons.ic_hiddenPassword
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
    width: normalize(24),
    height: normalize(24),
    right: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenPasswordIcon: {
    width: normalize(18),
    height: normalize(10, 'height'),
    resizeMode: 'contain',
  },
  showPasswordIcon: {
    width: normalize(22),
    height: normalize(12, 'height'),
    resizeMode: 'contain',
  },
});
