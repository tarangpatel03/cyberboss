import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import {
  createStyles,
  staticStyle,
} from '@screens/client/ConsultantProfile/styles';
import { Theme } from '@config/themes/themes';
import { getAPIData } from '@services/api/common/getCommonApi';
import { memo, useCallback, useEffect, useState } from 'react';
import { routeName } from '@config/constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigationProps } from '@models/navigationModel';
import { useTranslation } from 'react-i18next';
import {
  TConsultantDetailsModel,
  transformConsultantDetailsModel,
  TRatingReviewModel,
} from '@models/formattedAPI/tConsultant';
import { ApiConsultantDetailsModel } from '@models/api/consultant';
import { ApiResponse } from '@models/apiModel';
import { Config } from '@config/index';
import { Components } from '@components/index';
import FastImage from 'react-native-fast-image';
import { Rating } from 'react-native-ratings';
import { Utils } from '@utils/index.ts';

export const ConsultantProfileScreen = ({
  navigation,
  route,
}: RootNavigationProps<routeName.ConsultantProfile>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { consultantId, type } = route.params;
  const [profilePictureError, setProfilePictureError] =
    useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [data, setData] = useState<TConsultantDetailsModel>({
    id: '',
    bio: '',
    name: '',
    rate: '',
    services: [],
    expertises: [],
    totalRatings: 0,
    bookingsCount: 0,
    averageRatings: 0,
    ratingReviews: [],
    experienceYear: '',
    profilePicture: undefined,
  });

  const goBack = () => {
    navigation.goBack();
  };

  const renderItemReview: ListRenderItem<TRatingReviewModel> = useCallback(
    ({ item }) => {
      return (
        <ReviewCard
          clientId={item.clientId}
          clientName={item.clientName}
          clientProfilePicture={item.clientProfilePicture}
          createdAt={item.createdAt}
          id={item.id}
          rating={item.rating}
          review={item.review}
        />
      );
    },
    [],
  );

  const navigateToBookingDetails = () => {
    navigation.navigate(routeName.BookingDetails, {
      consultantId: data.id,
      type,
    });
  };

  const loadData = async () => {
    try {
      const response = await getAPIData<ApiResponse<ApiConsultantDetailsModel>>(
        `${Config.endPoints.consultant}/${consultantId}`,
      );
      if (!response) return;
      const resData: ApiConsultantDetailsModel = response.payload;
      const transformedData = transformConsultantDetailsModel(resData);
      setData(transformedData);
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
    }
  };

  const renderItem = ({ item }: any) => {
    return <RatingCard item={item} />;
  };

  useEffect(() => {
    loadData().then(() => setLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.primaryBg])}
      >
        <Components.Headers.ScreenHeader onPress={goBack} />
        {loader && <Components.Skeleton.ConsultantProfileScreenShimmer />}
        {!loader && (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/*<Components.Headers.ConsultantProfileHeader data={data}/>*/}
              <View style={staticStyle.profileContainer}>
                <View
                  style={StyleSheet.flatten([
                    staticStyle.rowLine,
                    staticStyle.titleLine,
                  ])}
                >
                  <FastImage
                    source={
                      profilePictureError
                        ? Config.appImages.img_defaultProfile
                        : Utils.getProfilePicture(data.profilePicture)
                    }
                    onError={() => setProfilePictureError(true)}
                    style={staticStyle.image}
                  />
                  <View>
                    <Components.TextComponent
                      family={'medium'}
                      text={data.name}
                      textStyle={StyleSheet.flatten([
                        staticStyle.titleText,
                        styles.primaryText,
                      ])}
                    />
                    <View style={staticStyle.rowLine}>
                      <Components.TextComponent
                        family={'regular'}
                        text={data.expertises.at(0)?.name || ''}
                        textStyle={StyleSheet.flatten([
                          staticStyle.subTitleText,
                          staticStyle.leftMoveText,
                          styles.secondaryText,
                        ])}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={StyleSheet.flatten([
                    staticStyle.rowLine,
                    staticStyle.line,
                  ])}
                >
                  <Components.ConsultantInfoBadge
                    imagePath={Config.appIcons.ic_cash}
                    text={`$${Number(data.rate)}/hr`}
                  />
                  <Components.ConsultantInfoBadge
                    imagePath={Config.appIcons.ic_experience}
                    text={`${data.experienceYear}y Exp.`}
                  />
                  {data.bookingsCount > 0 && (
                    <Components.ConsultantInfoBadge
                      imagePath={Config.appIcons.ic_check}
                      text={Utils.formatBooking(data.bookingsCount)}
                    />
                  )}
                </View>
              </View>
              <View
                style={StyleSheet.flatten([
                  staticStyle.separator,
                  styles.separator,
                ])}
              />
              <View style={staticStyle.secondaryContainer}>
                <Components.TextComponent
                  family={'medium'}
                  text={t('about')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.semiTitleText,
                    styles.primaryText,
                  ])}
                />
                <Components.TextComponent
                  family={'regular'}
                  text={data.bio}
                  noOfLines={20}
                  textStyle={StyleSheet.flatten([
                    staticStyle.subTitleText,
                    styles.secondaryText,
                  ])}
                />
              </View>
              <View
                style={StyleSheet.flatten([
                  staticStyle.separator,
                  styles.separator,
                ])}
              />
              <View style={staticStyle.secondaryContainer}>
                <Components.TextComponent
                  family={'medium'}
                  text={t('expertiseAndServices')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.semiTitleText,
                    styles.primaryText,
                  ])}
                />
                <View style={staticStyle.listContainer}>
                  {data.expertises.length > 0 &&
                    data.expertises.map(item => (
                      <Components.ConsultantInfoBadge
                        image={item.image}
                        text={item.name}
                        key={item.id}
                      />
                    ))}
                </View>
                <View
                  style={StyleSheet.flatten([
                    staticStyle.separator2,
                    styles.separator,
                  ])}
                />
                <View style={staticStyle.listContainer}>
                  {data.services.length > 0 &&
                    data.services.map(item => (
                      <Components.ConsultantInfoBadge
                        text={item.name}
                        key={item.id}
                      />
                    ))}
                </View>
              </View>
              <View
                style={StyleSheet.flatten([
                  staticStyle.separator,
                  styles.separator,
                ])}
              />
              <Components.ListItems.ConsultantRatingsList
                data={data}
                renderItem={renderItem}
              />
              <FlatList
                data={data.ratingReviews}
                scrollEnabled={false}
                keyExtractor={item => item.id}
                renderItem={renderItemReview}
                showsVerticalScrollIndicator={false}
                initialNumToRender={6}
                ListEmptyComponent={null}
              />
            </ScrollView>
            <View
              style={StyleSheet.flatten([
                staticStyle.bottomBar,
                styles.separator,
              ])}
            >
              <Components.TextComponent
                family={'medium'}
                text={`$${Number(data.rate)}/hr`}
                textStyle={StyleSheet.flatten([
                  staticStyle.ratingText,
                  styles.primaryText,
                ])}
              />
              <Components.Buttons.PrimaryButton
                onPress={navigateToBookingDetails}
                text={t('bookNow')}
                buttonStyle={staticStyle.bookNowButton}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

