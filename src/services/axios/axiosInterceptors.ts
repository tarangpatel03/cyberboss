import { createNavigationContainerRef } from '@react-navigation/native';
import { axiosClient } from '@services/axios/axiosClient';
import { RootNavigationParams } from '@models/navigationModel';
import { store } from '@redux/store';
import { routeName } from '@config/constants/routes';
import { showErrorToast } from '@utils/toast/toast';
import { appText } from '@config/text/constantsText';
import { clearUser } from '@redux/features/userSlice';

export const navigationRef =
  createNavigationContainerRef<RootNavigationParams>();

axiosClient.interceptors.request.use(config => {
  const state = store.getState();
  const token = state.user.token ?? '';

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  response => response,
  error => {
    const currentRoute = navigationRef.getCurrentRoute()?.name;
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          store.dispatch(clearUser());
          // @ts-ignore
          if (currentRoute === routeName.Home) {
            return Promise.reject(error);
          }
          if (currentRoute === routeName.PendingVerification) {
            return Promise.reject(error);
          }
          navigationRef.current?.navigate(routeName.LogIn);
          break;
        case 404:
          showErrorToast({
            title: appText.pageNotFound,
            subtitle: appText.pleaseTryAgain,
          });
          break;
        case 422:
          showErrorToast({
            subtitle: appText.enterValidValue,
          });
          break;
        case 429:
          showErrorToast({
            title: appText.pleaseTryAgainLater,
          });
          break;
        case 500:
          showErrorToast({
            title: appText.internalServerError,
            subtitle: appText.pleaseTryAgain,
          });
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  },
);
