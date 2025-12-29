import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routeName } from '../config/constants/routes';
import { OnboardingScreen } from '../screens/common/Onboarding';
import { LogInScreen } from '../screens/common/auth/LogIn';
import { SignUpScreen } from '../screens/common/auth/SignUp';
import { ForgotPasswordScreen } from '../screens/common/auth/ForgotPassword';
import { ProfileSetUpScreen } from '../screens/profileSetup/FirstScreen';
import { BottomNavigation } from './ClientBottomNavigation';
import { WorkshopScreen } from '../screens/client/Workshop';
import { AreaOfExpertiesScreen } from '../screens/profileSetup/ConsultantSetup/AreaOfExpertise';
import { ConsultantListScreen } from '../screens/client/ConsultantList';
import { OneOnOneChatScreen } from '../screens/common/OneOnoneChat';
import { PersonalDetailsScreen } from '../screens/profileSetup/ConsultantSetup/PersonalDetails';
import { ServicesYouOfferScreen } from '../screens/profileSetup/ConsultantSetup/ServecisesYouOffer';
import { PendingVerificationScreen } from '../screens/profileSetup/ConsultantSetup/PendingVerification';
import { EditProfileScreen } from '../screens/common/EditProfile';
import { ChangePasswordScreen } from '../screens/common/ChangePassword';
import { BookingSummaryScreen } from '../screens/common/BookingSummary';
import { YourRatingScreen } from '../screens/common/rating';
import { ConsultantProfileScreen } from '../screens/client/ConsultantProfile';
import { BookingDetailsScreen } from '../screens/client/BookingDetails';
import { BookingConfirmScreen } from '../screens/client/BookingConfirm';
import { NotificationScreen } from '../screens/common/Notification';
import { ContactSupportScreen } from '../screens/client/ContactSupport';
import { SubscriptionScreen } from '../screens/client/Subscription';
import { rootNavigationParams } from '../models/navigationModal';
import { SearchServiceScreen } from '../screens/client/SearchService';
import { rootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { ClientProfileSetUpScreen } from '../screens/profileSetup/ClientSetup';
const Root = createNativeStackNavigator<rootNavigationParams>();
export const RootNavigation = () => {
  const isLoggedIn = useSelector((state: rootState) => state.user.token);
  const isFirstTime = useSelector((state: rootState) => state.user.isFirstTime);
  const profileSetup = useSelector(
    (state: rootState) => state.user.userData.profile_setup,
  );

  const setInitialRoute = () => {
    if (isFirstTime) {
      return routeName.Onboarding;
    } else if (isLoggedIn) {
      if (profileSetup) {
        return routeName.ProfileSetUp;
      }
    }
    return routeName.BottomTab;
  };

  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={setInitialRoute()}
    >
      <Root.Screen name={routeName.Onboarding} component={OnboardingScreen} />
      <Root.Screen name={routeName.LogIn} component={LogInScreen} />
      <Root.Screen name={routeName.SignUp} component={SignUpScreen} />
      <Root.Screen
        name={routeName.ForgotPassword}
        component={ForgotPasswordScreen}
      />
      <Root.Screen
        name={routeName.ProfileSetUp}
        component={ProfileSetUpScreen}
      />
      <Root.Screen
        name={routeName.ClientProfileSetUp}
        component={ClientProfileSetUpScreen}
      />
      <Root.Screen
        name={routeName.SearchServices}
        component={SearchServiceScreen}
      />
      <Root.Screen
        name={routeName.AreaOfExperties}
        component={AreaOfExpertiesScreen}
      />
      <Root.Screen
        name={routeName.ServicesYouOffer}
        component={ServicesYouOfferScreen}
      />
      <Root.Screen
        name={routeName.PersonalDetails}
        component={PersonalDetailsScreen}
      />
      <Root.Screen
        name={routeName.PendingVerification}
        component={PendingVerificationScreen}
      />
      <Root.Screen name={routeName.BottomTab} component={BottomNavigation} />
      <Root.Screen name={routeName.Workshop} component={WorkshopScreen} />
      <Root.Screen
        name={routeName.ConsultantList}
        component={ConsultantListScreen}
      />
      <Root.Screen
        name={routeName.OneOnOneChat}
        component={OneOnOneChatScreen}
      />
      <Root.Screen name={routeName.EditProfile} component={EditProfileScreen} />
      <Root.Screen
        name={routeName.ChangePassword}
        component={ChangePasswordScreen}
      />
      <Root.Screen
        name={routeName.BookingSummary}
        component={BookingSummaryScreen}
      />
      <Root.Screen name={routeName.YourRating} component={YourRatingScreen} />
      <Root.Screen
        name={routeName.ConsultantProfile}
        component={ConsultantProfileScreen}
      />
      <Root.Screen
        name={routeName.BookingDetails}
        component={BookingDetailsScreen}
      />
      <Root.Screen
        name={routeName.BookingConfirm}
        component={BookingConfirmScreen}
      />
      <Root.Screen
        name={routeName.Notification}
        component={NotificationScreen}
      />
      <Root.Screen
        name={routeName.ContactSupport}
        component={ContactSupportScreen}
      />
      <Root.Screen
        name={routeName.Subscription}
        component={SubscriptionScreen}
      />
    </Root.Navigator>
  );
};
