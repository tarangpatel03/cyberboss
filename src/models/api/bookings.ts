export type ApiBookingBillCount = {
    hours: number;
    consultant_id: string;
};

export type ApiBookingHistoryModel = {
    id: string;
    booking_id: string;
    user_id: string;
    consultant_id?: string;
    user_name: string;
    user_profile_picture: number | string | { uri: string } | undefined;
    platform_percentage: number;
    platform_percentage_consultant: number;
    booking_date: string;
    status: string;
    category_name: string;
    discount_amount: number;
    total: string;
    grand_total: number;
    hours: number;
};

export type ApiBookingDetailsModel = {
    id: string;
    booking_id: string;
    user_id: string;
    consultant_id: string;
    user_name: string;
    user_profile_picture: string | number | { uri: string } | undefined;
    platform_percentage: number;
    platform_percentage_consultant: number;
    booking_date: string;
    status: string;
    category_name: string;
    discount_amount: number;
    total: string;
    grand_total: number;
    hours: number;
    hourly_rate: string;
    platform_fee: string;
    tax: string;
    expertise: ApiBookingExpertise;
};

export type ApiReviewModel = {
    id: string;
    booking_id: string;
    rating: string;
    reviews: string;
    created_at: string;
};

export type ApiBookingExpertise = {
    id: string;
    name: string;
    image: string | number | { uri: string } | undefined;
    description: string;
    rate: number;
    booking_count: number | null;
};

export type ApiHomeBookingModel = {
    id: string;
    booking_id: string;
    user_id: string;
    consultant_id?: string;
    user_name: string;
    user_profile_picture: number | string | { uri: string } | undefined;
    platform_percentage: number;
    platform_percentage_consultant: number;
    booking_date: string;
    status: string;
    category_name: string;
    discount_amount: number;
    total: string;
    grand_total: number;
};
