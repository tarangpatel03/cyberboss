import { StyleSheet } from 'react-native';
import {Utils} from '@utils/index';
import { Theme } from '@config/themes/themes';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
      flex: 1,
    },
    containerView: {
      flex: 1,
    },
    bottomButtons: {
      backgroundColor: theme.colors.bgPrimary,
      flexDirection: 'row',
      gap: Utils.normalize(12),
      paddingHorizontal: 16,
      bottom: Utils.normalize(10, 'height'),
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '48%',
      borderRadius: Utils.normalize(12),
      padding: 12,
      height: Utils.normalize(48),
    },
    nextButton: {
      backgroundColor: theme.colors.primary,
    },
    fullLength: {
      width: '100%',
      flexDirection: 'row',
    },
    skipButton: {
      backgroundColor: theme.colors.secondary,
    },
    nextText: {
      fontSize: Utils.normalize(16),
      fontWeight: '500',
      color: theme.colors.pureWhite,
    },
    skipText: {
      fontSize: Utils.normalize(16),
      fontWeight: '500',
      color: theme.colors.textSecondary,
    },
  });
