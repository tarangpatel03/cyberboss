import { StyleSheet, View } from 'react-native';
import { createStyles, staticStyle } from '../../screens/client/Home/styles';
import { HomeScreenworkshopList } from '../List/HomeScreenworkshopList';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../config/themes/themes';
import { tClientHomeModel } from '../../models/formattedAPI/tHome';

type homeScreenListHeaderProps = {
  homeData: tClientHomeModel;
  navigateToWorkshop: () => void;
  renderWorkshopItem: ({ item }: any) => React.JSX.Element;
  renderBookingItem: ({ item }: any) => React.JSX.Element;
};

export const HomeScreenListHeaderComponent = (
  props: homeScreenListHeaderProps,
) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.container}>
      {props.homeData.workshops.length !== 0 && (
        <HomeScreenworkshopList
          data={props.homeData.workshops}
          type={t('workshop')}
          navigateToWorkshop={props.navigateToWorkshop}
          renderItem={props.renderWorkshopItem}
        />
      )}
      {props.homeData.bookings.length !== 0 && (
        <HomeScreenworkshopList
          data={props.homeData.bookings}
          type={t('bookingHistory')}
          navigateToWorkshop={props.navigateToWorkshop}
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
