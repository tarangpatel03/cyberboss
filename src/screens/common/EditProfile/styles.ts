import { StyleSheet } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import normalize from '../../../utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    gap: normalize(12, 'height'),
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: normalize(24),
    gap: normalize(32, 'height'),
  },
  profilePictureContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    gap: normalize(4, 'height'),
  },
  profileImage: {
    borderRadius: normalize(50),
    width: normalize(100),
    height: normalize(100),
  },
  changePhotoText: {
    fontSize: normalize(14),
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    width: '100%',
    gap: normalize(16, 'height'),
    paddingHorizontal: normalize(12),
  },
  disableInputContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: normalize(12),
    height: normalize(50),
    justifyContent: 'center',
    paddingHorizontal: normalize(12),
  },
  placeHolder: {
    fontSize: normalize(12),
    fontWeight: '400',
  },
  text: {
    fontSize: normalize(16),
    fontWeight: '400',
  },
  button: {
    padding: normalize(12),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    changePhotoText: {
      color: theme.colors.primary,
    },
    disableInputContainer: {
      borderColor: theme.colors.borderPrimary,
      backgroundColor: theme.colors.cardBackground,
    },
    text: {
      color: theme.colors.textSecondary,
    },
  });
