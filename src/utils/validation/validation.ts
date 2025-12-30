import { appText } from '../../config/text/constantsText';
import { showErrorToast } from '../toast/toast';

export const validatePassword = (password: string) => {
  if (password.length < 8) {
    showErrorToast({ title: appText.passwordLength });
    return false;
  } else if (!/[A-Z]/.test(password)) {
    showErrorToast({ title: appText.mustHaveCapitalValue });
    return false;
  } else if (!/[a-z]/.test(password)) {
    showErrorToast({ title: appText.mustHaveSmallValue });
    return false;
  } else if (!/[0-9]/.test(password)) {
    showErrorToast({ title: appText.mustHaveNumber });
    return false;
  } else if (!/[!@#$%^&*()]/.test(password)) {
    showErrorToast({ title: appText.mustHaveSpecialChar });
    return false;
  }
  return true;
};

export const validateEmail = (email: string) => {
  const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailValidator.test(email);
};
