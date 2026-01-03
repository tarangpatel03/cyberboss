import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import normalize from '@utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    gap: normalize(18, 'height'),
  },
  inputField: {
    flex: 1,
    gap: normalize(20),
    paddingHorizontal: normalize(12),
  },
  buttonContainer: {
    padding: normalize(12),
  },
});
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
  });
