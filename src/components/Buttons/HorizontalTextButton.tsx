import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { Theme } from '../../config/themes/themes';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MediumTextComponent } from '../Text/MediumText';
import {
  createStyles,
  staticStyle,
} from '../../screens/common/auth/LogIn/styles';

type AuthFooterAction = {
  title: string;
  subTitle: string;
  navigateTo: () => void;
};

export const AuthFooterAction = (props: AuthFooterAction) => {
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
