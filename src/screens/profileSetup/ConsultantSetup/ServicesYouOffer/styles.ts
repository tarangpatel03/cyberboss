import { StyleSheet } from 'react-native';
import normalize from '@utils/normalize/normalize';
import { Theme } from '@config/themes/themes';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    paddingHorizontal: normalize(16),
    bottom: normalize(50, 'height'),
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: normalize(15, 'height'),
    paddingHorizontal: normalize(16),
    flexDirection: 'row',
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
  contentSelection: {
    paddingTop: normalize(16, 'height'),
    paddingHorizontal: normalize(12),
    gap: normalize(8),
  },
  backIcon: {
    width: normalize(20),
    height: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  line: {
    width: '70%',
    borderRadius: normalize(5),
    height: normalize(5, 'height'),
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: normalize(10),
  },
  lineDetail: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: '50%',
    height: '100%',
  },
  content: {
    alignItems: 'center',
    paddingTop: normalize(24, 'height'),
    gap: normalize(8),
  },
  title: {
    fontSize: normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    borderRadius: normalize(12),
    padding: 12,
    height: normalize(48),
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: normalize(12),
    paddingHorizontal: normalize(12),
    paddingBottom: normalize(10, 'height'),
  },
  nextText: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  skipText: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    filledLine: {
      backgroundColor: theme.colors.primary,
    },
    backIcon: {
      tintColor: theme.colors.textPrimary,
    },
    line: {
      backgroundColor: theme.colors.cardBackground,
    },
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
    skipButton: {
      backgroundColor: theme.colors.secondary,
    },
    bottomButtons: {
      backgroundColor: theme.colors.bgPrimary,
    },
    nextText: {
      color: theme.colors.pureWhite,
    },
    skipText: {
      color: theme.colors.textSecondary,
    },
  });
