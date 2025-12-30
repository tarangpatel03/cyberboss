import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { appIcons } from '../../config/icons/iconPath';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { staticStyle } from '../../screens/client/Subscription/styles';
import { ListRenderItem, View, StyleSheet, FlatList } from 'react-native';
import { tWorkshopModel } from '../../models/formattedAPI/tConsultant';

type upcomingWorkshopsListProps = {
  workShopData: tWorkshopModel[];
  renderItem: ListRenderItem<tWorkshopModel>;
};

export const UpcomingWorkShopsList = (props: upcomingWorkshopsListProps) => {
  const { t } = useTranslation();
  return (
    <View style={staticStyle.benefits}>
      <View style={staticStyle.benefitLine}>
        <FastImage source={appIcons.ic_energy} style={staticStyle.energyIcon} />
        <MediumTextComponent
          text={t('upcomingWorkshops')}
          textStyle={StyleSheet.flatten([
            staticStyle.text16500,
            staticStyle.latterSpace,
          ])}
        />
        <FastImage source={appIcons.ic_energy} style={staticStyle.energyIcon} />
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
