import { StyleSheet, View } from 'react-native';
import { routeName } from '../../../../config/constants/routes';
import { rootNavigationProps } from '../../../../models/navigationModal';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircularIconButtonComponent } from '../../../../components/Buttons/CircularIconButton';
import { appIcons } from '../../../../config/icons/iconPath';
import { SemiBoldTextComponent } from '../../../../components/Text/SemiBoldTextComponent';
import { RegularTextComponent } from '../../../../components/Text/RegularTextComponent';
import { BorderInputComponent } from '../../../../components/Input/BorderInput';
import { ServiceListCard } from '../../../../components/Cards/ServiceListCard';
import { PrimaryButtonComponent } from '../../../../components/Buttons/PrimaryButton';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../../redux/features/userSlice';

export const ServicesYouOfferScreen = ({
  navigation,
}: rootNavigationProps<routeName.ServicesYouOffer>) => {
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
            <CircularIconButtonComponent
              props={{
                iconPath: appIcons.ic_backIcon,
                buttonStyle: staticStyle.backButton,
                iconStyle: staticStyle.backIcon,
                tintColor: theme.colors.textPrimary,
                onPress: goBack,
              }}
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
            <SemiBoldTextComponent
              text={t('addYourServices')}
              textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
            />
            <RegularTextComponent
              text={t('addYourServicesLine')}
              textStyle={StyleSheet.flatten([
                staticStyle.subTitle,
                styles.subTitle,
              ])}
            />
          </View>
          <View style={staticStyle.contentSelection}>
            <BorderInputComponent
              placeholder={t('addService')}
              setValue={setText}
              value={text}
              onSubmit={addService}
            />
            <View style={staticStyle.services}>
              {serviceList.map(x => (
                <ServiceListCard text={x} key={x} onRemove={removeService} />
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
          <PrimaryButtonComponent
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
          <PrimaryButtonComponent
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
