import Toast, { ToastType } from 'react-native-toast-message';

type ToastProps = {
  type: ToastType;
  text1?: string;
  text2?: string;
};

export const showToast = ({ type, text1, text2 }: ToastProps) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
};

type SubToastProps = {
  title?: string;
  subtitle?: string;
};

export const showSuccessToast = ({ title, subtitle }: SubToastProps) => {
  showToast({ type: 'success', text1: title, text2: subtitle });
};

export const showErrorToast = ({ title, subtitle }: SubToastProps) => {
  showToast({ type: 'error', text1: title, text2: subtitle });
};
