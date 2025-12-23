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
import { categories } from '../../../../demoData/consultantData';
import { useState } from 'react';
import { createStyles, staticStyle } from './styles';
import { useTranslation } from 'react-i18next';

export const AreaOfExpertiesScreen = ({
  navigation,
}: rootNavigationProps<routeName.AreaOfExperties>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [category, setCategory] = useState<string[]>([]);

  const goBack = () => {
    navigation.goBack();
  };

  const addCategory = (text: string) => {
    setCategory(prev => [...prev, text]);
  };
  const removeCategory = (text: string) => {
    setCategory(category.filter(x => x !== text));
  };

  const navigateToNext = () => {
    navigation.navigate(routeName.ServicesYouOffer);
  };

  const renderItem = ({ item }: any) => {
    return (
      <CategoryCard
        obj={{
          image: item.image,
          data: category,
          text: item.text,
          add: addCategory,
          remove: removeCategory,
        }}
      />
    );
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
              data={categories}
              initialNumToRender={12}
              keyExtractor={item => item.text}
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
