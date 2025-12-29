import { StyleSheet } from 'react-native';
import { Theme } from '../../../../config/themes/themes';
import normalize from '../../../../utils/normalize/normalize';
import { width } from '../../../../config/constants/variables';

export const staticStyle = StyleSheet.create({
  topCard: {
    width: '100%',
    height: normalize(150, 'height'),
  },
  container: {
    flex: 1,
    width: width + 15,
    borderTopWidth: 10,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    left: normalize(-7),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: normalize(-20, 'height'),
    justifyContent: 'space-between',
    paddingHorizontal: normalize(16),
    paddingTop: normalize(10, 'height'),
  },
  background: {
    flex: 1,
    paddingBottom: normalize(20),
  },
  checkMark: {
    width: '70%',
    height: '70%',
  },
  mainContainer: {
    flex: 1,
    gap: normalize(20, 'height'),
  },
  titleContainer: {
    gap: normalize(8, 'height'),
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
    gap: normalize(16),
    alignItems: 'center',
  },
  continueWith: {
    width: '100%',
  },
  line: {
    borderWidth: 0.5,
  },
  passwordButton: {
    position: 'absolute',
    width: normalize(24),
    right: normalize(12),
    alignItems: 'center',
    height: normalize(24),
    justifyContent: 'center',
  },
  checkBox: {
    borderWidth: 1,
    borderRadius: normalize(5),
    width: normalize(20),
    height: normalize(20),
    marginRight: normalize(8),
  },
  hiddenPasswordIcon: {
    width: normalize(18),
    resizeMode: 'contain',
    height: normalize(10, 'height'),
  },
  termsLine: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  showPasswordIcon: {
    width: normalize(22),
    resizeMode: 'contain',
    height: normalize(12, 'height'),
  },
  centerText: {
    alignSelf: 'center',
    top: normalize(-9, 'height'),
    paddingHorizontal: normalize(16),
  },
  bottomButtons: {
    gap: normalize(16),
    flexDirection: 'row',
  },
  checkedBox: {
    top: -1,
    left: -1,
    borderRadius: normalize(5),
    alignItems: 'center',
    width: normalize(20),
    height: normalize(20),
    justifyContent: 'center',
  },
  passwordInput: {
    justifyContent: 'center',
  },
  signUpLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(5),
  },
  button: {
    borderWidth: 1,
    borderRadius: normalize(30),
    alignItems: 'center',
    width: normalize(50),
    height: normalize(50),
    justifyContent: 'center',
  },
  buttonIcon: {
    resizeMode: 'cover',
    width: normalize(20),
    height: normalize(20, 'height'),
  },
  googleButtonIcon: {
    resizeMode: 'cover',
    width: normalize(23),
    height: normalize(20, 'height'),
  },
  logInLine: {
    flexDirection: 'row',
    alignSelf: 'center',
    bottom: normalize(10, 'height'),
  },
  logIn: {
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
    height: normalize(48),
    justifyContent: 'center',
  },
  inputs: {
    gap: normalize(16, 'height'),
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
    line: {
      borderColor: theme.colors.borderPrimary,
    },
    centerText: {
      backgroundColor: theme.colors.bgPrimary,
    },
    button: {
      borderColor: theme.colors.borderPrimary,
    },
    logIn: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
    logInText: {
      color: theme.colors.pureWhite,
    },
    checkBox: {
      borderColor: theme.colors.borderPrimary,
    },
    checkedBox: {
      backgroundColor: theme.colors.primary,
    },
    logInButton: {
      backgroundColor: theme.colors.primary,
    },
  });
