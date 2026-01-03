import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import normalize from '@utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: normalize(15, 'height'),
    paddingHorizontal: normalize(16),
    flexDirection: 'row',
  },
  backIcon: {
    width: normalize(20),
    height: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  backButton: {
    position: 'absolute',
    left: normalize(16),
    top: normalize(12, 'height'),
    width: normalize(16),
    height: normalize(12, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '70%',
    borderRadius: normalize(5),
    height: normalize(5, 'height'),
  },
  lineDetail: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: '50%',
    height: '100%',
  },
  warningText: {
    fontSize: normalize(12),
    alignSelf: 'flex-start',
    fontWeight: '400',
  },
  input: {
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    gap: normalize(32, 'height'),
    alignItems: 'center',
    paddingTop: normalize(30, 'height'),
    paddingHorizontal: normalize(12),
  },
  titleView: {
    gap: normalize(8, 'height'),
  },
  title: {
    alignSelf: 'center',
    fontSize: normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  profileImage: {
    gap: normalize(12, 'height'),
  },
  image: {
    alignSelf: 'center',
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
  },
  uploadText: {
    fontSize: normalize(14),
    fontWeight: '500',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  bottomButton: {
    paddingHorizontal: normalize(16),
    bottom: normalize(10, 'height'),
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
