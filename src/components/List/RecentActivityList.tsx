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
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { ListEmptyCard } from '../Cards/ListEmptyCard';
import { IConsultantHomeNotificationModel } from '../../models/formattedAPI/tHome';

type recentActivityProps = {
  data: IConsultantHomeNotificationModel[];
  renderRecentActivityItem: ListRenderItem<IConsultantHomeNotificationModel>;
};

export const RecentActivityList = (props: recentActivityProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View>
      <View style={staticStyle.header}>
        <MediumTextComponent
          text={t('recentActivity')}
          textStyle={StyleSheet.flatten([
            staticStyle.headerText,
            styles.textPrimary,
          ])}
        />
        {props.data.length !== 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={staticStyle.viewAllButton}
          >
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
        )}
      </View>
      <FlatList
        data={props.data}
        scrollEnabled={false}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={staticStyle.listItems}
        keyExtractor={item => item.id}
        renderItem={props.renderRecentActivityItem}
        ListEmptyComponent={<ListEmptyCard text={t('noRecentActivityFound')} />}
      />
    </View>
  );
};
