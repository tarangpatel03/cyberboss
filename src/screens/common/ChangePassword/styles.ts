import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    gap: Utils.normalize(18, 'height'),
  },
  inputField: {
    flex: 1,
    gap: Utils.normalize(20),
    paddingHorizontal: Utils.normalize(12),
  },
  buttonContainer: {
    padding: Utils.normalize(12),
  },
});
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
  });
