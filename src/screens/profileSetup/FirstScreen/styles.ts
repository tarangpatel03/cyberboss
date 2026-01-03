import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import normalize from '@utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: normalize(15, 'height'),
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
    borderRadius: normalize(5),
    width: normalize(239),
    alignSelf: 'center',
    height: normalize(5, 'height'),
  },
  content: {
    gap: normalize(32, 'height'),
    alignItems: 'center',
    paddingTop: normalize(20, 'height'),
    paddingHorizontal: normalize(12),
  },
  titleView: {
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
  selectionCardContainer: {
    width: '100%',
    gap: normalize(16, 'height'),
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
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
  });
