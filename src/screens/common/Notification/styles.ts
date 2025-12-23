import { StyleSheet } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import normalize from '../../../utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    paddingTop: normalize(16),
    paddingHorizontal: normalize(12),
  },
  notificationList: {
    paddingVertical: normalize(20),
  },
  shimmerContainer: {
    width: '100%',
    height: normalize(80),
    borderRadius: normalize(8),
    marginBottom: normalize(16),
  },
  listItems: {
    flexGrow: 1,
    gap: normalize(12),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    bgPrimary: {
      backgroundColor: theme.colors.bgPrimary,
    },
    image: {
      tintColor: theme.colors.textPrimary,
    },
  });
