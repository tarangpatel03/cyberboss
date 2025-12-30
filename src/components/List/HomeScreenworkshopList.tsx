import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import { staticStyle, createStyles } from '../../screens/client/Home/styles';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../config/themes/themes';
import { appIcons } from '../../config/icons/iconPath';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { tWorkshopModel } from '../../models/formattedAPI/tConsultant';

type homeScreenWorkshopListProps = {
  data: tWorkshopModel[] | any[];
  navigateToWorkshop: () => void;
  renderItem: ListRenderItem<any>;
  type: string;
};

export const HomeScreenWorkshopList = (props: homeScreenWorkshopListProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View>
      <View style={staticStyle.header}>
        <MediumTextComponent
          text={
            props.type === t('workshop') ? t('workshop') : t('bookingHistory')
          }
          textStyle={StyleSheet.flatten([
            staticStyle.headerText,
            styles.headerText,
          ])}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={staticStyle.viewAllButton}
          onPress={props.navigateToWorkshop}
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
      <FlatList
        data={props.data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={props.renderItem}
        ListEmptyComponent={null}
        initialNumToRender={3}
      />
    </View>
  );
};
