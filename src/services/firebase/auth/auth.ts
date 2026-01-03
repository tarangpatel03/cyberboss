import { axiosClient } from '@services/axios/axiosClient';
import { endPoints } from '@config/endPoint/apiEndPoint';
import auth from '@react-native-firebase/auth';
import appleAuth from '@invertase/react-native-apple-authentication';

import {
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import {
  WEBCLIENTID,
  iosClientID,
  PUSH_TOKEN,
} from '@config/constants/axiosValues';
import { appText } from '@config/text/constantsText';
import { showErrorToast } from '@utils/toast/toast';

export const getUserToken = async (data: {
  email: string | null;
  firebase_token: string;
  push_token?: string;
  login_type: string;
  device_type: string;
}) => {
  try {
    const res = await axiosClient.post(endPoints.logIn, data);
    return res.data.payload;
  } catch (error: any) {
    throw error;
  }
};

export const googleLogIn = async () => {
  try {
    GoogleSignin.configure({
      webClientId: WEBCLIENTID,
      iosClientId: iosClientID,
    });

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

export const signIn = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(getAuth(), email, password);
    const uid = res.user.uid;
    const idToken = await res.user.getIdToken();
    const userToken = await getUserToken({
      email: null,
      login_type: 'email',
      device_type: Platform.OS === 'android' ? 'android' : 'ios',
      push_token: PUSH_TOKEN,
      firebase_token: idToken,
    });
    return { userToken, uid };
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
    const apiResponse = await getUserToken({
      email,
      firebase_token: idToken,
      push_token: PUSH_TOKEN,
      device_type: Platform.OS === 'ios' ? 'ios' : 'android',
      login_type: 'social',
    });
    return apiResponse;
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async () => {
  try {
    await signOut(getAuth());
  } catch (error) {
    console.log(error);
  }
};

export const appleLogIn = async () => {
  const appleResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  const { identityToken, nonce } = appleResponse;

  if (!identityToken) {
    throw new Error('Apple Sign-In failed');
  }

  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  const firebaseResponse = await signInWithCredential(
    getAuth(),
    appleCredential,
  );
  const uid = firebaseResponse.user.uid;
  const idToken = await firebaseResponse.user.getIdToken();
  const userToken = await getUserToken({
    email: null,
    login_type: 'email',
    device_type: Platform.OS === 'android' ? 'android' : 'ios',
    push_token: PUSH_TOKEN,
    firebase_token: idToken,
  });

  return { userToken, uid };
};
