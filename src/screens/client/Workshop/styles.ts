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
  cardStyle: {
    marginTop: normalize(12),
    width: '95%',
  },
  list: {
    flexGrow: 1,
    gap: normalize(12),
  },
  shimmerContainer: {
    width: '100%',
    height: normalize(157),
    marginTop: normalize(12),
    borderRadius: normalize(12),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    image: {
      tintColor: theme.colors.textPrimary,
    },
  });
