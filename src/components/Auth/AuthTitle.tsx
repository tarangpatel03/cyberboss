import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Components } from '@components/index';
import { createStyles, staticStyle } from '@screens/common/auth/LogIn/styles';

type AuthInTitleProps = {
  title: string;
  subTitle: string;
};

export const AuthTitle = (props: AuthInTitleProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.titleContainer}>
      <Components.Text.SemiBoldTextComponent
        text={t(props.title)}
        textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
      />
      <Components.Text.RegularTextComponent
        text={t(props.subTitle)}
        textStyle={StyleSheet.flatten([staticStyle.subTitle, styles.subTitle])}
      />
    </View>
  );
};
