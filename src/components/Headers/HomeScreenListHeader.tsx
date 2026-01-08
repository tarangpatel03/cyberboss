import { ListRenderItem, StyleSheet, View } from 'react-native';
import { createStyles, staticStyle } from '@screens/client/Home/styles';
import { Components } from '@components/index';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { TClientHomeModel } from '@models/formattedAPI/tHome';
import { THomeBookingModel } from '@models/formattedAPI/tBookings';
import { TWorkshopModel } from '@models/formattedAPI/tConsultant';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

type HomeScreenListHeaderProps = {
  homeData: TClientHomeModel;
  navigateToHistory: () => void;
  navigateToWorkshop: () => void;
  renderWorkshopItem: ListRenderItem<TWorkshopModel>;
  renderBookingItem: ListRenderItem<THomeBookingModel>;
};

export const HomeScreenListHeader = (
  props: HomeScreenListHeaderProps,
) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const isPro = useSelector((state: RootState) => state.user.isPro);

  return (
    <View style={staticStyle.container}>
      {isPro && props.homeData.workshops.length !== 0 && (
        <Components.List.HomeScreenWorkshopList
          data={props.homeData.workshops}
          type={t('workshop')}
          navigateToWorkshop={props.navigateToWorkshop}
          renderItem={props.renderWorkshopItem}
        />
      )}
      {props.homeData.bookings.length !== 0 && (
        <Components.List.HomeScreenWorkshopList
          data={props.homeData.bookings}
          type={t('bookingHistory')}
          navigateToWorkshop={props.navigateToHistory}
          renderItem={props.renderBookingItem}
        />
      )}
      <Components.Text.MediumTextComponent
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
