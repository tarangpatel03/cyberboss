import validate from 'react-native-email-validator';

export const validateEmail = (email: string) => {
  return validate(email);
};
