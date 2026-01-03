import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import normalize from '@utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: normalize(12),
    paddingHorizontal: normalize(12),
  },
  header: {
    paddingTop: normalize(20),
    paddingBottom: normalize(12),
  },
  card: {
    gap: normalize(32),
    padding: normalize(12),
    paddingTop: normalize(20),
    borderRadius: normalize(12),
  },
  ratingLine: {
    gap: normalize(8),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tinyText: {
    fontWeight: '400',
    fontSize: normalize(12),
  },
  star: {
    width: normalize(36),
    height: normalize(36),
    marginHorizontal: normalize(7),
  },
  line: {
    width: '35%',
    height: normalize(1),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    gap: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: normalize(14),
    fontWeight: '500',
  },
  review: {
    gap: normalize(16),
  },
  button: {
    padding: normalize(12),
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    minHeight: normalize(80),
    borderRadius: normalize(12),
    paddingHorizontal: normalize(6),
  },
  input: {
    top: 0,
    fontWeight: '400',
    fontSize: normalize(14),
  },
  askAi: {
    right: normalize(4),
    width: normalize(76),
    position: 'absolute',
    bottom: normalize(4),
    height: normalize(27),
    resizeMode: 'contain',
    paddingBottom: normalize(8),
  },
  refresherContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refresher: {
    alignSelf: 'center',
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    primaryBg: {
      backgroundColor: theme.colors.bgPrimary,
    },
    secondaryBg: {
      backgroundColor: theme.colors.bgSecondary,
    },
    secondaryText: {
      color: theme.colors.textSecondary,
    },
    primaryText: {
      color: theme.colors.textPrimary,
    },
    inputContainer: {
      borderColor: theme.colors.borderPrimary,
    },
  });
