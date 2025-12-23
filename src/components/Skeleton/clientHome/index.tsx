import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../config/themes/themes';
import { appColors } from '../../../config/colors/colors';
import { appIcons } from '../../../config/icons/iconPath';
import { createStyles, staticStyle } from './styles';
import { isDarkMode } from '../../../utils/theme/darkMode';
import LinearGradient from 'react-native-linear-gradient';
import { ShimmerHolder } from '../ShimmerHolder';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { MediumTextComponent } from '../../Text/MediumTextComponent';
import { RegularTextComponent } from '../../Text/RegularTextComponent';
import FastImage from 'react-native-fast-image';
import { ListShimmer } from '../ListShimmer';
import { useTranslation } from 'react-i18next';

export const ClientHomeScreenShimmer = () => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const renderItem = () => {
    return (
      <ShimmerHolder
        style={StyleSheet.flatten([staticStyle.workShopCard, styles.container])}
      />
    );
  };

  return (
    <>
      <View
        style={StyleSheet.flatten([staticStyle.background, styles.background])}
      >
        <LinearGradient
          colors={[appColors.app_3554FF26, appColors.app_3554FF00]}
          style={staticStyle.topBar}
        >
          <View style={staticStyle.profileInfo}>
            <View style={staticStyle.profilePictureName}>
              <ShimmerHolder style={staticStyle.image} />
              <ShimmerHolder style={staticStyle.profileText} />
            </View>
            <View style={staticStyle.profilePictureName}>
              <ShimmerHolder style={staticStyle.proUser} />
              <FastImage
                source={appIcons.ic_notificationBell}
                style={staticStyle.bellButton}
                tintColor={theme.colors.textPrimary}
              />
            </View>
          </View>
        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={staticStyle.searchBar}>
            <View
              style={StyleSheet.flatten([
                staticStyle.searchContainer,
                styles.container,
              ])}
            >
              <FastImage
                source={appIcons.ic_search}
                style={staticStyle.searchIcon}
              />
              <RegularTextComponent
                text={t('searchPlaceHolder')}
                textStyle={StyleSheet.flatten([
                  staticStyle.headerText,
                  styles.helpText,
                ])}
              />
            </View>
            <View style={staticStyle.helpButton}>
              <FastImage
                source={
                  isDarkMode(theme)
                    ? appIcons.ic_helpDark
                    : appIcons.ic_helpLight
                }
                style={staticStyle.imageButton}
              />
              <MediumTextComponent
                text={t('help')}
                textStyle={StyleSheet.flatten([
                  staticStyle.tinyText,
                  styles.helpText,
                ])}
              />
            </View>
          </View>
          <View style={staticStyle.container}>
            <View>
              <View style={staticStyle.header}>
                <MediumTextComponent
                  text={t('workshop')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.headerText,
                    styles.headerText,
                  ])}
                />
                <View style={staticStyle.viewAllButton}>
                  <RegularTextComponent
                    text={t('viewAll')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.viewAllText,
                      styles.viewAllText,
                    ])}
                  />
                  <FastImage
                    source={appIcons.ic_rightArrow}
                    style={staticStyle.viewAllIcon}
                    tintColor={theme.colors.primary}
                  />
                </View>
              </View>
              <FlatList
                data={[1, 2, 3]}
                horizontal
                initialNumToRender={3}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                ListEmptyComponent={null}
              />
            </View>
            <View>
              <View style={staticStyle.header}>
                <MediumTextComponent
                  text={t('bookingHistory')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.headerText,
                    styles.headerText,
                  ])}
                />
                <View style={staticStyle.viewAllButton}>
                  <RegularTextComponent
                    text={t('viewAll')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.viewAllText,
                      styles.viewAllText,
                    ])}
                  />
                  <FastImage
                    source={appIcons.ic_rightArrow}
                    style={staticStyle.viewAllIcon}
                    tintColor={theme.colors.primary}
                  />
                </View>
              </View>
              <FlatList
                data={[1, 2, 3]}
                horizontal
                initialNumToRender={3}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                ListEmptyComponent={null}
              />
            </View>
            <View style={staticStyle.container}>
              <MediumTextComponent
                text={t('browseServices')}
                textStyle={StyleSheet.flatten([
                  staticStyle.header,
                  staticStyle.headerText,
                  styles.headerText,
                ])}
              />
              <ListShimmer
                scrollEnabled={false}
                containerStyle={staticStyle.browseService}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
