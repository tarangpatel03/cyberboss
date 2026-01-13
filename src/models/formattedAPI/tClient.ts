import {ApiSubscriptionModel, SubscriptionWorkshop} from '@models/api/client';

export type TSubscriptionWorkshop = {
    id: string;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    link: string;
};

export type TSubscriptionModel = {
    planName: string;
    currentUsers: number;
    benefits: string[];
    workshops: TSubscriptionWorkshop[];
    price: string;
    currentUsersProfileImages: string[];
    priceId: string;
    duration: string;
    userSubscription: {
        isSubscribed: boolean;
        onGracePeriod: boolean;
        subscriptionEndsAt: string | null;
    };
};

export const transformSubscriptionWorkshop: (
    data: SubscriptionWorkshop,
) => TSubscriptionWorkshop = (data: SubscriptionWorkshop) => {
    return {
        date: data.date,
        endTime: data.end_time,
        id: data.id,
        link: data.link,
        name: data.name,
        startTime: data.start_time,
    };
};

export const transformSubscriptionModel: (
    data: ApiSubscriptionModel,
) => TSubscriptionModel = (data: ApiSubscriptionModel) => {
    return {
        benefits: data.benefits,
        currentUsers: data.current_users,
        currentUsersProfileImages: data.current_users_profile_images,
        duration: data.duration,
        planName: data.plan_name,
        price: data.price,
        priceId: data.price_id,
        userSubscription: {
            isSubscribed: data.user_subscription.is_subscribed,
            onGracePeriod: data.user_subscription.on_grace_period,
            subscriptionEndsAt: data.user_subscription.subscription_ends_at,
        },
        workshops: data.workshops.map(r => transformSubscriptionWorkshop(r)),
    };
};
