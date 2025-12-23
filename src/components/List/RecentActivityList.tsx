import {
  ListRenderItem,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  createStyles,
  staticStyle,
} from '../../screens/consultant/home/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Theme } from '../../config/themes/themes';
import { appIcons } from '../../config/icons/iconPath';
import { recentActivities } from '../../demoData/homeScreenData';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';

type recentActivityProps = {
  renderRecentActivityItem: ListRenderItem<any>;
};

export const RecentActivityList = (props: recentActivityProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View>
      <View style={staticStyle.header}>
        <MediumTextComponent
          text={t('bookingHistory')}
          textStyle={StyleSheet.flatten([
            staticStyle.headerText,
            styles.textPrimary,
          ])}
        />
        <TouchableOpacity activeOpacity={0.7} style={staticStyle.viewAllButton}>
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
        </TouchableOpacity>
      </View>
      <FlatList
        data={recentActivities}
        scrollEnabled={false}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={staticStyle.listItems}
        keyExtractor={item => item.id}
        renderItem={props.renderRecentActivityItem}
        ListEmptyComponent={null}
      />
    </View>
  );
};
