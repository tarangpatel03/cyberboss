import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
  transformSubscriptionModel,
  TSubscriptionModel,
} from '@models/formattedAPI/tClient.ts';
import { Config } from '@config/index';
import { Components } from '@components/index';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { Utils } from '@utils/index.ts';

export const SubscriptionScreen = ({
  navigation,
}: RootNavigationProps<routeName.Subscription>) => {
  const [subscriptionData, setSubscriptionData] =
    useState<TSubscriptionModel>();
  const start = { x: 0, y: 0.5 };
  const { t } = useTranslation();
  const end = { x: 1, y: 0.5 };

  const loadData = async () => {
    try {
      const response = await getAPIData<ApiResponse<ApiSubscriptionModel>>(
        Config.endPoints.plans,
      );
      if (!response) return;
      const data: ApiSubscriptionModel = response.payload;
      const transformedData = transformSubscriptionModel(data);
      setSubscriptionData(transformedData);
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
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
        <View style={staticStyle.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={goBack}
            style={staticStyle.cancelButton}
          >
            <FastImage
              source={Config.appIcons.ic_cancel}
              style={staticStyle.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={staticStyle.restoreButton}
          >
            <FastImage
              source={Config.appIcons.ic_refresh}
              style={staticStyle.headerIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Components.TextComponent
              family={'medium'}
              text={t('restore')}
              textStyle={staticStyle.text14500}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={staticStyle.mainContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={staticStyle.mainContainer2}>
            <View style={staticStyle.horizontal8}>
              <Components.TextComponent
                family={'medium'}
                text={t('kyoraIQ')}
                textStyle={staticStyle.text24500}
              />
              <LinearGradient
                end={end}
                start={start}
                style={staticStyle.proContainer}
                colors={[
                  Config.appColors.app_FFD84D,
                  Config.appColors.app_FFE893,
                  Config.appColors.app_FFD84D,
                ]}
              >
                <Components.TextComponent
                  family={'semiBold'}
                  text={t('pro')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.text16400,
                    staticStyle.proText,
                  ])}
                />
              </LinearGradient>
            </View>
            <View style={staticStyle.trustedUserContainer}>
              <LinearGradient
                colors={[
                  Config.appColors.app_3554FF,
                  Config.appColors.app_111D5F,
                ]}
                end={end}
                start={start}
                style={staticStyle.features}
              >
                <FastImage
                  source={Config.appIcons.ic_proFeatures}
                  style={staticStyle.featuresIcon}
                />
                <Components.TextComponent
                  family={'regular'}
                  text={t('unlockExpertLedWorkshops')}
                  textStyle={staticStyle.text14400}
                />
              </LinearGradient>
              {subscriptionData?.currentUsers !== 0 && (
                <View style={staticStyle.horizontal12}>
                  <View style={[staticStyle.horizontalUsers]}>
                    <FastImage
                      source={Utils.getProfilePicture(
                        subscriptionData?.currentUsersProfileImages?.[0] ?? '',
                      )}
                      style={staticStyle.trustedUserImage}
                    />
                    <FastImage
                      source={Utils.getProfilePicture(
                        subscriptionData?.currentUsersProfileImages?.[1] ?? '',
                      )}
                      style={StyleSheet.flatten([
                        staticStyle.trustedUserImage,
                        staticStyle.trustedUserImage2,
                      ])}
                    />
                    <FastImage
                      source={Utils.getProfilePicture(
                        subscriptionData?.currentUsersProfileImages?.[2] ?? '',
                      )}
                      style={StyleSheet.flatten([
                        staticStyle.trustedUserImage,
                        staticStyle.trustedUserImage3,
                      ])}
                    />
                    <FastImage
                      source={Utils.getProfilePicture(
                        subscriptionData?.currentUsersProfileImages?.[3] ?? '',
                      )}
                      style={StyleSheet.flatten([
                        staticStyle.trustedUserImage,
                        staticStyle.trustedUserImage4,
                      ])}
                    />
                    <FastImage
                      source={Utils.getProfilePicture(
                        subscriptionData?.currentUsersProfileImages?.[4] ?? '',
                      )}
                      style={StyleSheet.flatten([
                        staticStyle.trustedUserImage,
                        staticStyle.trustedUserImage5,
                      ])}
                    />
                  </View>
                  <Components.TextComponent
                    family={'regular'}
                    text={`Trusted By ${
                      subscriptionData?.currentUsers ?? 0
                    } Users`}
                    textStyle={staticStyle.text14400}
                  />
                </View>
              )}
            </View>
            <LinearGradient
              end={end}
              start={start}
              style={staticStyle.benefitContainer}
              colors={[
                Config.appColors.app_20212680,
                Config.appColors.app_202126,
                Config.appColors.app_20212680,
              ]}
            >
              <View style={staticStyle.benefitLine}>
                <FastImage
                  source={Config.appIcons.ic_energy}
                  style={staticStyle.energyIcon}
                />
                <Components.TextComponent
                  family={'medium'}
                  text={t('benefits')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.text16500,
                    staticStyle.latterSpace,
                  ])}
                />
                <FastImage
                  source={Config.appIcons.ic_energy}
                  style={staticStyle.energyIcon}
                />
              </View>
              <LinearGradient
                colors={[
                  Config.appColors.app_FFFFFF40,
                  Config.appColors.app_FFFFFF00,
                  Config.appColors.app_FFFFFF40,
                ]}
                end={end}
                start={start}
                style={staticStyle.separator}
              />
              <FlatList
                data={subscriptionData?.benefits}
                scrollEnabled={false}
                contentContainerStyle={staticStyle.benefits}
                keyExtractor={item => item}
                renderItem={({ item, index }) => (
                  <SubscriptionBenefits props={item} count={index} />
                )}
              />
            </LinearGradient>
            {subscriptionData?.workshops.length !== 0 && (
              <>
                <View style={staticStyle.separator2} />
                <View style={staticStyle.benefits}>
                  <View style={staticStyle.benefitLine}>
                    <FastImage
                      source={Config.appIcons.ic_energy}
                      style={staticStyle.energyIcon}
                    />
                    <Components.TextComponent
                      family={'medium'}
                      text={t('upcomingWorkshops')}
                      textStyle={StyleSheet.flatten([
                        staticStyle.text16500,
                        staticStyle.latterSpace,
                      ])}
                    />
                    <FastImage
                      source={Config.appIcons.ic_energy}
                      style={staticStyle.energyIcon}
                    />
                  </View>
                  <FlatList
                    contentContainerStyle={staticStyle.listItems}
                    data={subscriptionData?.workshops}
                    initialNumToRender={4}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    ListEmptyComponent={null}
                  />
                </View>
              </>
            )}
          </View>
        </ScrollView>
        <View style={staticStyle.bottomButton}>
          <View style={staticStyle.bottomLine}>
            <View style={staticStyle.horizontal}>
              <Components.TextComponent
                family={'medium'}
                text={subscriptionData?.price ?? ''}
                textStyle={staticStyle.text20500}
              />
              <Components.TextComponent
                family={'regular'}
                text={`/${subscriptionData?.duration?.slice(0, 2) ?? ''}`}
                textStyle={staticStyle.text16500Secondary}
              />
            </View>
            <View style={staticStyle.monthlyContainer}>
              <Components.TextComponent
                family={'medium'}
                text={subscriptionData?.duration?.toUpperCase() ?? ''}
                textStyle={staticStyle.text12500}
              />
            </View>
          </View>
          <Components.Buttons.PrimaryButton
            onPress={() => {}}
            icon={Config.appIcons.ic_next}
            text={t('subscribeNow')}
            buttonStyle={staticStyle.button}
            textStyle={staticStyle.text16500}
          />
          <View style={staticStyle.lastLine}>
            <Components.TextComponent
              family={'regular'}
              text={t('termsOfUse')}
              textStyle={staticStyle.text12500}
            />
            <View style={staticStyle.dot} />
            <Components.TextComponent
              family={'regular'}
              text={t('privacyPolicy')}
              textStyle={staticStyle.text12500}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export const SubscriptionBenefits = ({
  count,
  props,
}: {
  props: string;
  count: number;
}) => {
  const getGoldenGradient = () => {
    return [
      Config.appColors.app_FFD84D12,
      Config.appColors.app_FFE89312,
      Config.appColors.app_FFD84D12,
    ];
  };

  const getImage = () => {
    if (count === 0) return Config.appIcons.ic_calender2;
    if (count === 1) return Config.appIcons.ic_chat;
    if (count === 2) return Config.appIcons.ic_book;
  };

  const start = { x: 0, y: 0.5 };
  const end = { x: 1, y: 0.5 };

  return (
    <View style={staticStyle.horizontal8}>
      <LinearGradient
        colors={getGoldenGradient()}
        end={end}
        start={start}
        style={staticStyle.benefitImageContainer}
      >
        <FastImage source={getImage()} style={staticStyle.energyIcon} />
      </LinearGradient>
      <Components.TextComponent
        family={'regular'}
        text={props ?? ''}
        textStyle={staticStyle.text14400}
      />
    </View>
  );
};
