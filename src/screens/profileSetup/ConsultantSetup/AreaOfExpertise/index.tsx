import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../config/themes/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButtonComponent } from '../../../../components/Buttons/PrimaryButton';
import { CircularIconButtonComponent } from '../../../../components/Buttons/CircularIconButton';
import { appIcons } from '../../../../config/icons/iconPath';
import { rootNavigationProps } from '../../../../models/navigationModel';
import { routeName } from '../../../../config/constants/routes';
import { SemiBoldTextComponent } from '../../../../components/Text/SemiBoldTextComponent';
import { RegularTextComponent } from '../../../../components/Text/RegularTextComponent';
import { CategoryCard } from '../../../../components/Cards/CategoryCard';
import { useCallback, useEffect, useState } from 'react';
import { createStyles, staticStyle } from './styles';
import { useTranslation } from 'react-i18next';
import { getAPIData } from '../../../../services/api/common/getCommonApi';
import { endPoints } from '../../../../config/endPoint/apiEndPoint';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../../redux/features/userSlice';
import { apiExpertiseModel } from '../../../../models/api/consultant';
import {
  tExpertiseModel,
  transformExpertiseModel,
} from '../../../../models/formattedAPI/tConsultant';
import { ApiResponse, ListPayload } from '../../../../models/apiModel';

export const AreaOfExpertiseScreen = ({
  navigation,
}: rootNavigationProps<routeName.AreaOfExpertise>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const [expertise, setExpertise] = useState<tExpertiseModel[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  const goBack = () => {
    navigation.goBack();
  };

  const getExpertise = async () => {
    try {
      const response = await getAPIData<
        ApiResponse<ListPayload<apiExpertiseModel>>
      >(endPoints.expertise);
      if (!response) return;
      const data: apiExpertiseModel[] = response.payload.data;
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

  const renderItem: ListRenderItem<tExpertiseModel> = useCallback(
    ({ item }) => {
      return (
        <CategoryCard
          expertise={item}
          data={category}
          add={addCategory}
          remove={removeCategory}
        />
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
            <CircularIconButtonComponent
              iconPath={appIcons.ic_backIcon}
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
            <SemiBoldTextComponent
              text={t('yourExpertise')}
              textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
            />
            <RegularTextComponent
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
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={staticStyle.listBar}
              ListEmptyComponent={null}
            />
          </View>
        </View>
        <View style={staticStyle.bottomButton}>
          <PrimaryButtonComponent
            text={t('continue')}
            onPress={navigateToNext}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
