import { getAuth, signOut } from '@react-native-firebase/auth';

export const logOut = async () => {
  try {
    await signOut(getAuth());
  } catch (error) {
    console.log(error);
  }
};
