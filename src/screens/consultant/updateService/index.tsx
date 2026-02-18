import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigationProps } from '@models/navigationModel';
import { routeName } from '@config/constants/routes';
import { useCallback, useEffect, useState } from 'react';
import { createStyles, staticStyle } from './styles';
import { useTranslation } from 'react-i18next';
import { getAPIData } from '@services/api/common/getCommonApi';
import { useDispatch, useSelector } from 'react-redux';
import { ApiExpertiseModel } from '@models/api/consultant';
import {
  TExpertiseModel,
  transformExpertiseModel,
} from '@models/formattedAPI/tConsultant';
import { ApiResponse } from '@models/apiModel';
import { Config } from '@config/index';
import { Components } from '@components/index';
import { RootState } from '@redux/store';
import FastImage from 'react-native-fast-image';
import { setUserData } from '@redux/features/userSlice';
import { updateServices } from '@services/api/profile/updateProfile';
import { Utils } from '@utils/index';

export const UpdateServiceScreen = ({
  navigation,
}: RootNavigationProps<routeName.UpdateService>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const { expertises, services } = useSelector(
    (state: RootState) => state.user.userData,
  );
  const [expertise, setExpertise] = useState<TExpertiseModel[]>([]);
  const [text, setText] = useState('');
  const [serviceList, setServiceList] = useState<string[]>(services ?? []);
  const isButtonDisabled = serviceList === services || serviceList.length === 0;

  const removeService = (serviceText: string) => {
    setServiceList(prev => prev.filter(x => x !== serviceText));
  };

  const addService = (serviceText: string) => {
    setServiceList(prev => [...prev, serviceText]);
    setText('');
  };

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToUpdateExpertise = () => {
    navigation.navigate(routeName.UpdateExpertise);
  };

  const getExpertise = async () => {
    try {
      const response = await getAPIData<ApiResponse<ApiExpertiseModel[]>>(
        Config.endPoints.expertise,
      );
      if (!response) return;
      const data: ApiExpertiseModel[] = response.payload;
      const transformedRes = data.map(r => transformExpertiseModel(r));
      setExpertise(transformedRes);
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
    }
  };

  const updateService = async () => {
    try {
      await updateServices(serviceList);
      dispatch(
        setUserData({
          services: serviceList,
        }),
      );
      goBack();
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
    }
  };

  const getYourExpertise = () => {
    const yourExpertise = expertise.filter(exp => {
      if (expertises?.includes(exp.id)) {
        return exp;
      }
    });
    return yourExpertise;
  };

  const renderItem: ListRenderItem<TExpertiseModel> = useCallback(
    ({ item }) => {
      return (
        <View style={staticStyle.expertiseContainer}>
          <View
            style={StyleSheet.flatten([
              staticStyle.expertiseIcon,
              styles.borderPrimary,
            ])}
          >
            <FastImage
              source={{ uri: item.image }}
              style={staticStyle.expertise}
              resizeMode={'contain'}
            />
          </View>
          <Components.TextComponent
            family={'regular'}
            text={item.name}
            noOfLines={2}
            textStyle={StyleSheet.flatten([
              staticStyle.expertiseText,
              styles.subTitle,
            ])}
          />
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    getExpertise();
  }, []);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.container}>
          <View style={staticStyle.topBar}>
            <Components.Buttons.CircularIconButton
              iconPath={Config.appIcons.ic_backIcon}
              buttonStyle={[staticStyle.backButton]}
              iconStyle={staticStyle.backIcon}
              tintColor={theme.colors.textPrimary}
              onPress={goBack}
            />
            <Components.TextComponent
              family={'medium'}
              text={t('expertiseAndServices')}
              textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
            />
            <View style={staticStyle.backButton} />
          </View>
          <TouchableOpacity
            onPress={navigateToUpdateExpertise}
            activeOpacity={0.7}
            style={StyleSheet.flatten([
              staticStyle.editExpertiseContainer,
              styles.primaryBackground,
            ])}
          >
            <FastImage
              tintColor={theme.colors.primary}
              source={Config.appIcons.ic_pen}
              style={staticStyle.editIcon}
              resizeMode={'contain'}
            />
            <Components.TextComponent
              family={'regular'}
              text={'Edit Expertise'}
              textStyle={StyleSheet.flatten([
                staticStyle.subTitle,
                styles.primaryText,
              ])}
            />
          </TouchableOpacity>
          <View style={staticStyle.list}>
            <FlatList
              horizontal
              data={getYourExpertise()}
              initialNumToRender={12}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={staticStyle.listBar}
              ListEmptyComponent={null}
            />
          </View>
          <View style={staticStyle.serviceContainer}>
            <Components.Inputs.CustomInput
              placeholder={t('addService')}
              setValue={setText}
              value={text}
              onSubmit={addService}
            />
          </View>
          <View style={staticStyle.services}>
            {serviceList.map(x => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => removeService(x)}
                style={StyleSheet.flatten([
                  staticStyle.serviceCardContainer,
                  styles.serviceContainer,
                ])}
              >
                <Components.TextComponent
                  family={'regular'}
                  text={x}
                  textStyle={StyleSheet.flatten([
                    staticStyle.subTitle,
                    styles.title,
                  ])}
                />
                <FastImage
                  source={Config.appIcons.ic_cross}
                  tintColor={theme.colors.textPrimary}
                  style={staticStyle.serviceImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={staticStyle.bottomButton}>
          <Components.Buttons.PrimaryButton
            isButtonActive={isButtonDisabled}
            text={t('updateServices')}
            onPress={updateService}
            buttonStyle={isButtonDisabled ? styles.secondaryBg : undefined}
            textStyle={isButtonDisabled ? styles.subTitle : undefined}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
