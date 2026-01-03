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
} from '@screens/consultant/Home/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Theme } from '@config/themes/themes';
import { appIcons } from '@config/icons/iconPath';
import { MediumTextComponent } from '@components/Text/MediumText';
import { RegularTextComponent } from '@components/Text/RegularText';
import { THomeBookingModel } from '@models/formattedAPI/tBookings';

type ConsultantBookingHistoryListProps = {
  data: THomeBookingModel[];
  renderBookingHistoryItem: ListRenderItem<THomeBookingModel>;
};

export const ConsultantBookingHistoryList = (
  props: ConsultantBookingHistoryListProps,
) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View>
      {props.data.length !== 0 && (
        <View style={staticStyle.header}>
          <MediumTextComponent
            text={t('bookingHistory')}
            textStyle={StyleSheet.flatten([
              staticStyle.headerText,
              styles.textPrimary,
            ])}
          />
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
        </View>
      )}
      <FlatList
        data={props.data}
        horizontal
        contentContainerStyle={staticStyle.listItems}
        initialNumToRender={3}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={props.renderBookingHistoryItem}
        ListEmptyComponent={null}
      />
    </View>
  );
};
