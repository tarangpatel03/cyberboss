import { StyleSheet, View } from 'react-native';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { createStyles, staticStyle } from '@screens/profileSetup/ConsultantSetup/ServicesYouOffer/styles';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setUserData } from '@redux/features/userSlice';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const ServicesYouOfferScreen = ({
  navigation,
}: RootNavigationProps<routeName.ServicesYouOffer>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const [text, setText] = useState<string | null>('');
  const [serviceList, setServiceList] = useState<string[]>([]);

  const goBack = () => {
    navigation.goBack();
  };

  const removeService = (serviceText: string) => {
    setServiceList(prev => prev.filter(x => x !== serviceText));
  };

  const addService = (serviceText: string) => {
    setServiceList(prev => [...prev, serviceText]);
    setText('');
  };

  const navigateToNext = () => {
    dispatch(
      setUserData({
        services: serviceList,
      }),
    );
    navigation.navigate(routeName.PersonalDetails);
  };
  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View
          style={StyleSheet.flatten([staticStyle.container, styles.container])}
        >
          <View style={staticStyle.topBar}>
            <Components.Buttons.CircularIconButton
              iconPath={Config.appIcons.ic_backIcon}
              buttonStyle={staticStyle.backButton}
              iconStyle={staticStyle.backIcon}
              tintColor={theme.colors.textPrimary}
              onPress={goBack}
            />
            <View style={StyleSheet.flatten([staticStyle.line, styles.line])}>
              <View
                style={StyleSheet.flatten([
                  staticStyle.lineDetail,
                  styles.filledLine,
                ])}
              />
              <View style={staticStyle.lineDetail} />
            </View>
          </View>
          <View style={staticStyle.content}>
            <Components.Text.SemiBoldTextComponent
              text={t('addYourServices')}
              textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
            />
            <Components.Text.RegularTextComponent
              text={t('addYourServicesLine')}
              textStyle={StyleSheet.flatten([
                staticStyle.subTitle,
                styles.subTitle,
              ])}
            />
          </View>
          <View style={staticStyle.contentSelection}>
            <Components.Inputs.BorderInput
              placeholder={t('addService')}
              setValue={setText}
              value={text}
              onSubmit={addService}
            />
            <View style={staticStyle.services}>
              {serviceList.map(x => (
                <Components.Cards.ServiceListCard text={x} key={x} onRemove={removeService} />
              ))}
            </View>
          </View>
        </View>
        <View
          style={StyleSheet.flatten([
            staticStyle.bottomButtons,
            styles.bottomButtons,
          ])}
        >
          <Components.Buttons.PrimaryButton
            text={t('skip')}
            buttonStyle={StyleSheet.flatten([
              staticStyle.button,
              styles.skipButton,
            ])}
            textStyle={StyleSheet.flatten([
              staticStyle.skipText,
              styles.skipText,
            ])}
            onPress={navigateToNext}
          />
          <Components.Buttons.PrimaryButton
            text={t('continue')}
            buttonStyle={staticStyle.button}
            textStyle={StyleSheet.flatten([
              staticStyle.nextText,
              styles.nextText,
            ])}
            onPress={navigateToNext}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
