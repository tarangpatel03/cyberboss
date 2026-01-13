import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigationProps } from '@models/navigationModel';
import { routeName } from '@config/constants/routes';
import { useCallback, useEffect, useState } from 'react';
import { createStyles, staticStyle } from '@screens/profileSetup/ConsultantSetup/AreaOfExpertise/styles';
import { useTranslation } from 'react-i18next';
import { getAPIData } from '@services/api/common/getCommonApi';
import { useDispatch } from 'react-redux';
import { setUserData } from '@redux/features/userSlice';
import { ApiExpertiseModel } from '@models/api/consultant';
import {
  TExpertiseModel,
  transformExpertiseModel,
} from '@models/formattedAPI/tConsultant';
import { ApiResponse } from '@models/apiModel';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const AreaOfExpertiseScreen = ({
  navigation,
}: RootNavigationProps<routeName.AreaOfExpertise>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const [expertise, setExpertise] = useState<TExpertiseModel[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  const goBack = () => {
    navigation.goBack();
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
      console.log(error);
    }
  };

  const addCategory = (id: string) => {
    setCategory(prev => [...prev, id]);
  };
  const removeCategory = (id: string) => {
    setCategory(category.filter(x => x !== id));
  };

  const navigateToNext = () => {
    dispatch(
      setUserData({
        expertises: category,
      }),
    );
    navigation.navigate(routeName.ServicesYouOffer);
  };

  const renderItem: ListRenderItem<TExpertiseModel> = useCallback(
    ({ item }) => {
      return (
        <Components.Cards.CategoryCard
          expertise={item}
          data={category}
          add={addCategory}
          remove={removeCategory}
        />
      );
    },
      [category],
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
              buttonStyle={staticStyle.backButton}
              iconStyle={staticStyle.backIcon}
              tintColor={theme.colors.textPrimary}
              onPress={goBack}
            />
            <View style={StyleSheet.flatten([staticStyle.line, styles.line])}>
              <View
                style={StyleSheet.flatten([
                  staticStyle.fillLineDetail,
                  styles.filledLine,
                ])}
              />
              <View style={staticStyle.lineDetail} />
            </View>
          </View>
          <View style={staticStyle.content}>
            <Components.TextComponent
              family={'semiBold'}
              text={t('yourExpertise')}
              textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
            />
            <Components.TextComponent
              family={'regular'}
              text={t('yourExpertiseLine')}
              textStyle={StyleSheet.flatten([
                staticStyle.subTitle,
                styles.subTitle,
              ])}
            />
          </View>
          <View style={staticStyle.list}>
            <FlatList
              data={expertise}
              initialNumToRender={12}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={staticStyle.listBar}
              ListEmptyComponent={null}
            />
          </View>
        </View>
        <View style={staticStyle.bottomButton}>
          <Components.Buttons.PrimaryButton
            text={t('continue')}
            onPress={navigateToNext}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
