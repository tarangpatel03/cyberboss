import { StyleSheet, View } from 'react-native';
import { createStyles, staticStyle } from '@screens/profileSetup/FirstScreen/styles';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Components } from '@components/index';

export const ProfileSetUpScreen = ({
  navigation,
}: RootNavigationProps<routeName.ProfileSetUp>) => {
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
    navigation.navigate(routeName.AreaOfExpertise);
  };

  const navigateToProfileSetUp = () => {
    isClient ? setUpClient() : setUpConsultant();
  };

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.container}>
          <View style={StyleSheet.flatten([staticStyle.line, styles.line])} />
          <View style={staticStyle.content}>
            <View style={staticStyle.titleView}>
              <Components.Text.SemiBoldTextComponent
                text={t('chooseYourRole')}
                textStyle={StyleSheet.flatten([
                  staticStyle.title,
                  styles.title,
                ])}
              />
              <Components.Text.RegularTextComponent
                text={t('chooseYourRoleSubTitle')}
                textStyle={StyleSheet.flatten([
                  staticStyle.subTitle,
                  styles.subTitle,
                ])}
              />
            </View>
            <View style={staticStyle.selectionCardContainer}>
              <Components.Cards.RoleSelectionCard
                isSelected={isClient}
                onPress={selectClient}
                subtitle={t('clientLine')}
                title={t('client')}
              />
              <Components.Cards.RoleSelectionCard
                isSelected={isConsultant}
                onPress={selectConsultant}
                subtitle={t('consultantLine')}
                title={t('consultant')}
              />
            </View>
          </View>
        </View>
        <View style={staticStyle.bottomButton}>
          <Components.Buttons.PrimaryButton
            onPress={navigateToProfileSetUp}
            text={t('continue')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
