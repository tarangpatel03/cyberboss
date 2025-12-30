import { StyleSheet } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import normalize from '../../../utils/normalize/normalize';
import { width } from '../../../config/constants/variables';
import { appColors } from '../../../config/colors/colors';

export const staticStyle = StyleSheet.create({
  topBar: {
    height: normalize(75, 'height'),
  },
  card: {
    width: normalize(width * 0.7),
    marginLeft: normalize(12),
  },
  background: {
    flex: 1,
  },
  tour: {
    display: 'none',
  },
  searchBarContainer: {
    width: '86%',
  },
  searchContainer: {
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: normalize(12),
    height: normalize(40, 'height'),
    paddingHorizontal: normalize(12),
  },
  searchIcon: {
    width: normalize(24),
    height: normalize(24),
    resizeMode: 'contain',
  },
  profileInfo: {
    paddingHorizontal: normalize(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    height: normalize(60, 'height'),
  },
  profilePictureName: {
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  notificationDot: {
    top: 0,
    right: 0,
    zIndex: 10,
    width: normalize(8),
    height: normalize(8),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(5),
  },
  notificationDotInner: {
    width: normalize(5),
    height: normalize(5),
    borderRadius: normalize(5),
    backgroundColor: appColors.app_F20000,
  },
  image: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
  },
  profileText: {
    fontSize: normalize(16),
    fontWeight: '600',
  },
  bellButton: {
    width: normalize(20),
    height: normalize(20),
  },
  text: {
    fontSize: normalize(14),
    fontWeight: '500',
  },
  helpButton: {
    alignItems: 'center',
    gap: normalize(6),
  },
  proUser: {
    width: normalize(68),
    height: normalize(28, 'height'),
    borderRadius: normalize(14),
    resizeMode: 'contain',
  },
  searchBar: {
    width: '100%',
    height: normalize(50, 'height'),
    flexDirection: 'row',
    paddingHorizontal: normalize(12),
    gap: normalize(12),
    paddingVertical: normalize(10),
    marginBottom: normalize(12),
  },
  imageButton: {
    width: normalize(32),
    height: normalize(32),
  },
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    gap: normalize(12),
  },
  header: {
    paddingHorizontal: normalize(16),
    marginBottom: normalize(16, 'height'),
    paddingTop: normalize(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tinyText: {
    fontSize: normalize(12),
    fontWeight: '500',
  },
  headerText: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  viewAllText: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(5),
  },
  viewAllIcon: {
    width: normalize(5),
    height: normalize(9),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    profileText: {
      color: theme.colors.textPrimary,
    },
    background: {
      backgroundColor: theme.colors.bgPrimary,
    },
    text: {
      color: theme.colors.textPrimary,
    },
    headerText: {
      color: theme.colors.textPrimary,
    },
    helpText: {
      color: theme.colors.textSecondary,
    },
    viewAllText: {
      color: theme.colors.primary,
    },
    borderPrimary: {
      borderColor: theme.colors.borderPrimary,
    },
  });
