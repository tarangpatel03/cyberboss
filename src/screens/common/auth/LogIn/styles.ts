import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';
import { width } from '@config/constants/variables';
import { Config } from '@config/index';

export const staticStyle = StyleSheet.create({
  topCard: {
    width: '100%',
    height: Utils.normalize(140, 'height'),
  },
  background: {
    flex: 1,
    paddingBottom: Utils.normalize(20),
  },
  container: {
    flex: 1,
    paddingTop: Utils.normalize(10, 'height'),
    paddingHorizontal: Utils.normalize(16),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 10,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    top: Utils.normalize(-20),
    width: width + 15,
    left: Utils.normalize(-7),
  },
  backButton: {
    zIndex: 100,
    top: Utils.normalize(40),
    left: Utils.normalize(16),
    alignItems: 'center',
    width: Utils.normalize(32),
    position: 'absolute',
    height: Utils.normalize(32),
    justifyContent: 'center',
    borderRadius: Utils.normalize(20),
    backgroundColor: Config.appColors.app_FFFFFF40,
  },
  backIcon: {
    width: Utils.normalize(16),
    height: Utils.normalize(12),
  },
  mainContainer: {
    flex: 1,
    gap: Utils.normalize(20, 'height'),
  },
  titleContainer: {
    gap: Utils.normalize(8, 'height'),
  },
  emailPassInput: {
    gap: Utils.normalize(16),
  },
  passwordInput: {
    justifyContent: 'center',
  },
  passwordButton: {
    position: 'absolute',
    width: Utils.normalize(24),
    height: Utils.normalize(24),
    right: Utils.normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenPasswordIcon: {
    width: Utils.normalize(18),
    height: Utils.normalize(10, 'height'),
    resizeMode: 'contain',
  },
  showPasswordIcon: {
    width: Utils.normalize(22),
    height: Utils.normalize(12, 'height'),
    resizeMode: 'contain',
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
    alignItems: 'center',
    gap: Utils.normalize(16),
  },
  continueWith: {
    width: '100%',
  },
  line: {
    borderWidth: 0.5,
  },
  centerText: {
    alignSelf: 'center',
    paddingHorizontal: Utils.normalize(16),
    top: Utils.normalize(-9, 'height'),
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: Utils.normalize(16, 'height'),
  },
  button: {
    width: Utils.normalize(50),
    height: Utils.normalize(50),
    borderRadius: Utils.normalize(30),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: Utils.normalize(20),
    height: Utils.normalize(20, 'height'),
    resizeMode: 'cover',
  },
  googleButtonIcon: {
    width: Utils.normalize(23),
    height: Utils.normalize(20, 'height'),
    resizeMode: 'cover',
  },
  signUpLine: {
    flexDirection: 'row',
    bottom: Utils.normalize(10, 'height'),
    alignSelf: 'center',
  },
  forgotPassword: {
    paddingBottom: Utils.normalize(16, 'height'),
    marginTop: Utils.normalize(5),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signUp: {
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
    justifyContent: 'center',
    height: Utils.normalize(48),
  },
  inputs: {
    gap: Utils.normalize(20, 'height'),
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
