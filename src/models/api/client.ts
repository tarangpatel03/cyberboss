export type SubscriptionWorkshop = {
    id: string;
    name: string;
    date: string;
    start_time: string;
    end_time: string;
    link: string;
};

export type ApiSubscriptionModel = {
    plan_name: string;
    current_users: number;
    benefits: string[];
    workshops: SubscriptionWorkshop[];
    price: string;
    current_users_profile_images: string[];
    price_id: string;
    duration: string;
    user_subscription: {
        is_subscribed: boolean;
        on_grace_period: boolean;
        subscription_ends_at: string | null;
    };
};
