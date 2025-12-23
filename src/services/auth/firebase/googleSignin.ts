import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import { getUserToken } from './getUserToken';
import { PUSH_TOKEN } from '../../../config/constants/axiosValues';

export const googleLogIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const res = await GoogleSignin.signIn();
    if (isSuccessResponse(res)) {
      const googleCredential = GoogleAuthProvider.credential(res.data.idToken);
      const firebaseUser = await signInWithCredential(
        getAuth(),
        googleCredential,
      );
      const idToken = await firebaseUser.user.getIdToken();
      const email = firebaseUser.user.email;
      const apiResponse = await getUserToken({
        email,
        firebase_token: idToken,
        push_token: PUSH_TOKEN,
        device_type: Platform.OS === 'android' ? 'android' : 'ios',
        login_type: 'social',
      });
      return apiResponse;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
