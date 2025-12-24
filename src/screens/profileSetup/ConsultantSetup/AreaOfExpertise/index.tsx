import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { isDarkMode } from '../../../../utils/theme/darkMode';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../config/themes/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButtonComponent } from '../../../../components/Buttons/PrimaryButton';
import { CircularIconButtonComponent } from '../../../../components/Buttons/CircularIconButton';
import { appIcons } from '../../../../config/icons/iconPath';
import { rootNavigationProps } from '../../../../models/navigationModal';
import { routeName } from '../../../../config/constants/routes';
import { SemiBoldTextComponent } from '../../../../components/Text/SemiBoldTextComponent';
import { RegularTextComponent } from '../../../../components/Text/RegularTextComponent';
import { CategoryCard } from '../../../../components/Cards/CategoryCard';
import { useEffect, useState } from 'react';
import { createStyles, staticStyle } from './styles';
import { useTranslation } from 'react-i18next';
import { getAPIData } from '../../../../services/api/common/getCommonApi';
import { endPoints } from '../../../../config/endPoint/apiEndPoint';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../../redux/features/userSlice';
import { ApiExpertiesModel } from '../../../../models/api/consultant';
import {
  IExpertiesModel,
  transformExpertiesModel,
} from '../../../../models/formattedAPI/tConsultant';

export const AreaOfExpertiesScreen = ({
  navigation,
}: rootNavigationProps<routeName.AreaOfExperties>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const [expertise, setExpertise] = useState<IExpertiesModel[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  const goBack = () => {
    navigation.goBack();
  };

  const getExpertise = async () => {
    try {
      const res: ApiExpertiesModel[] = await getAPIData(endPoints.expertises);
      const transformedRes = res.map(r => transformExpertiesModel(r));
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
    console.log('Category: ', category);
    dispatch(
      setUserData({
        expertises: category,
      }),
    );
    navigation.navigate(routeName.ServicesYouOffer);
  };

  const renderItem = ({ item }: any) => {
    return (
      <CategoryCard
        obj={{
          expertise: item,
          data: category,
          add: addCategory,
          remove: removeCategory,
        }}
      />
    );
  };

  useEffect(() => {
    getExpertise();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode(theme) ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={staticStyle.container}>
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
            obj={{
              text: t('continue'),
              onPress: navigateToNext,
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
