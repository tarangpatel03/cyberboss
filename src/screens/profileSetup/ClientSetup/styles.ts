import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import {Utils} from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Utils.normalize(15, 'height'),
    paddingHorizontal: Utils.normalize(16),
    flexDirection: 'row',
  },
  backIcon: {
    width: Utils.normalize(20),
    height: Utils.normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  backButton: {
    position: 'absolute',
    left: Utils.normalize(16),
    top: Utils.normalize(12, 'height'),
    width: Utils.normalize(16),
    height: Utils.normalize(12, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '70%',
    borderRadius: Utils.normalize(5),
    height: Utils.normalize(5, 'height'),
  },
  lineDetail: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: '50%',
    height: '100%',
  },
  warningText: {
    fontSize: Utils.normalize(12),
    alignSelf: 'flex-start',
    fontWeight: '400',
  },
  input: {
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    gap: Utils.normalize(32, 'height'),
    alignItems: 'center',
    paddingTop: Utils.normalize(30, 'height'),
    paddingHorizontal: Utils.normalize(12),
  },
  titleView: {
    gap: Utils.normalize(8, 'height'),
  },
  title: {
    alignSelf: 'center',
    fontSize: Utils.normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  profileImage: {
    gap: Utils.normalize(12, 'height'),
  },
  image: {
    alignSelf: 'center',
    width: Utils.normalize(100),
    height: Utils.normalize(100),
    borderRadius: Utils.normalize(50),
  },
  uploadText: {
    fontSize: Utils.normalize(14),
    fontWeight: '500',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  bottomButton: {
    paddingHorizontal: Utils.normalize(16),
    bottom: Utils.normalize(10, 'height'),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    backIcon: {
      tintColor: theme.colors.textPrimary,
    },
    line: {
      backgroundColor: theme.colors.cardBackground,
    },
    filledLine: {
      backgroundColor: theme.colors.primary,
    },
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
    warningText: {
      color: theme.colors.warningBorder,
    },
    warningBorder: {
      borderColor: theme.colors.warningBorder,
    },
    uploadText: {
      color: theme.colors.primary,
    },
  });
