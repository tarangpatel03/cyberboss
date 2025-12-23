import {
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
    const userToken = await getUserToken({
      email: null,
      login_type: 'email',
      device_type: Platform.OS === 'android' ? 'android' : 'ios',
      push_token: PUSH_TOKEN,
      firebase_token: idToken,
    });
    return userToken;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error);

    showErrorToast({
      title: appText.somethingWentWrong,
      subtitle: appText.pleaseTryAgain,
    });
  }
};
