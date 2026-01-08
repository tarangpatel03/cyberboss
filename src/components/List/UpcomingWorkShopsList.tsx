import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Components } from '@components/index';
import { staticStyle } from '@screens/client/Subscription/styles';
import { ListRenderItem, View, StyleSheet, FlatList } from 'react-native';
import { TSubscriptionWorkshop } from '@models/formattedAPI/tclient';
import { Config } from '@config/index';

type UpcomingWorkshopsListProps = {
  workShopData: TSubscriptionWorkshop[] | undefined;
  renderItem: ListRenderItem<TSubscriptionWorkshop>;
};

export const UpcomingWorkShopsList = (props: UpcomingWorkshopsListProps) => {
  const { t } = useTranslation();
  return (
    <View style={staticStyle.benefits}>
      <View style={staticStyle.benefitLine}>
        <FastImage source={Config.appIcons.ic_energy} style={staticStyle.energyIcon} />
        <Components.Text.MediumTextComponent
          text={t('upcomingWorkshops')}
          textStyle={StyleSheet.flatten([
            staticStyle.text16500,
            staticStyle.latterSpace,
          ])}
        />
        <FastImage source={Config.appIcons.ic_energy} style={staticStyle.energyIcon} />
      </View>
      <FlatList
        contentContainerStyle={staticStyle.listItems}
        data={props.workShopData}
        initialNumToRender={4}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={props.renderItem}
        ListEmptyComponent={null}
      />
    </View>
  );
};
