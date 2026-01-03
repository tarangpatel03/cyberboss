import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import normalize from '@utils/normalize/normalize';
import { height } from '@config/constants/variables';

export const staticStyles = StyleSheet.create({
  topBar: {
    paddingVertical: normalize(12, 'height'),
  },
  container: {
    height: normalize(height, 'height'),
  },
  title: {
    fontSize: normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  content: {
    paddingHorizontal: normalize(16),
    gap: normalize(32),
  },
  titleLine: {
    gap: normalize(8, 'height'),
  },
  bottomContainer: {
    gap: normalize(20, 'height'),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
  });
