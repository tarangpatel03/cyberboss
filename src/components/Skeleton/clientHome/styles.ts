import { StyleSheet } from 'react-native';
import normalize from '@utils/normalize/normalize';
import { height } from '@config/constants/variables';
import { Theme } from '@config/themes/themes';

export const staticStyle = StyleSheet.create({
  topBar: {
    height: normalize(75, 'height'),
  },
  background: {
    flex: 1,
    height: normalize(height, 'height'),
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
  image: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(20),
  },
  profileText: {
    borderRadius: normalize(4),
    width: normalize(60),
    height: normalize(14),
  },
  bellButton: {
    width: normalize(20),
    height: normalize(20),
  },
  helpButton: {
    alignItems: 'center',
    gap: normalize(6),
  },
  proUser: {
    width: normalize(68),
    height: normalize(28, 'height'),
    borderRadius: normalize(20),
    resizeMode: 'contain',
  },
  searchBar: {
    width: '87%',
    height: normalize(50, 'height'),
    flexDirection: 'row',
    paddingHorizontal: normalize(12),
    gap: normalize(12),
    paddingTop: normalize(10, 'height'),
  },
  imageButton: {
    width: normalize(32),
    height: normalize(32),
  },
  container: {
    flex: 1,
    paddingTop: normalize(12),
  },
  list: {
    flexGrow: 1,
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
  workShopCard: {
    width: normalize(240),
    height: normalize(170),
    borderWidth: normalize(1),
    marginLeft: normalize(12),
    borderRadius: normalize(12),
  },
  viewAllIcon: {
    width: normalize(5),
    height: normalize(9),
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
  browseService: {
    width: '95%',
    alignSelf: 'center',
    height: normalize(122),
    borderRadius: normalize(12),
    marginBottom: normalize(12),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.colors.bgPrimary,
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
    container: {
      borderColor: theme.colors.borderPrimary,
    },
  });
