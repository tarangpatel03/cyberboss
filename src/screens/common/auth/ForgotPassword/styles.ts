import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';
import { height } from '@config/constants/variables';

export const staticStyle = StyleSheet.create({
  topBar: {
    paddingVertical: Utils.normalize(12, 'height'),
  },
  container: {
    height: Utils.normalize(height, 'height'),
  },
  title: {
    fontSize: Utils.normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  content: {
    paddingHorizontal: Utils.normalize(16),
    gap: Utils.normalize(32),
  },
  titleLine: {
    gap: Utils.normalize(8, 'height'),
  },
  bottomContainer: {
    gap: Utils.normalize(20, 'height'),
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
