import {
  createStyles,
  staticStyle,
} from '@screens/common/EditProfile/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import { Theme } from '@config/themes/themes';
import { Components } from '@components/index';

type EditProfileInputsProps = {
  email: string;
  bio: string | null;
  name: string | null;
  experience?: string | null;
  role: 'client' | 'consultant';
  setBio: Dispatch<SetStateAction<string | null>>;
  setUserName: Dispatch<SetStateAction<string | null>>;
  setExperience?: Dispatch<SetStateAction<string | null>>;
};

export const EditProfileInputs = (props: EditProfileInputsProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={staticStyle.inputContainer}>
      <Components.Inputs.BorderInput
        placeholder={t('name')}
        setValue={props.setUserName}
        value={props.name}
      />
      <View
        style={StyleSheet.flatten([
          staticStyle.disableInputContainer,
          styles.disableInputContainer,
        ])}
      >
        <Components.Text.RegularTextComponent
          textStyle={StyleSheet.flatten([staticStyle.placeHolder, styles.text])}
          text={t('email')}
        />
        <Components.Text.RegularTextComponent
          text={props.email}
          textStyle={StyleSheet.flatten([staticStyle.text, styles.text])}
        />
      </View>
      {props.role === 'consultant' && (
        <>
          <Components.Inputs.BorderInput
            placeholder={t('yearsOfExperience')}
            setValue={props.setExperience ?? (() => {})}
            value={props.experience ?? ''}
          />
          <Components.Inputs.BioInputComponent
            placeholder={t('bio')}
            setValue={props.setBio}
            value={props.bio}
          />
        </>
      )}
    </View>
  );
};
