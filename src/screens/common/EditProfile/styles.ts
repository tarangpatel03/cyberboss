import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    gap: Utils.normalize(12, 'height'),
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Utils.normalize(24),
    gap: Utils.normalize(32, 'height'),
  },
  profilePictureContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    gap: Utils.normalize(4, 'height'),
  },
  profileImage: {
    borderRadius: Utils.normalize(50),
    width: Utils.normalize(100),
    height: Utils.normalize(100),
  },
  changePhotoText: {
    fontSize: Utils.normalize(14),
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    width: '100%',
    gap: Utils.normalize(16, 'height'),
    paddingHorizontal: Utils.normalize(12),
  },
  disableInputContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: Utils.normalize(12),
    height: Utils.normalize(50),
    justifyContent: 'center',
    paddingHorizontal: Utils.normalize(12),
  },
  placeHolder: {
    fontSize: Utils.normalize(12),
    fontWeight: '400',
  },
  text: {
    fontSize: Utils.normalize(16),
    fontWeight: '400',
  },
  button: {
    padding: Utils.normalize(12),
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
