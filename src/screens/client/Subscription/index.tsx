import { ListRenderItem, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import { staticStyle } from '@screens/client/Subscription/styles';
import { useCallback, useEffect, useState } from 'react';
import { getAPIData } from '@services/api/common/getCommonApi';
import { TWorkshopModel } from '@models/formattedAPI/tConsultant';
import { ApiResponse } from '@models/apiModel';
import { ApiSubscriptionModel } from '@models/api/client';
import {
  transformSubscrptionModel,
  TSubscriptionModel,
} from '@models/formattedAPI/tclient';
import { Config } from '@config/index';
import { Components } from '@components/index';

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
        Config.endPoints.plans,
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
    return <Components.Cards.WorkshopFlatListCard data={item} />;
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={staticStyle.container}>
        <Components.Headers.SubscriptionHeader goBack={goBack} />
        <ScrollView
          style={staticStyle.mainContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={staticStyle.mainContainer2}>
            <Components.Subscription.SubscriptionTrustedUser
              direction={{ end: end, start: start }}
              noOfUser={subscriptionData?.currentUsers}
              userImages={subscriptionData?.currentUsersProfileImages}
            />
            <Components.Cards.SubscriptionBenefitsCard benefits={subscriptionData?.benefits} />
            <View style={staticStyle.separator2} />
            <Components.List.UpcomingWorkShopsList
              workShopData={subscriptionData?.workshops}
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
        <Components.Subscription.SubscriptionBottomBar
          duration={subscriptionData?.duration}
          price={subscriptionData?.price}
        />
      </SafeAreaView>
    </>
  );
};
