import { StyleSheet } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import normalize from '../../../utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginVertical: normalize(12, 'height'),
    paddingHorizontal: normalize(12),
    gap: normalize(12, 'height'),
  },
  shimmerContainer: {
    width: '100%',
    height: normalize(80),
    borderRadius: normalize(8),
    marginBottom: normalize(16),
  },
  listContainer: {
    paddingHorizontal: normalize(12),
    flex: 1,
  },
  list: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(12),
  },
  listItems: {
    flexGrow: 1,
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
  });
