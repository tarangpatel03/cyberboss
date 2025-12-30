import { StyleSheet } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import normalize from '../../../utils/normalize/normalize';
import { appColors } from '../../../config/colors/colors';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    gap: normalize(12),
    paddingTop: normalize(12),
    paddingHorizontal: normalize(12),
  },
  header: {
    paddingBottom: normalize(12),
  },
  titleText: {
    fontSize: normalize(14),
    fontWeight: '500',
  },
  loader: {
    zIndex: 10,
    width: '100%',
    height: '110%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    zIndex: 11,
    top: '50%',
    left: '40%',
    position: 'absolute',
    padding: normalize(20),
    borderRadius: normalize(16),
  },
  subtitleText: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  button: {
    padding: normalize(12),
  },
  card: {
    borderRadius: normalize(12),
    gap: normalize(16),
    padding: normalize(12),
    paddingTop: normalize(16),
  },
  separator: {
    width: '107.5%',
    borderWidth: 0.75,
    left: normalize(-12),
  },
  consultantProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    borderRadius: normalize(30),
    width: normalize(48),
    height: normalize(48),
    marginRight: normalize(8),
  },
  profileName: {
    flex: 1,
    gap: normalize(8),
  },
  rightShift: {
    left: normalize(3),
  },
  counter: {
    borderRadius: normalize(7),
    borderWidth: 0.75,
    flexDirection: 'row',
    padding: normalize(6),
  },
  counterButton: {
    width: normalize(20),
    alignItems: 'center',
    height: normalize(20),
    justifyContent: 'center',
  },
  plusIcon: {
    width: normalize(10),
    height: normalize(10),
  },
  serviceContainer: {
    borderRadius: normalize(8),
    gap: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(8),
  },
  typeIcon: {
    width: normalize(16),
    height: normalize(16),
    resizeMode: 'contain',
  },
  minusIcon: {
    width: normalize(10),
    height: normalize(2),
  },
  counterText: {
    fontSize: normalize(14),
    fontWeight: '600',
  },
  totalContainer: {
    borderRadius: normalize(8),
    padding: normalize(12),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    bgPrimary: {
      backgroundColor: theme.colors.bgPrimary,
    },
    bgSecondary: {
      backgroundColor: theme.colors.bgSecondary,
    },
    textPrimary: {
      color: theme.colors.textPrimary,
    },
    textSecondary: {
      color: theme.colors.textSecondary,
    },
    separator: {
      borderColor: theme.colors.borderPrimary,
    },
    loader: {
      backgroundColor: appColors.app_00000080,
    },
  });
