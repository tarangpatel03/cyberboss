import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { Platform } from 'react-native';
import { getUserToken } from './getUserToken';
import { showErrorToast } from '../../../utils/toast/toast';
import { appText } from '../../../config/text/constantsText';
import { PUSH_TOKEN } from '../../../config/constants/axiosValues';

export const signIn = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(getAuth(), email, password);
    const idToken = await res.user.getIdToken();
    console.log('Frebase Token:', idToken);
    const userToken = await getUserToken({
      email: null,
      login_type: 'email',
      device_type: Platform.OS === 'android' ? 'android' : 'ios',
      push_token: PUSH_TOKEN,
      firebase_token: idToken,
    });
    console.log('API user Token: ', userToken);
    return userToken;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    showErrorToast({
      title: appText.somethingWentWrong,
      subtitle: appText.pleaseTryAgain,
    });
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const firebaseUser = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password,
    );
    const idToken = await firebaseUser.user.getIdToken();
    console.log('Firebase User: ', idToken);
    const apiResponse = await getUserToken({
      email,
      firebase_token: idToken,
      push_token: PUSH_TOKEN,
      device_type: Platform.OS === 'ios' ? 'ios' : 'android',
      login_type: 'social',
    });
    console.log('Postman User: ', apiResponse);
    return apiResponse;
  } catch (error) {
    console.log(error);
  }
};
