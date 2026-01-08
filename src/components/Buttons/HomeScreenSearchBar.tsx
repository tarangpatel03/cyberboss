import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { staticStyle, createStyles } from '@screens/client/Home/styles';
import { Components } from '@components/index';
import FastImage from 'react-native-fast-image';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { useTranslation } from 'react-i18next';
import { TourGuideZone } from 'rn-tourguide';
import { Utils } from '@utils/index';
import { Config } from '@config/index';

type SearchBarProps = {
  onSearchPress: () => void;
  onHelpPress: () => void;
};

export const HomeScreenSearchButtons = (props: SearchBarProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.searchBar}>
      <View style={staticStyle.searchBarContainer}>
        <TourGuideZone zone={2} text={t('tour2')}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={props.onSearchPress}
            style={StyleSheet.flatten([
              staticStyle.searchContainer,
              styles.borderPrimary,
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
          </TouchableOpacity>
        </TourGuideZone>
      </View>
      <TourGuideZone zone={3} text={t('tour3')}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={props.onHelpPress}
          style={staticStyle.helpButton}
        >
          <FastImage
            source={
              Utils.isDarkMode(theme) ? Config.appIcons.ic_helpDark : Config.appIcons.ic_helpLight
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
        </TouchableOpacity>
      </TourGuideZone>
    </View>
  );
};
