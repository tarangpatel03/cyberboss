import {FlatList, ListRenderItem, RefreshControl, StyleSheet, TouchableOpacity, View,} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@config/themes/themes';
import {createStyles, staticStyle} from '@screens/client/Home/styles';
import React, {useCallback, useEffect, useState} from 'react';
import {RootNavigationProps} from '@models/navigationModel';
import {routeName} from '@config/constants/routes';
import {TourGuideZone, useTourGuideController} from 'rn-tourguide';
import {useIsFocused} from '@react-navigation/native';
import {setShowTour} from '@redux/features/userSlice';
import {useClientHome} from '@screens/client/Home/useClientHome';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {TExpertiseModel, TWorkshopModel,} from '@models/formattedAPI/tConsultant';
import firestore from '@react-native-firebase/firestore';
import {THomeBookingModel} from '@models/formattedAPI/tBookings';
import {RootState} from '@redux/store';
import {Components} from '@components/index';
import {TClientHomeModel} from "@models/formattedAPI/tHome.ts";
import {Config} from "@config/index.ts";
import FastImage from "react-native-fast-image";
import {Utils} from "@utils/index.ts";
import LinearGradient from "react-native-linear-gradient";

export const ClientHomeScreen = ({
                                     navigation,
                                 }: RootNavigationProps<routeName.Home>) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const theme = useTheme<Theme>();
    const isFocused = useIsFocused();
    const styles = createStyles(theme);
    const {name, profilePicture} = useSelector(
        (state: RootState) => state.user.userData,
    );
    const [profileImageError, setProfileImageError] = useState<boolean>(false);
    const userIdRead = useSelector((state: RootState) => state.user.userData.id);
    const [layoutReady, setLayoutReady] = useState(false);
    const handleOnStop = () => dispatch(setShowTour(false));
    const {canStart, start, eventEmitter} = useTourGuideController();
    const showTour = useSelector((state: RootState) => state.user.showTour);
    const {loader, refreshing, homeData, onRefresh} = useClientHome();

    const navigateToWorkshop = () => {
        navigation.navigate(routeName.Workshop);
    };

    const navigateToConsultantList = (id: string, name: string) => {
        navigation.navigate(routeName.ConsultantList, {id, name});
    };

    const navigateToNotification = () => {
        navigation.navigate(routeName.Notification);
    };

    const navigateToSubscription = () => {
        navigation.navigate(routeName.Subscription);
    };

    const navigateToSearchService = () => {
        navigation.navigate(routeName.SearchServices);
    };

    const navigateToProfile = () => {
        navigation.navigate(routeName.Profile);
    };

    const navigateToBookingSummary = (id: string) => {
        navigation.navigate(routeName.BookingSummary, {id});
    };

    const navigateToHistory = () => {
        navigation.navigate(routeName.History);
    };

    const navigateToContactSupport = () => {
        navigation.navigate(routeName.ContactSupport);
    };

    const renderWorkshopItem: ListRenderItem<TWorkshopModel> = useCallback(
        ({item}) => <Components.Cards.WorkshopCard data={item} cardStyle={staticStyle.card}/>,
        [],
    );

    const navigateToChat = async ({
                                      bookingId,
                                      id,
                                      image,
                                      name,
                                  }: {
        bookingId: string;
        id: string;
        image: string | number | { uri: string } | undefined;
        name: string;
    }) => {
        const data = await firestore()
            .collection('chats')
            .doc(`booking_${bookingId}`)
            .get()
            .then(snapshot => {
                return {
                    id: snapshot.id,
                    ...snapshot.data(),
                };
            });

        if (data) {
            navigation.navigate(routeName.OneOnOneChat, {
                consultantImage: image,
                consultantName: name,
                userID: userIdRead,
                chatID: `booking_${bookingId}`,
            });
        } else {
            await firestore()
                .collection('chats')
                .doc(`booking_${bookingId}`)
                .set({
                    bookingId: bookingId,
                    users: [userIdRead, id],
                    unreadCount: {
                        [`${id}`]: 0,
                        [`${userIdRead}`]: 0,
                    },
                    lastSeenTimestamp: {
                        [`${id}`]: firestore.FieldValue.serverTimestamp(),
                        [`${userIdRead}`]: firestore.FieldValue.serverTimestamp(),
                    },
                    onlineStatus: {
                        [`${id}`]: false,
                        [`${userIdRead}`]: true,
                    },
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });
            navigation.navigate(routeName.OneOnOneChat, {
                consultantImage: image,
                consultantName: name,
                userID: userIdRead,
                chatID: `booking_${bookingId}`,
            });
        }
    };

    const renderBookingItem: ListRenderItem<THomeBookingModel> = useCallback(
        ({item}) => (
            <Components.Cards.BookingHistoryCard navigateToSummary={navigateToBookingSummary} data={item}
                                                 navigateToChat={navigateToChat}/>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const renderBrowseServiceItem: ListRenderItem<TExpertiseModel> = useCallback(
        ({item}) => (
            <Components.Cards.ServiceCard onPress={navigateToConsultantList} data={item}/>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const headerComponent = () => {
        return (
            <HomeScreenListHeader
                homeData={homeData}
                navigateToHistory={navigateToHistory}
                navigateToWorkshop={navigateToWorkshop}
                navigateToBookingSummary={navigateToBookingSummary}
                renderWorkshopItem={renderWorkshopItem}
                renderBookingItem={renderBookingItem}
            />
        );
    };

    useEffect(() => {
        const dataLoaded =
            homeData.workshops.length > 0 ||
            homeData.bookings.length > 0 ||
            homeData.expertises.length > 0;

        if (
            showTour &&
            isFocused &&
            !loader &&
            layoutReady &&
            dataLoaded &&
            canStart
        ) {
            setTimeout(() => {
                start();
            }, 300);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showTour, isFocused, loader, layoutReady, homeData, canStart]);

    useEffect(() => {
        eventEmitter?.on('stop', handleOnStop);

        return () => {
            eventEmitter?.off('stop', handleOnStop);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loader && <Components.Skeleton.ClientHomeScreenShimmer/>}
            {!loader && (
                <View
                    onLayout={() => setLayoutReady(true)}
                    style={StyleSheet.flatten([
                        staticStyle.background,
                        styles.background,
                    ])}
                >
                    <LinearGradient
                        style={staticStyle.topBar}
                        colors={[Config.appColors.app_3554FF26, Config.appColors.app_3554FF00]}
                    >
                        <View style={staticStyle.profileInfo}>
                            <TouchableOpacity activeOpacity={0.7} onPress={navigateToProfile}>
                                <View style={staticStyle.profilePictureName}>
                                    <FastImage
                                        source={
                                            profileImageError
                                                ? Config.appImages.img_defaultProfile
                                                : profilePicture
                                                    ? Utils.getProfilePicture(profilePicture)
                                                    : Config.appImages.img_defaultProfile
                                        }
                                        style={staticStyle.image}
                                        onError={() => setProfileImageError(true)}
                                    />
                                    <Components.TextComponent
                                        family={'semiBold'}
                                        text={name}
                                        textStyle={StyleSheet.flatten([
                                            staticStyle.profileText,
                                            styles.profileText,
                                        ])}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View style={staticStyle.profilePictureName}>
                                {homeData.isSubscriber ? (
                                    <FastImage
                                        source={Config.appImages.img_proUser}
                                        style={staticStyle.proUser}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                ) : (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={navigateToSubscription}
                                    >
                                        <FastImage
                                            source={Config.appImages.img_freeUser}
                                            style={staticStyle.proUser}
                                            resizeMode={FastImage.resizeMode.contain}
                                        />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={navigateToNotification}
                                >
                                    <FastImage
                                        tintColor={theme.colors.textPrimary}
                                        source={Config.appIcons.ic_notificationBell}
                                        style={staticStyle.bellButton}
                                    />
                                    {/*
                                        <View
                                            style={StyleSheet.flatten([
                                            staticStyle.notificationDot,
                                            styles.background,
                                            ])}
                                        >
                                            <View style={staticStyle.notificationDotInner} />
                                        </View>
                                    */}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={staticStyle.searchBar}>
                        <TourGuideZone zone={2} text={t('tour2')}>
                            <View style={staticStyle.searchBarContainer}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={navigateToSearchService}
                                    style={StyleSheet.flatten([
                                        staticStyle.searchContainer,
                                        styles.borderPrimary,
                                    ])}
                                >
                                    <FastImage
                                        source={Config.appIcons.ic_search}
                                        style={staticStyle.searchIcon}
                                    />
                                    <Components.TextComponent
                                        text={t('searchPlaceHolder')}
                                        family={'regular'}
                                        textStyle={StyleSheet.flatten([
                                            staticStyle.headerText,
                                            styles.helpText,
                                        ])}
                                    />
                                </TouchableOpacity>
                            </View>
                        </TourGuideZone>
                        <TourGuideZone zone={3} text={t('tour3')}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={navigateToContactSupport}
                                style={staticStyle.helpButton}
                            >
                                <FastImage
                                    source={
                                        Utils.isDarkMode(theme) ? Config.appIcons.ic_helpDark : Config.appIcons.ic_helpLight
                                    }
                                    style={staticStyle.imageButton}
                                />
                                <Components.TextComponent
                                    text={t('help')}
                                    family={'medium'}
                                    textStyle={StyleSheet.flatten([
                                        staticStyle.tinyText,
                                        styles.helpText,
                                    ])}
                                />
                            </TouchableOpacity>
                        </TourGuideZone>
                    </View>
                    <TourGuideZone zone={1} text={t('tour1')}>
                        <View style={staticStyle.tour}/>
                    </TourGuideZone>
                    <View style={staticStyle.container}>
                        <FlatList
                            data={homeData.expertises}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={renderBrowseServiceItem}
                            contentContainerStyle={staticStyle.list}
                            ListHeaderComponent={headerComponent}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    progressViewOffset={10}
                                />
                            }
                            ListEmptyComponent={null}
                            initialNumToRender={5}
                        />
                    </View>
                </View>
            )}
        </>
    );
};

type HomeScreenListHeaderProps = {
    homeData: TClientHomeModel;
    navigateToHistory: () => void;
    navigateToWorkshop: () => void;
    navigateToBookingSummary: (id: string) => void;
    renderWorkshopItem: ListRenderItem<TWorkshopModel>;
    renderBookingItem: ListRenderItem<THomeBookingModel>;
};

const HomeScreenListHeader = (props: HomeScreenListHeaderProps) => {
    const {t} = useTranslation();
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const isPro = useSelector((state: RootState) => state.user.isPro);

    return (
        <View style={staticStyle.container}>
            {(props.homeData.workshops.length !== 0 || props.homeData.bookings.length !== 0) &&
                <View style={staticStyle.headerContainer}>
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
                </View>
            }
            <Components.TextComponent
                family={'medium'}
                text={t('browseServices')}
                textStyle={StyleSheet.flatten([
                    staticStyle.header,
                    staticStyle.listHeaderText,
                    styles.headerText,
                ])}
            />
        </View>
    )
}

type HomeScreenWorkshopListProps = {
    data: TWorkshopModel[] | any[];
    navigateToWorkshop: () => void;
    renderItem: ListRenderItem<any>;
    type: string;
};

export const HomeScreenWorkshopList = (props: HomeScreenWorkshopListProps) => {
    const {t} = useTranslation();
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    return (
        <View style={staticStyle.horizontalListContainer}>
            <View style={staticStyle.header}>
                <Components.TextComponent
                    family={'medium'}
                    text={
                        props.type === t('workshop') ? t('workshop') : t('bookingHistory')
                    }
                    textStyle={StyleSheet.flatten([
                        staticStyle.headerText,
                        styles.headerText,
                    ])}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={staticStyle.viewAllButton}
                    onPress={props.navigateToWorkshop}
                >
                    <Components.TextComponent
                        family={'regular'}
                        text={t('viewAll')}
                        textStyle={StyleSheet.flatten([
                            staticStyle.viewAllText,
                            styles.viewAllText,
                        ])}
                    />
                    <FastImage
                        source={Config.appIcons.ic_rightArrow}
                        style={staticStyle.viewAllIcon}
                        tintColor={theme.colors.primary}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={props.data}
                horizontal
                contentContainerStyle={staticStyle.horizontalListItem}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={props.renderItem}
                ListEmptyComponent={null}
                initialNumToRender={3}
            />
        </View>
    );
};
