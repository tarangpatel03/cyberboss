import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';
import { width } from '@config/constants/variables';

export const staticStyle = StyleSheet.create({
  topCard: {
    width: '100%',
    height: Utils.normalize(150, 'height'),
  },
  container: {
    flex: 1,
    width: width + 15,
    borderTopWidth: 10,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    left: Utils.normalize(-7),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: Utils.normalize(-20, 'height'),
    justifyContent: 'space-between',
    paddingHorizontal: Utils.normalize(16),
    paddingTop: Utils.normalize(10, 'height'),
  },
  background: {
    flex: 1,
    paddingBottom: Utils.normalize(20),
  },
  checkMark: {
    width: '70%',
    height: '70%',
  },
  mainContainer: {
    flex: 1,
    gap: Utils.normalize(20, 'height'),
  },
  titleContainer: {
    gap: Utils.normalize(8, 'height'),
  },
  title: {
    fontSize: Utils.normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  socialLogin: {
    gap: Utils.normalize(16),
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
    width: Utils.normalize(24),
    right: Utils.normalize(12),
    alignItems: 'center',
    height: Utils.normalize(24),
    justifyContent: 'center',
  },
  checkBox: {
    borderWidth: 1,
    borderRadius: Utils.normalize(5),
    width: Utils.normalize(20),
    height: Utils.normalize(20),
    marginRight: Utils.normalize(8),
  },
  hiddenPasswordIcon: {
    width: Utils.normalize(18),
    resizeMode: 'contain',
    height: Utils.normalize(10, 'height'),
  },
  termsLine: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  showPasswordIcon: {
    width: Utils.normalize(22),
    resizeMode: 'contain',
    height: Utils.normalize(12, 'height'),
  },
  centerText: {
    alignSelf: 'center',
    top: Utils.normalize(-9, 'height'),
    paddingHorizontal: Utils.normalize(16),
  },
  bottomButtons: {
    gap: Utils.normalize(16),
    flexDirection: 'row',
  },
  checkedBox: {
    top: -1,
    left: -1,
    borderRadius: Utils.normalize(5),
    alignItems: 'center',
    width: Utils.normalize(20),
    height: Utils.normalize(20),
    justifyContent: 'center',
  },
  passwordInput: {
    justifyContent: 'center',
  },
  signUpLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Utils.normalize(5),
  },
  button: {
    borderWidth: 1,
    borderRadius: Utils.normalize(30),
    alignItems: 'center',
    width: Utils.normalize(50),
    height: Utils.normalize(50),
    justifyContent: 'center',
  },
  buttonIcon: {
    resizeMode: 'cover',
    width: Utils.normalize(20),
    height: Utils.normalize(20, 'height'),
  },
  googleButtonIcon: {
    resizeMode: 'cover',
    width: Utils.normalize(23),
    height: Utils.normalize(20, 'height'),
  },
  logInLine: {
    flexDirection: 'row',
    alignSelf: 'center',
    bottom: Utils.normalize(10, 'height'),
  },
  logIn: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  logInText: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
  logInButton: {
    borderRadius: Utils.normalize(12),
    alignItems: 'center',
    height: Utils.normalize(48),
    justifyContent: 'center',
  },
  inputs: {
    gap: Utils.normalize(16, 'height'),
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
