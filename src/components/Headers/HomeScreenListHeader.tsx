import { ListRenderItem, StyleSheet, View } from 'react-native';
import { createStyles, staticStyle } from '../../screens/client/Home/styles';
import { HomeScreenWorkshopList } from '../List/HomeScreenWorkshopList';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../config/themes/themes';
import { tClientHomeModel } from '../../models/formattedAPI/tHome';
import { tHomeBookingModel } from '../../models/formattedAPI/tBookings';
import { tWorkshopModel } from '../../models/formattedAPI/tConsultant';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/store';

type homeScreenListHeaderProps = {
  homeData: tClientHomeModel;
  navigateToHistory: () => void;
  navigateToWorkshop: () => void;
  renderWorkshopItem: ListRenderItem<tWorkshopModel>;
  renderBookingItem: ListRenderItem<tHomeBookingModel>;
};

export const HomeScreenListHeaderComponent = (
  props: homeScreenListHeaderProps,
) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const isPro = useSelector((state: rootState) => state.user.isPro);

  return (
    <View style={staticStyle.container}>
      {isPro && props.homeData.workshops.length !== 0 && (
        <HomeScreenWorkshopList
          data={props.homeData.workshops}
          type={t('workshop')}
          navigateToWorkshop={props.navigateToWorkshop}
          renderItem={props.renderWorkshopItem}
        />
      )}
      {props.homeData.bookings.length !== 0 && (
        <HomeScreenWorkshopList
          data={props.homeData.bookings}
          type={t('bookingHistory')}
          navigateToWorkshop={props.navigateToHistory}
          renderItem={props.renderBookingItem}
        />
      )}
      <MediumTextComponent
        text={t('browseServices')}
        textStyle={StyleSheet.flatten([
          staticStyle.header,
          staticStyle.headerText,
          styles.headerText,
        ])}
      />
    </View>
  );
};
