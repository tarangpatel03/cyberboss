import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { Theme } from '../../config/themes/themes';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import {
  createStyles,
  staticStyle,
} from '../../screens/common/auth/LogIn/styles';

type authFooterAction = {
  title: string;
  subTitle: string;
  navigateTo: () => void;
};

export const AuthFooterAction = (props: authFooterAction) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={staticStyle.forgotPassword}>
      <MediumTextComponent
        text={t(props.title)}
        textStyle={StyleSheet.flatten([staticStyle.subTitle, styles.subTitle])}
      />
      <TouchableOpacity activeOpacity={0.7} onPress={props.navigateTo}>
        <MediumTextComponent
          text={t(props.subTitle)}
          textStyle={styles.signUp}
        />
      </TouchableOpacity>
    </View>
  );
};
