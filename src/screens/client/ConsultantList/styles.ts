import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Utils.normalize(12),
  },
  topBar: {
    paddingBottom: Utils.normalize(12),
  },
  searchBar: {
    paddingHorizontal: Utils.normalize(12),
    paddingBottom: Utils.normalize(12),
  },
  list: {
    flex: 1,
    paddingHorizontal: Utils.normalize(12),
  },
  shimmer: {
    width: '100%',
    height: Utils.normalize(113),
    marginBottom: Utils.normalize(12),
    borderRadius: Utils.normalize(12),
  },
  listItems: {
    flexGrow: 1,
    gap: Utils.normalize(12),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
  });
