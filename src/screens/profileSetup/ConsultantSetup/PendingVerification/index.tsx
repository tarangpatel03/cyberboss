import { StatusBar, StyleSheet, View } from 'react-native';
import { isDarkMode } from '../../../../utils/theme/darkMode';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButtonComponent } from '../../../../components/Buttons/PrimaryButton';
import { CircularIconButtonComponent } from '../../../../components/Buttons/CircularIconButton';
import { appIcons } from '../../../../config/icons/iconPath';
import { routeName } from '../../../../config/constants/routes';
import { rootNavigationProps } from '../../../../models/navigationModal';
import { SemiBoldTextComponent } from '../../../../components/Text/SemiBoldTextComponent';
import { RegularTextComponent } from '../../../../components/Text/RegularTextComponent';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { getAPIData } from '../../../../services/api/getApi/getAPI';
import { endPoints } from '../../../../config/endPoint/apiEndPoint';
import { useEffect } from 'react';

export const PendingVerificationScreen = ({
  navigation,
}: rootNavigationProps<routeName.PendingVerification>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToConsultantBottomTab = () => {
    navigation.replace(routeName.BottomTab);
  };

  const verify = async () => {
    try {
      const res = await getAPIData(endPoints.consultantVerified);
      console.log('res: ', res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={StyleSheet.flatten([styles.container])}>
          <View>
            <View style={staticStyle.topBar}>
              <CircularIconButtonComponent
                obj={{
                  iconPath: appIcons.ic_backIcon,
                  buttonStyle: staticStyle.backButton,
                  iconStyle: staticStyle.backIcon,
                  tintColor: theme.colors.textPrimary,
                  onPress: goBack,
                }}
              />
            </View>
            <View style={staticStyle.content}>
              <FastImage
                style={staticStyle.image}
                source={appIcons.ic_shield}
              />
              <View>
                <SemiBoldTextComponent
                  text={t('pendingVerification')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.title,
                    styles.title,
                  ])}
                />
                <RegularTextComponent
                  noOfLines={2}
                  text={t('pendingVerificationLine')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.subTitle,
                    styles.subTitle,
                  ])}
                />
              </View>
            </View>
          </View>
          <View style={staticStyle.bottomButton}>
            <PrimaryButtonComponent
              obj={{
                text: t('continue'),
                onPress: navigateToConsultantBottomTab,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
