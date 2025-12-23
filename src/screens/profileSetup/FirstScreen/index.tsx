import { StatusBar, StyleSheet, View } from 'react-native';
import { createStyles, staticStyle } from './styles';
import { Theme } from '../../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import { routeName } from '../../../config/constants/routes';
import { rootNavigationProps } from '../../../models/navigationModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SemiBoldTextComponent } from '../../../components/Text/SemiBoldTextComponent';
import { RegularTextComponent } from '../../../components/Text/RegularTextComponent';
import { RoleSelectionCard } from '../../../components/Cards/RoleSelectionCard';
import { useState } from 'react';
import { PrimaryButtonComponent } from '../../../components/Buttons/PrimaryButton';
import { isDarkMode } from '../../../utils/theme/darkMode';
import { useTranslation } from 'react-i18next';

export const ProfileSetUpScreen = ({
  navigation,
}: rootNavigationProps<routeName.ProfileSetUp>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [isClient, setIsClient1] = useState<boolean>(true);
  const [isConsultant, setIsConsultant] = useState<boolean>(false);

  const selectClient = () => {
    setIsConsultant(false);
    setIsClient1(true);
  };
  const selectConsultant = () => {
    setIsClient1(false);
    setIsConsultant(true);
  };

  const setUpClient = () => {
    navigation.navigate(routeName.ClientProfileSetUp);
  };
  const setUpConsultant = () => {
    navigation.navigate(routeName.AreaOfExperties);
  };

  const navigateToProfileSetUp = () => {
    isClient ? setUpClient() : setUpConsultant();
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.container}>
          <View style={StyleSheet.flatten([staticStyle.line, styles.line])} />
          <View style={staticStyle.content}>
            <View style={staticStyle.titleView}>
              <SemiBoldTextComponent
                text={t('chooseYourRole')}
                textStyle={StyleSheet.flatten([
                  staticStyle.title,
                  styles.title,
                ])}
              />
              <RegularTextComponent
                text={t('chooseYourRoleSubTitle')}
                textStyle={StyleSheet.flatten([
                  staticStyle.subTitle,
                  styles.subTitle,
                ])}
              />
            </View>
            <View style={staticStyle.selectionCardContainer}>
              <RoleSelectionCard
                obj={{
                  isSelected: isClient,
                  onPress: selectClient,
                  subtitle: t('clientLine'),
                  title: t('client'),
                }}
              />
              <RoleSelectionCard
                obj={{
                  isSelected: isConsultant,
                  onPress: selectConsultant,
                  subtitle: t('consultantLine'),
                  title: t('consultant'),
                }}
              />
            </View>
          </View>
        </View>
        <View style={staticStyle.bottomButton}>
          <PrimaryButtonComponent
            obj={{
              onPress: navigateToProfileSetUp,
              text: t('continue'),
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
