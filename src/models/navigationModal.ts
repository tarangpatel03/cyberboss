import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ratingProps } from '../demoData/bookingHistory';

export type clientBottomNavigationParams = {
  Home: undefined;
  History: undefined;
  Profile: undefined;
  Chat: undefined;
};

export type consultantBottomNavigationParams = {
  ConsultantHome: undefined;
  History: undefined;
  Profile: undefined;
  Chat: undefined;
};

export type rootNavigationParams = {
  Onboarding: undefined;
  LogIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ProfileSetUp: undefined;
  ClientProfileSetUp: undefined;
  SearchServices: undefined;
  AreaOfExpertise: undefined;
  ServicesYouOffer: undefined;
  PersonalDetails: undefined;
  PendingVerification: undefined;
  BottomTab: undefined;
  Workshop: undefined;
  ConsultantList: { id: string; name: string };
  OneOnOneChat: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  BookingSummary: { id: string };
  YourRating: ratingProps;
  ConsultantProfile: { consultantId: string; type: string };
  BookingDetails: { consultantId: string; type: string };
  BookingConfirm: {
    name: string;
    image: string | undefined;
    hours: number;
    total: number;
    type: string;
  };
  Notification: undefined;
  ContactSupport: undefined;
  Subscription: undefined;
};

export type appParamList = rootNavigationParams &
  clientBottomNavigationParams &
  consultantBottomNavigationParams;

export type rootNavigationProps<T extends keyof appParamList> =
  NativeStackScreenProps<appParamList, T>;
