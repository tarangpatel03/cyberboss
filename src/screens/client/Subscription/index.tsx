import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { routeName } from '../../../config/constants/routes';
import { rootNavigationProps } from '../../../models/navigationModal';
import { staticStyle } from './styles';
import { useEffect, useState } from 'react';
import { getAPIData } from '../../../services/api/common/getCommonApi';
import { WorkshopFlatListCard } from '../../../components/Cards/WorkShopFlatlistCard';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { SubscriptionHeader } from '../../../components/Headers/SubscriptionHeader';
import { SubscriptionTrustedUser } from '../../../components/SubscriptionTrustedUser';
import { SubscriptionBenefitsCard } from '../../../components/Cards/SubscriptionBenefitsCard';
import { UpcomingWorkShopsList } from '../../../components/List/UpcomingWorkShopsList';
import { SupscriptionBottomBar } from '../../../components/SupscriptionBottomBar';
import { apiClientHomeModel } from '../../../models/api/home';
import { tWorkshopModel } from '../../../models/formattedAPI/tConsultant';
import { transformClientHomeModal } from '../../../models/formattedAPI/tHome';

export type linearGradientDirection = {
  start: { x: number; y: number };
  end: { x: number; y: number };
};

export const SubscriptionScreen = ({
  navigation,
}: rootNavigationProps<routeName.Subscription>) => {
  const [workShopData, setWorkShopData] = useState<tWorkshopModel[]>([]);
  const start = { x: 0, y: 0.5 };
  const end = { x: 1, y: 0.5 };
  const loadData = async () => {
    try {
      const data: apiClientHomeModel = await getAPIData(endPoints.clientHome);
      const transformedData = transformClientHomeModal(data);
      setWorkShopData(transformedData.workshops);
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };
  const renderItem = ({ item }: any) => {
    return <WorkshopFlatListCard data={item} />;
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={staticStyle.container}>
        <SubscriptionHeader goBack={goBack} />
        <ScrollView
          style={staticStyle.mainContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={staticStyle.mainContainer2}>
            <SubscriptionTrustedUser start={start} end={end} />
            <SubscriptionBenefitsCard start={start} end={end} />
            <View style={staticStyle.saparator2} />
            <UpcomingWorkShopsList
              workShopData={workShopData}
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
        <SupscriptionBottomBar />
      </SafeAreaView>
    </>
  );
};
