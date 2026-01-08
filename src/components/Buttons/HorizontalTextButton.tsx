import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { Theme } from '@config/themes/themes';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Components } from '@components/index';
import { createStyles, staticStyle } from '@screens/common/auth/LogIn/styles';

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
      <Components.TextComponent
        text={t(props.title)}
        family={'medium'}
        textStyle={StyleSheet.flatten([staticStyle.subTitle, styles.subTitle])}
      />
      <TouchableOpacity activeOpacity={0.7} onPress={props.navigateTo}>
        <Components.TextComponent
          text={t(props.subTitle)}
          family={'medium'}
          textStyle={styles.signUp}
        />
      </TouchableOpacity>
    </View>
  );
};
