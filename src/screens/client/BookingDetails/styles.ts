import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';
import { Config } from '@config/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    gap: Utils.normalize(12),
    paddingTop: Utils.normalize(12),
    paddingHorizontal: Utils.normalize(12),
  },
  header: {
    paddingBottom: Utils.normalize(12),
  },
  titleText: {
    fontSize: Utils.normalize(14),
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
    padding: Utils.normalize(20),
    borderRadius: Utils.normalize(16),
  },
  subtitleText: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  button: {
    padding: Utils.normalize(12),
  },
  card: {
    borderRadius: Utils.normalize(12),
    gap: Utils.normalize(16),
    padding: Utils.normalize(12),
    paddingTop: Utils.normalize(16),
  },
  separator: {
    width: '107.5%',
    borderWidth: 0.75,
    left: Utils.normalize(-12),
  },
  consultantProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    borderRadius: Utils.normalize(30),
    width: Utils.normalize(48),
    height: Utils.normalize(48),
    marginRight: Utils.normalize(8),
  },
  profileName: {
    flex: 1,
    gap: Utils.normalize(8),
  },
  rightShift: {
    left: Utils.normalize(3),
  },
  counter: {
    borderRadius: Utils.normalize(7),
    borderWidth: 0.75,
    flexDirection: 'row',
    padding: Utils.normalize(6),
  },
  counterButton: {
    width: Utils.normalize(20),
    alignItems: 'center',
    height: Utils.normalize(20),
    justifyContent: 'center',
  },
  plusIcon: {
    width: Utils.normalize(10),
    height: Utils.normalize(10),
  },
  serviceContainer: {
    borderRadius: Utils.normalize(8),
    gap: Utils.normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    padding: Utils.normalize(8),
  },
  typeIcon: {
    width: Utils.normalize(16),
    height: Utils.normalize(16),
    resizeMode: 'contain',
  },
  minusIcon: {
    width: Utils.normalize(10),
    height: Utils.normalize(2),
  },
  counterText: {
    fontSize: Utils.normalize(14),
    fontWeight: '600',
  },
  totalContainer: {
    borderRadius: Utils.normalize(8),
    padding: Utils.normalize(12),
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
      backgroundColor: Config.appColors.app_00000080,
    },
  });
