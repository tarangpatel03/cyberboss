import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Utils.normalize(12),
    gap: Utils.normalize(12, 'height'),
    marginVertical: Utils.normalize(12, 'height'),
  },
  shimmerContainer: {
    width: '100%',
    height: Utils.normalize(80),
    borderRadius: Utils.normalize(8),
    marginBottom: Utils.normalize(16),
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Utils.normalize(100),
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
