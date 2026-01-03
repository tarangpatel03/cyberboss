import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import normalize from '@utils/normalize/normalize';
import { width } from '@config/constants/variables';

export const staticStyle = StyleSheet.create({
  topCard: {
    width: '100%',
    height: normalize(140, 'height'),
  },
  background: {
    flex: 1,
    paddingBottom: normalize(20),
  },
  container: {
    flex: 1,
    paddingTop: normalize(10, 'height'),
    paddingHorizontal: normalize(16),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 10,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    top: normalize(-20),
    width: width + 15,
    left: normalize(-7),
  },
  mainContainer: {
    flex: 1,
    gap: normalize(20, 'height'),
  },
  titleContainer: {
    gap: normalize(8, 'height'),
  },
  emailPassInput: {
    gap: normalize(16),
  },
  passwordInput: {
    justifyContent: 'center',
  },
  passwordButton: {
    position: 'absolute',
    width: normalize(24),
    height: normalize(24),
    right: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenPasswordIcon: {
    width: normalize(18),
    height: normalize(10, 'height'),
    resizeMode: 'contain',
  },
  showPasswordIcon: {
    width: normalize(22),
    height: normalize(12, 'height'),
    resizeMode: 'contain',
  },
  title: {
    fontSize: normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  socialLogin: {
    alignItems: 'center',
    gap: normalize(16),
  },
  continueWith: {
    width: '100%',
  },
  line: {
    borderWidth: 0.5,
  },
  centerText: {
    alignSelf: 'center',
    paddingHorizontal: normalize(16),
    top: normalize(-9, 'height'),
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: normalize(16, 'height'),
  },
  button: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(30),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: normalize(20),
    height: normalize(20, 'height'),
    resizeMode: 'cover',
  },
  googleButtonIcon: {
    width: normalize(23),
    height: normalize(20, 'height'),
    resizeMode: 'cover',
  },
  signUpLine: {
    flexDirection: 'row',
    bottom: normalize(10, 'height'),
    alignSelf: 'center',
  },
  forgotPassword: {
    paddingBottom: normalize(16, 'height'),
    marginTop: normalize(5),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signUp: {
    fontSize: normalize(14),
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  logInText: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  logInButton: {
    borderRadius: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(48),
  },
  inputs: {
    gap: normalize(20, 'height'),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.colors.bgPrimary,
    },
    container: {
      backgroundColor: theme.colors.bgPrimary,
      borderColor: theme.colors.whiteOverlayBorder,
    },
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
    continueWith: {},
    line: {
      borderColor: theme.colors.borderPrimary,
    },
    centerText: {
      backgroundColor: theme.colors.bgPrimary,
    },
    button: {
      borderColor: theme.colors.borderPrimary,
    },
    signUp: {
      textDecorationLine: 'underline',
      color: theme.colors.primary,
    },
    logInText: {
      color: theme.colors.pureWhite,
    },
    logInButton: {
      backgroundColor: theme.colors.primary,
    },
  });
