import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RatingProps } from '../demoData/bookingHistory';

export type ClientBottomNavigationParams = {
  Home: undefined;
  History: undefined;
  Profile: undefined;
  Chat: undefined;
};

export type RootNavigationParams = {
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
  OneOnOneChat: {
    userID: string;
    chatID: string;
    consultantName: string;
    consultantImage: string | number | { uri: string } | undefined;
  };
  EditProfile: undefined;
  ChangePassword: undefined;
  BookingSummary: { id: string };
  YourRating: RatingProps;
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

export type AppParamList = RootNavigationParams & ClientBottomNavigationParams;

export type RootNavigationProps<T extends keyof AppParamList> =
  NativeStackScreenProps<AppParamList, T>;
