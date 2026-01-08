import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { createStyles, staticStyle } from '@components/Skeleton/clientHome/styles';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { Utils } from '@utils/index';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const ClientHomeScreenShimmer = () => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const renderItem = useCallback(() => {
    return <Components.Skeleton.ShimmerHolder style={staticStyle.workShopCard} />;
  }, []);

  return (
    <>
      <View
        style={StyleSheet.flatten([staticStyle.background, styles.background])}
      >
        <LinearGradient
          colors={[Config.appColors.app_3554FF26, Config.appColors.app_3554FF00]}
          style={staticStyle.topBar}
        >
          <View style={staticStyle.profileInfo}>
            <View style={staticStyle.profilePictureName}>
              <Components.Skeleton.ShimmerHolder style={staticStyle.image} />
              <Components.Skeleton.ShimmerHolder style={staticStyle.profileText} />
            </View>
            <View style={staticStyle.profilePictureName}>
              <Components.Skeleton.ShimmerHolder style={staticStyle.proUser} />
              <FastImage
                source={Config.appIcons.ic_notificationBell}
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
                source={Config.appIcons.ic_search}
                style={staticStyle.searchIcon}
              />
              <Components.Text.RegularTextComponent
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
                  Utils.isDarkMode(theme)
                    ? Config.appIcons.ic_helpDark
                    : Config.appIcons.ic_helpLight
                }
                style={staticStyle.imageButton}
              />
              <Components.Text.MediumTextComponent
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
                <Components.Text.MediumTextComponent
                  text={t('workshop')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.headerText,
                    styles.headerText,
                  ])}
                />
                <View style={staticStyle.viewAllButton}>
                  <Components.Text.RegularTextComponent
                    text={t('viewAll')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.viewAllText,
                      styles.viewAllText,
                    ])}
                  />
                  <FastImage
                    source={Config.appIcons.ic_rightArrow}
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
                <Components.Text.MediumTextComponent
                  text={t('bookingHistory')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.headerText,
                    styles.headerText,
                  ])}
                />
                <View style={staticStyle.viewAllButton}>
                  <Components.Text.RegularTextComponent
                    text={t('viewAll')}
                    textStyle={StyleSheet.flatten([
                      staticStyle.viewAllText,
                      styles.viewAllText,
                    ])}
                  />
                  <FastImage
                    source={Config.appIcons.ic_rightArrow}
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
              <Components.Text.MediumTextComponent
                text={t('browseServices')}
                textStyle={StyleSheet.flatten([
                  staticStyle.header,
                  staticStyle.headerText,
                  styles.headerText,
                ])}
              />
              <Components.Skeleton.ListShimmer
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
