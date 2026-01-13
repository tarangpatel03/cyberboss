import {
    ApiClientHomeModel,
    ConsultantHomeBookingModel,
    ConsultantHomeNotificationModel,
    ApiConsultantHomeModel,
} from '@models/api/home';
import {THomeBookingModel, transformHomeBookingModel} from '@models/formattedAPI/tBookings';
import {
    TExpertiseModel,
    TWorkshopModel,
    transformExpertiseModel,
    transformWorkshopModel,
} from '@models/formattedAPI/tConsultant';

export type TClientHomeModel = {
    isSubscriber: boolean;
    bookings: THomeBookingModel[];
    expertises: TExpertiseModel[];
    workshops: TWorkshopModel[];
};

export type TConsultantHomeBookingModel = {
    id: string;
    consultantName: string;
    consultantProfilePicture: string;
    bookingDate: string;
    categoryName: string;
    grandTotal: string;
};

export type TConsultantHomeNotificationModel = {
    id: string;
    title: string;
    body: string | null;
    createdAt: string;
};

export type TConsultantHomeModel = {
    totalEarnings?: string;
    walletBalance?: number;
    averageRating?: number;
    bookings: THomeBookingModel[];
    notification: TConsultantHomeNotificationModel[];
};

export const transformClientHomeModal: (
    data: ApiClientHomeModel,
) => TClientHomeModel = (data: ApiClientHomeModel) => {
    return {
        bookings: data.bookings.map(r => transformHomeBookingModel(r)) ?? [],
        expertises: data.expertises
            ? data.expertises.map(r => transformExpertiseModel(r))
            : [],
        isSubscriber: data.is_subscriber,
        workshops: data.workshops
            ? data.workshops.map(r => transformWorkshopModel(r))
            : [],
    };
};

export const transformConsultantHomeBookings: (
    data: ConsultantHomeBookingModel,
) => TConsultantHomeBookingModel = (data: ConsultantHomeBookingModel) => {
    return {
        id: data.id,
        grandTotal: data.grand_total,
        bookingDate: data.booking_date,
        categoryName: data.category_name,
        consultantName: data.consultant_name,
        consultantProfilePicture: data.consultant_profile_picture,
    };
};

export const transformConsultantHomeNotification: (
    data: ConsultantHomeNotificationModel,
) => TConsultantHomeNotificationModel = (
    data: ConsultantHomeNotificationModel,
) => {
    return {
        id: data.id,
        body: data.body,
        title: data.title,
        createdAt: data.created_at,
    };
};

export const transformConsultantHomeModel: (
    data: ApiConsultantHomeModel,
) => TConsultantHomeModel = (data: ApiConsultantHomeModel) => {
    return {
        walletBalance: data?.wallet_balance ?? 0,
        totalEarnings: data?.total_earnings ?? 0,
        averageRating: data?.average_rating ?? 0,
        bookings: data?.bookings.map(r => transformHomeBookingModel(r)) ?? [],
        notification: data?.notification.map(r =>
            transformConsultantHomeNotification(r),
        ) ?? 0,
    };
};