type ReviewCardProps = {
  item: any;
};

export const RatingCard = memo((props: ReviewCardProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.titleLine}>
      <View
        style={StyleSheet.flatten([staticStyle.separator2, styles.separator])}
      />
      <View style={StyleSheet.flatten([staticStyle.rowLine, staticStyle.line])}>
        <FastImage
          style={staticStyle.reviewImage}
          source={props.item.profileImage}
        />
        <Components.TextComponent
          family={'medium'}
          text={props.item.name}
          textStyle={StyleSheet.flatten([
            staticStyle.subTitleText,
            styles.primaryText,
          ])}
        />
        <Components.TextComponent
          family={'regular'}
          textStyle={StyleSheet.flatten([
            staticStyle.tinyText,
            styles.secondaryText,
          ])}
          text={props.item.date}
        />
      </View>
      <Rating
        readonly
        imageSize={15}
        ratingCount={5}
        style={staticStyle.rating}
        tintColor={theme.colors.bgPrimary}
        startingValue={props.item.rating}
      />
      <Components.TextComponent
        family={'regular'}
        text={props.item.review}
        noOfLines={20}
        textStyle={StyleSheet.flatten([
          staticStyle.subTitleText,
          styles.secondaryText,
        ])}
      />
    </View>
  );
});

export const ReviewCard = memo((props: TRatingReviewModel) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.reviewCard}>
      <View
        style={StyleSheet.flatten([staticStyle.separator2, styles.separator])}
      />
      <View style={StyleSheet.flatten([staticStyle.rowLine, staticStyle.line])}>
        <FastImage
          style={staticStyle.reviewImage}
          source={Config.appImages.img_defaultProfile}
        />
        <Components.TextComponent
          family={'medium'}
          text={props.clientName}
          textStyle={StyleSheet.flatten([
            staticStyle.subTitleText,
            styles.primaryText,
          ])}
        />
        <View
          style={StyleSheet.flatten([
            staticStyle.bulletPoint,
            styles.bulletPoint,
          ])}
        />
        <Components.TextComponent
          family={'regular'}
          textStyle={StyleSheet.flatten([
            staticStyle.tinyText,
            styles.secondaryText,
          ])}
          text={Utils.getFullDate(props.createdAt)}
        />
      </View>
      <Rating
        readonly
        imageSize={15}
        ratingCount={5}
        style={staticStyle.rating}
        tintColor={theme.colors.bgPrimary}
        startingValue={Number(props.rating)}
      />
      <Components.TextComponent
        family={'regular'}
        textStyle={StyleSheet.flatten([
          staticStyle.tinyText,
          styles.secondaryText,
        ])}
        noOfLines={7}
        text={props.review ?? ''}
      />
    </View>
  );
});
