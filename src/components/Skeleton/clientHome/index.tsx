import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { Utils } from '@utils/index';
import { Config } from '@config/index';
import { Components } from '@components/index';
import { height } from '@config/constants/variables';

export const ClientHomeScreenShimmer = () => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const renderItem = useCallback(() => {
    return (
      <Components.Skeleton.ShimmerHolder style={staticStyle.workShopCard} />
    );
  }, []);

  return (
    <>
      <View
        style={StyleSheet.flatten([staticStyle.background, styles.background])}
      >
        <LinearGradient
          colors={[
            Config.appColors.app_3554FF26,
            Config.appColors.app_3554FF00,
          ]}
          style={staticStyle.topBar}
        >
          <View style={staticStyle.profileInfo}>
            <View style={staticStyle.profilePictureName}>
              <Components.Skeleton.ShimmerHolder style={staticStyle.image} />
              <Components.Skeleton.ShimmerHolder
                style={staticStyle.profileText}
              />
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
              <Components.TextComponent
                family={'regular'}
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
              <Components.TextComponent
                family={'medium'}
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
                <Components.TextComponent
                  family={'medium'}
                  text={t('workshop')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.headerText,
                    styles.headerText,
                  ])}
                />
                <View style={staticStyle.viewAllButton}>
                  <Components.TextComponent
                    family={'regular'}
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
                <Components.TextComponent
                  family={'medium'}
                  text={t('bookingHistory')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.headerText,
                    styles.headerText,
                  ])}
                />
                <View style={staticStyle.viewAllButton}>
                  <Components.TextComponent
                    family={'regular'}
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
              <Components.TextComponent
                family={'medium'}
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

export const staticStyle = StyleSheet.create({
  topBar: {
    height: Utils.normalize(75, 'height'),
  },
  background: {
    flex: 1,
    height: Utils.normalize(height, 'height'),
  },
  profileInfo: {
    paddingHorizontal: Utils.normalize(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    height: Utils.normalize(60, 'height'),
  },
  profilePictureName: {
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Utils.normalize(8),
  },
  image: {
    width: Utils.normalize(36),
    height: Utils.normalize(36),
    borderRadius: Utils.normalize(20),
  },
  profileText: {
    borderRadius: Utils.normalize(4),
    width: Utils.normalize(60),
    height: Utils.normalize(14),
  },
  bellButton: {
    width: Utils.normalize(20),
    height: Utils.normalize(20),
  },
  helpButton: {
    alignItems: 'center',
    gap: Utils.normalize(6),
  },
  proUser: {
    width: Utils.normalize(68),
    height: Utils.normalize(28, 'height'),
    borderRadius: Utils.normalize(20),
    resizeMode: 'contain',
  },
  searchBar: {
    width: '87%',
    height: Utils.normalize(50, 'height'),
    flexDirection: 'row',
    paddingHorizontal: Utils.normalize(12),
    gap: Utils.normalize(12),
    paddingTop: Utils.normalize(10, 'height'),
  },
  imageButton: {
    width: Utils.normalize(32),
    height: Utils.normalize(32),
  },
  container: {
    flex: 1,
    paddingTop: Utils.normalize(12),
  },
  list: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: Utils.normalize(16),
    marginBottom: Utils.normalize(16, 'height'),
    paddingTop: Utils.normalize(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tinyText: {
    fontSize: Utils.normalize(12),
    fontWeight: '500',
  },
  headerText: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
  viewAllText: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Utils.normalize(5),
  },
  workShopCard: {
    width: Utils.normalize(240),
    height: Utils.normalize(170),
    borderWidth: Utils.normalize(1),
    marginLeft: Utils.normalize(12),
    borderRadius: Utils.normalize(12),
  },
  viewAllIcon: {
    width: Utils.normalize(5),
    height: Utils.normalize(9),
  },
  searchContainer: {
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: Utils.normalize(12),
    height: Utils.normalize(40, 'height'),
    paddingHorizontal: Utils.normalize(12),
  },
  searchIcon: {
    width: Utils.normalize(24),
    height: Utils.normalize(24),
    resizeMode: 'contain',
  },
  browseService: {
    width: '95%',
    alignSelf: 'center',
    height: Utils.normalize(122),
    borderRadius: Utils.normalize(12),
    marginBottom: Utils.normalize(12),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.colors.bgPrimary,
    },
    headerText: {
      color: theme.colors.textPrimary,
    },
    helpText: {
      color: theme.colors.textSecondary,
    },
    viewAllText: {
      color: theme.colors.primary,
    },
    container: {
      borderColor: theme.colors.borderPrimary,
    },
  });
