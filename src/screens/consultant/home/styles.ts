import { StyleSheet } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import normalize from '../../../utils/normalize/normalize';
import { width } from '../../../config/constants/variables';
import { appColors } from '../../../config/colors/colors';

export const staticStyle = StyleSheet.create({
  card: {
    width: normalize(width * 0.7),
    marginLeft: normalize(12),
  },
  background: {
    flex: 1,
  },
  name: {
    paddingLeft: normalize(8),
  },
  image: {
    borderRadius: normalize(20),
    width: normalize(36),
    height: normalize(36),
  },
  bellButton: {
    width: normalize(20),
    height: normalize(20),
  },
  listItems: {
    flexGrow: 1,
    gap: normalize(12),
  },
  counter: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerRow: {
    gap: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionRow: {
    flexDirection: 'row',
    gap: normalize(8),
    alignItems: 'center',
  },
  container: {
    gap: normalize(10),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(12),
  },
  list: {
    flexGrow: 1,
  },
  walletIcon: {
    width: normalize(12),
    height: normalize(12),
    resizeMode: 'contain',
    marginRight: normalize(8),
  },
  viewAllText: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  viewAllButton: {
    gap: normalize(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllIcon: {
    width: normalize(5),
    height: normalize(9),
  },
  paddingTop: {
    paddingTop: normalize(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  star: {
    width: normalize(16),
    height: normalize(16),
  },
  separator: {
    height: normalize(1),
  },
  countText: {
    fontSize: normalize(18),
    fontWeight: '700',
  },
  verticalSeparator: {
    height: '100%',
    width: normalize(1),
  },
  gradientCard: {
    width: '100%',
    overflow: 'hidden',
    paddingTop: normalize(25),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  subtitleText: {
    fontSize: normalize(12),
    fontWeight: '400',
  },
  statusContainer: {
    borderWidth: 0.5,
    borderRadius: normalize(12),
    gap: normalize(12),
    padding: normalize(12),
  },
  transparentBG: {
    borderRadius: normalize(7),
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(12),
  },
  header: {
    paddingHorizontal: normalize(16),
    marginBottom: normalize(16, 'height'),
    paddingTop: normalize(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    backgroundPrimary: {
      backgroundColor: theme.colors.bgPrimary,
    },
    textPrimary: {
      color: theme.colors.textPrimary,
    },
    textSecondary: {
      color: theme.colors.textSecondary,
    },
    viewAllText: {
      color: theme.colors.primary,
    },
    statusContainer: {
      borderColor: appColors.app_FFFFFF4D,
    },
    whiteText: {
      color: theme.colors.pureWhite,
    },
    transparentBG: {
      backgroundColor: appColors.app_FFFFFF1A,
    },
  });
