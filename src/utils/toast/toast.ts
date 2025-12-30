import Toast, { ToastType } from 'react-native-toast-message';

type toastProps = {
  type: ToastType;
  text1?: string;
  text2?: string;
};

export const showToast = ({ type, text1, text2 }: toastProps) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
};

type subToastProps = {
  title?: string;
  subtitle?: string;
};

export const showSuccessToast = ({ title, subtitle }: subToastProps) => {
  showToast({ type: 'success', text1: title, text2: subtitle });
};

export const showErrorToast = ({ title, subtitle }: subToastProps) => {
  showToast({ type: 'error', text1: title, text2: subtitle });
};
