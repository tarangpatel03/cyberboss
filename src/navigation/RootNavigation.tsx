import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '@screens/common/Onboarding';
import { LogInScreen } from '@screens/common/auth/LogIn';
import { SignUpScreen } from '@screens/common/auth/SignUp';
import { ForgotPasswordScreen } from '@screens/common/auth/ForgotPassword';
import { ProfileSetUpScreen } from '@screens/profileSetup/FirstScreen';
import { BottomNavigation } from '@navigation/ClientBottomNavigation';
import { WorkshopScreen } from '@screens/client/Workshop';
import { AreaOfExpertiseScreen } from '@screens/profileSetup/ConsultantSetup/AreaOfExpertise';
import { ConsultantListScreen } from '@screens/client/ConsultantList';
import { OneToOneChatScreen } from '@screens/common/OneToOneChat';
import { PersonalDetailsScreen } from '@screens/profileSetup/ConsultantSetup/PersonalDetails';
import { ServicesYouOfferScreen } from '@screens/profileSetup/ConsultantSetup/ServicesYouOffer';
import { PendingVerificationScreen } from '@screens/profileSetup/ConsultantSetup/PendingVerification';
import { EditProfileScreen } from '@screens/common/EditProfile';
import { ChangePasswordScreen } from '@screens/common/ChangePassword';
import { BookingSummaryScreen } from '@screens/common/BookingSummary';
import { YourRatingScreen } from '@screens/common/Rating';
import { ConsultantProfileScreen } from '@screens/client/ConsultantProfile';
import { BookingDetailsScreen } from '@screens/client/BookingDetails';
import { BookingConfirmScreen } from '@screens/client/BookingConfirm';
import { NotificationScreen } from '@screens/common/Notification';
import { ContactSupportScreen } from '@screens/client/ContactSupport';
import { SubscriptionScreen } from '@screens/client/Subscription';
import { RootNavigationParams } from '@models/navigationModel';
import { SearchServiceScreen } from '@screens/client/SearchService';
import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';
import { ClientProfileSetUpScreen } from '@screens/profileSetup/ClientSetup';
import { Config } from '@config/index';
import { UpdateExpertiseScreen } from '@screens/consultant/updateExpertise';
import { UpdateServiceScreen } from '@screens/consultant/updateService';

const Root = createNativeStackNavigator<RootNavigationParams>();

export const RootNavigation = () => {
  const { token: isLoggedIn, isFirstTime } = useSelector(
    (state: RootState) => state.user,
  );
  const {
    role,
    is_verified: isVerified,
    profile_setup: profileSetup,
  } = useSelector((state: RootState) => state.user.userData);

  const setInitialRoute = () => {
    if (isFirstTime) {
      return Config.routeName.Onboarding;
    } else if (isLoggedIn) {
      if (profileSetup) {
        return Config.routeName.ProfileSetUp;
      }
      if (role === 'consultant') {
        if (!isVerified) {
          return Config.routeName.PendingVerification;
        }
        return Config.routeName.BottomTab;
      }
    }
    return Config.routeName.BottomTab;
  };

  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={setInitialRoute()}
    >
      <Root.Screen
        name={Config.routeName.Onboarding}
        component={OnboardingScreen}
      />
      <Root.Screen name={Config.routeName.LogIn} component={LogInScreen} />
      <Root.Screen name={Config.routeName.SignUp} component={SignUpScreen} />
      <Root.Screen
        name={Config.routeName.ForgotPassword}
        component={ForgotPasswordScreen}
      />
      <Root.Screen
        name={Config.routeName.ProfileSetUp}
        component={ProfileSetUpScreen}
      />
      <Root.Screen
        name={Config.routeName.ClientProfileSetUp}
        component={ClientProfileSetUpScreen}
      />
      <Root.Screen
        name={Config.routeName.SearchServices}
        component={SearchServiceScreen}
      />
      <Root.Screen
        name={Config.routeName.AreaOfExpertise}
        component={AreaOfExpertiseScreen}
      />
      <Root.Screen
        name={Config.routeName.ServicesYouOffer}
        component={ServicesYouOfferScreen}
      />
      <Root.Screen
        name={Config.routeName.PersonalDetails}
        component={PersonalDetailsScreen}
      />
      <Root.Screen
        name={Config.routeName.PendingVerification}
        component={PendingVerificationScreen}
      />
      <Root.Screen
        name={Config.routeName.BottomTab}
        component={BottomNavigation}
      />
      <Root.Screen
        name={Config.routeName.Workshop}
        component={WorkshopScreen}
      />
      <Root.Screen
        name={Config.routeName.ConsultantList}
        component={ConsultantListScreen}
      />
      <Root.Screen
        name={Config.routeName.OneOnOneChat}
        component={OneToOneChatScreen}
      />
      <Root.Screen
        name={Config.routeName.EditProfile}
        component={EditProfileScreen}
      />
      <Root.Screen
        name={Config.routeName.ChangePassword}
        component={ChangePasswordScreen}
      />
      <Root.Screen
        name={Config.routeName.BookingSummary}
        component={BookingSummaryScreen}
      />
      <Root.Screen
        name={Config.routeName.YourRating}
        component={YourRatingScreen}
      />
      <Root.Screen
        name={Config.routeName.ConsultantProfile}
        component={ConsultantProfileScreen}
      />
      <Root.Screen
        name={Config.routeName.BookingDetails}
        component={BookingDetailsScreen}
      />
      <Root.Screen
        name={Config.routeName.BookingConfirm}
        component={BookingConfirmScreen}
      />
      <Root.Screen
        name={Config.routeName.Notification}
        component={NotificationScreen}
      />
      <Root.Screen
        name={Config.routeName.ContactSupport}
        component={ContactSupportScreen}
      />
      <Root.Screen
        name={Config.routeName.Subscription}
        component={SubscriptionScreen}
      />
      <Root.Screen
        name={Config.routeName.UpdateExpertise}
        component={UpdateExpertiseScreen}
      />
      <Root.Screen
        name={Config.routeName.UpdateService}
        component={UpdateServiceScreen}
      />
    </Root.Navigator>
  );
};
