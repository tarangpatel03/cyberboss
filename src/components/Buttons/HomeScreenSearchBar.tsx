import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { staticStyle, createStyles } from '../../screens/client/Home/styles';
import { RegularTextComponent } from '../Text/RegularText';
import FastImage from 'react-native-fast-image';
import { appIcons } from '../../config/icons/iconPath';
import { isDarkMode } from '../../utils/theme/darkMode';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../config/themes/themes';
import { MediumTextComponent } from '../Text/MediumText';
import { useTranslation } from 'react-i18next';
import { TourGuideZone } from 'rn-tourguide';

type SearchBarProps = {
  onSearchPress: () => void;
  onHelpPress: () => void;
};

export const HomeScreenSearchButtons = ({
  onSearchPress,
  onHelpPress,
}: SearchBarProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.searchBar}>
      <View style={staticStyle.searchBarContainer}>
        <TourGuideZone zone={2} text={t('tour2')}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onSearchPress}
            style={StyleSheet.flatten([
              staticStyle.searchContainer,
              styles.borderPrimary,
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
          </TouchableOpacity>
        </TourGuideZone>
      </View>
      <TourGuideZone zone={3} text={t('tour3')}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onHelpPress}
          style={staticStyle.helpButton}
        >
          <FastImage
            source={
              isDarkMode(theme) ? appIcons.ic_helpDark : appIcons.ic_helpLight
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
        </TouchableOpacity>
      </TourGuideZone>
    </View>
  );
};
