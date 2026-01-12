import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import {Utils} from '@utils/index';
import { width } from '@config/constants/variables';
import { Config } from '@config/index';

export const staticStyle = StyleSheet.create({
  card: {
    width: Utils.normalize(width * 0.7),
    marginLeft: Utils.normalize(12),
  },
  background: {
    flex: 1,
  },
  name: {
    paddingLeft: Utils.normalize(8),
    fontSize: Utils.normalize(16),
    fontWeight: '600',
  },
  image: {
    borderRadius: Utils.normalize(20),
    width: Utils.normalize(36),
    height: Utils.normalize(36),
  },
  bellButton: {
    width: Utils.normalize(20),
    height: Utils.normalize(20),
  },
  listItems: {
    flexGrow: 1,
    gap: Utils.normalize(12),
  },
  counter: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerRow: {
    gap: Utils.normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionRow: {
    flexDirection: 'row',
    gap: Utils.normalize(8),
    alignItems: 'center',
  },
  container: {
    gap: Utils.normalize(10),
    paddingVertical: Utils.normalize(12),
    paddingHorizontal: Utils.normalize(12),
  },
  list: {
    flexGrow: 1,
  },
  walletIcon: {
    width: Utils.normalize(12),
    height: Utils.normalize(12),
    resizeMode: 'contain',
    marginRight: Utils.normalize(8),
  },
  viewAllText: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  viewAllButton: {
    gap: Utils.normalize(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllIcon: {
    width: Utils.normalize(5),
    height: Utils.normalize(9),
  },
  paddingTop: {
    paddingTop: Utils.normalize(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  star: {
    width: Utils.normalize(16),
    height: Utils.normalize(16),
  },
  separator: {
    height: Utils.normalize(1),
  },
  countText: {
    fontSize: Utils.normalize(18),
    fontWeight: '700',
  },
  verticalSeparator: {
    height: '100%',
    width: Utils.normalize(1),
  },
  gradientCard: {
    width: '100%',
    overflow: 'hidden',
    paddingTop: Utils.normalize(25),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  subtitleText: {
    fontSize: Utils.normalize(12),
    fontWeight: '400',
  },
  statusContainer: {
    borderWidth: 0.5,
    borderRadius: Utils.normalize(12),
    gap: Utils.normalize(12),
    padding: Utils.normalize(12),
  },
  transparentBG: {
    borderRadius: Utils.normalize(7),
    paddingVertical: Utils.normalize(8),
    paddingHorizontal: Utils.normalize(12),
  },
  header: {
    paddingHorizontal: Utils.normalize(16),
    marginBottom: Utils.normalize(12),
    paddingTop: Utils.normalize(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentActivityHeader: {
    paddingHorizontal: Utils.normalize(16),
    marginBottom: Utils.normalize(12),
    paddingTop: Utils.normalize(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: Utils.normalize(16),
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
      borderColor: Config.appColors.app_FFFFFF4D,
    },
    whiteText: {
      color: theme.colors.pureWhite,
    },
    transparentBG: {
      backgroundColor: Config.appColors.app_FFFFFF1A,
    },
  });
