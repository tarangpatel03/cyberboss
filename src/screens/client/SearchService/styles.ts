import { StyleSheet } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import normalize from '../../../utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    paddingTop: normalize(24),
    padding: normalize(12),
  },
  browseService: {
    width: '100%',
    alignSelf: 'center',
    height: normalize(122),
    borderWidth: normalize(1),
    borderRadius: normalize(12),
    marginBottom: normalize(12),
  },
  list: {
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
