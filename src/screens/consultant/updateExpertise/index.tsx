import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
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
import { setUserData } from '@redux/features/userSlice';
import { ApiExpertiseModel } from '@models/api/consultant';
import {
  TExpertiseModel,
  transformExpertiseModel,
} from '@models/formattedAPI/tConsultant';
import { ApiResponse } from '@models/apiModel';
import { Config } from '@config/index';
import { Components } from '@components/index';
import { RootState } from '@redux/store';
import { updateExpertises } from '@services/api/profile/updateProfile';
import { Utils } from '@utils/index';

export const UpdateExpertiseScreen = ({
  navigation,
}: RootNavigationProps<routeName.UpdateExpertise>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const { expertises } = useSelector((state: RootState) => state.user.userData);
  const [expertise, setExpertise] = useState<TExpertiseModel[]>([]);
  const [category, setCategory] = useState<string[]>(expertises ?? []);
  const isButtonDisabled = category === expertises || category.length === 0;

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
      Utils.showErrorToast({ title: error as string });
    }
  };

  const addCategory = (id: string) => {
    setCategory(prev => [...prev, id]);
  };
  const removeCategory = (id: string) => {
    setCategory(category.filter(x => x !== id));
  };

  const updateExpertise = async () => {
    try {
      await updateExpertises(category);
      dispatch(
        setUserData({
          expertises: category,
        }),
      );
      goBack();
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              buttonStyle={[staticStyle.backButton]}
              iconStyle={staticStyle.backIcon}
              tintColor={theme.colors.textPrimary}
              onPress={goBack}
            />
            <Components.TextComponent
              family={'medium'}
              text={t('editExpertise')}
              textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
            />
            <View style={staticStyle.backButton} />
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
            isButtonActive={isButtonDisabled}
            text={t('updateExpertise')}
            onPress={updateExpertise}
            buttonStyle={isButtonDisabled ? styles.secondaryBg : undefined}
            textStyle={isButtonDisabled ? styles.subTitle : undefined}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
