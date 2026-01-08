import { createNavigationContainerRef } from '@react-navigation/native';
import { axiosClient } from '@services/axios/axiosClient';
import { RootNavigationParams } from '@models/navigationModel';
import { store } from '@redux/store';
import { routeName } from '@config/constants/routes';
import { clearUser } from '@redux/features/userSlice';
import { Utils } from '@utils/index';
import { Config } from '@config/index';

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
          Utils.showErrorToast({
            title: Config.appText.pageNotFound,
            subtitle: Config.appText.pleaseTryAgain,
          });
          break;
        case 422:
          Utils.showErrorToast({
            subtitle: Config.appText.enterValidValue,
          });
          break;
        case 429:
          Utils.showErrorToast({
            title: Config.appText.pleaseTryAgainLater,
          });
          break;
        case 500:
          Utils.showErrorToast({
            title: Config.appText.internalServerError,
            subtitle: Config.appText.pleaseTryAgain,
          });
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  },
);
