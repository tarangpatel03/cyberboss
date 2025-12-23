import { StyleSheet } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import normalize from '../../../utils/normalize/normalize';
import { height } from '../../../config/constants/variables';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    height: normalize(height),
    paddingBottom: normalize(12),
  },
  topbar: {
    paddingTop: normalize(20),
    paddingBottom: normalize(12),
  },
  searchBar: {
    paddingHorizontal: normalize(12),
    paddingBottom: normalize(12),
  },
  list: {
    flex: 1,
    paddingHorizontal: normalize(12),
  },
  shimmer: {
    width: '100%',
    height: normalize(113),
    marginBottom: normalize(12),
    borderRadius: normalize(12),
  },
  listItems: {
    flexGrow: 1,
    gap: normalize(12),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
  });
