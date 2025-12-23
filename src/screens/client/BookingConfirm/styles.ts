import { StyleSheet } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import normalize from '../../../utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(12),
  },
  button: {
    padding: normalize(12),
  },
  confirmCard: {
    gap: normalize(32),
    alignItems: 'center',
  },
  confirmIcon: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(60),
  },
  confirmLine: {
    alignItems: 'center',
    gap: normalize(8),
  },
  titleText: {
    fontSize: normalize(14),
    fontWeight: '500',
  },
  subtitleText: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  confirmText: {
    fontSize: normalize(24),
    fontWeight: '600',
  },
  summaryCard: {
    borderRadius: normalize(12),
    borderWidth: 0.75,
    gap: normalize(16),
    paddingTop: normalize(16),
    paddingBottom: normalize(12),
  },
  fullLengthView: {
    flex: 1,
    gap: normalize(8),
    paddingLeft: normalize(2),
  },
  row: {
    borderBottomWidth: 0.75,
    paddingBottom: normalize(16),
    paddingHorizontal: normalize(12),
  },
  categoryIcon: {
    width: normalize(16),
    height: normalize(16),
    resizeMode: 'contain',
    marginRight: normalize(12),
  },
  profileImage: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(25),
    marginRight: normalize(8),
  },
  rowLine: {
    width: '100%',
    paddingHorizontal: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    left: normalize(-12),
    borderWidth: 0.75,
  },
  gradient: {
    borderRadius: normalize(8),
    padding: normalize(8),
    marginHorizontal: normalize(12),
  },
  text: {
    alignSelf: 'flex-end',
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    bgPrimary: {
      backgroundColor: theme.colors.bgPrimary,
    },
    textPrimary: {
      color: theme.colors.textPrimary,
    },
    textSecondary: {
      color: theme.colors.textSecondary,
    },
    summaryCard: {
      borderColor: theme.colors.borderPrimary,
    },
    bottomBorder: {
      borderBottomColor: theme.colors.borderPrimary,
    },
  });
