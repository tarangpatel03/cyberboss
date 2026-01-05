import { ListRenderItem, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import { staticStyle } from '@screens/client/Subscription/styles';
import { useCallback, useEffect, useState } from 'react';
import { getAPIData } from '@services/api/common/getCommonApi';
import { WorkshopFlatListCard } from '@components/Cards/WorkShopFlatlistCard';
import { endPoints } from '@config/endPoint/apiEndPoint';
import { SubscriptionHeader } from '@components/Headers/SubscriptionHeader';
import { SubscriptionBenefitsCard } from '@components/Cards/SubscriptionBenefitsCard';
import { UpcomingWorkShopsList } from '@components/List/UpcomingWorkShopsList';
import { TWorkshopModel } from '@models/formattedAPI/tConsultant';
import { ApiResponse } from '@models/apiModel';
import { SubscriptionBottomBar } from '@components/Subscription/SubscriptionBottomBar';
import { SubscriptionTrustedUser } from '@components/Subscription/SubscriptionTrustedUser';
import { ApiSubscriptionModel } from '@models/api/client';
import {
  transformSubscrptionModel,
  TSubscriptionModel,
} from '@models/formattedAPI/tclient';

export type linearGradientDirection = {
  start: { x: number; y: number };
  end: { x: number; y: number };
};

export const SubscriptionScreen = ({
  navigation,
}: RootNavigationProps<routeName.Subscription>) => {
  const [subscriptionData, setSubscriptionData] =
    useState<TSubscriptionModel>();
  const start = { x: 0, y: 0.5 };
  const end = { x: 1, y: 0.5 };
  const loadData = async () => {
    try {
      const response = await getAPIData<ApiResponse<ApiSubscriptionModel>>(
        endPoints.plans,
      );
      if (!response) return;
      const data: ApiSubscriptionModel = response.payload;
      const transformedData = transformSubscrptionModel(data);
      setSubscriptionData(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };
  const renderItem: ListRenderItem<TWorkshopModel> = useCallback(({ item }) => {
    return <WorkshopFlatListCard data={item} />;
  }, []);

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
            <SubscriptionTrustedUser
              direction={{ end: end, start: start }}
              noOfUser={subscriptionData?.currentUsers}
              userImages={subscriptionData?.currentUsersProfileImages}
            />
            <SubscriptionBenefitsCard benefits={subscriptionData?.benefits} />
            <View style={staticStyle.separator2} />
            <UpcomingWorkShopsList
              workShopData={subscriptionData?.workshops}
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
        <SubscriptionBottomBar
          duration={subscriptionData?.duration}
          price={subscriptionData?.price}
        />
      </SafeAreaView>
    </>
  );
};
