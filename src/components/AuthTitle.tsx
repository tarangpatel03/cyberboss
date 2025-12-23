import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../config/themes/themes';
import { RegularTextComponent } from './Text/RegularTextComponent';
import { SemiBoldTextComponent } from './Text/SemiBoldTextComponent';
import { createStyles, staticStyle } from '../screens/common/auth/LogIn/styles';

type authInTitleProps = {
  title: string;
  subTitle: string;
};

export const AuthTitle = (props: authInTitleProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.titleContainer}>
      <SemiBoldTextComponent
        text={t(props.title)}
        textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
      />
      <RegularTextComponent
        text={t(props.subTitle)}
        textStyle={StyleSheet.flatten([staticStyle.subTitle, styles.subTitle])}
      />
    </View>
  );
};
