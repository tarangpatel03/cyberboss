import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import {Utils} from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    paddingTop: Utils.normalize(16),
    paddingHorizontal: Utils.normalize(12),
  },
  notificationList: {
    paddingVertical: Utils.normalize(20),
  },
  shimmerContainer: {
    width: '100%',
    height: Utils.normalize(80),
    borderRadius: Utils.normalize(8),
    marginBottom: Utils.normalize(16),
  },
  listItems: {
    flexGrow: 1,
    gap: Utils.normalize(12),
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
