import { StyleSheet } from 'react-native';
import {Utils} from '@utils/index';
import { height } from '@config/constants/variables';
import { Theme } from '@config/themes/themes';

export const staticStyle = StyleSheet.create({
  topBar: {
    height: Utils.normalize(75, 'height'),
  },
  background: {
    flex: 1,
    height: Utils.normalize(height, 'height'),
  },
  profileInfo: {
    paddingHorizontal: Utils.normalize(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    height: Utils.normalize(60, 'height'),
  },
  profilePictureName: {
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Utils.normalize(8),
  },
  image: {
    width: Utils.normalize(36),
    height: Utils.normalize(36),
    borderRadius: Utils.normalize(20),
  },
  profileText: {
    borderRadius: Utils.normalize(4),
    width: Utils.normalize(60),
    height: Utils.normalize(14),
  },
  bellButton: {
    width: Utils.normalize(20),
    height: Utils.normalize(20),
  },
  helpButton: {
    alignItems: 'center',
    gap: Utils.normalize(6),
  },
  proUser: {
    width: Utils.normalize(68),
    height: Utils.normalize(28, 'height'),
    borderRadius: Utils.normalize(20),
    resizeMode: 'contain',
  },
  searchBar: {
    width: '87%',
    height: Utils.normalize(50, 'height'),
    flexDirection: 'row',
    paddingHorizontal: Utils.normalize(12),
    gap: Utils.normalize(12),
    paddingTop: Utils.normalize(10, 'height'),
  },
  imageButton: {
    width: Utils.normalize(32),
    height: Utils.normalize(32),
  },
  container: {
    flex: 1,
    paddingTop: Utils.normalize(12),
  },
  list: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: Utils.normalize(16),
    marginBottom: Utils.normalize(16, 'height'),
    paddingTop: Utils.normalize(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tinyText: {
    fontSize: Utils.normalize(12),
    fontWeight: '500',
  },
  headerText: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
  viewAllText: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Utils.normalize(5),
  },
  workShopCard: {
    width: Utils.normalize(240),
    height: Utils.normalize(170),
    borderWidth: Utils.normalize(1),
    marginLeft: Utils.normalize(12),
    borderRadius: Utils.normalize(12),
  },
  viewAllIcon: {
    width: Utils.normalize(5),
    height: Utils.normalize(9),
  },
  searchContainer: {
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: Utils.normalize(12),
    height: Utils.normalize(40, 'height'),
    paddingHorizontal: Utils.normalize(12),
  },
  searchIcon: {
    width: Utils.normalize(24),
    height: Utils.normalize(24),
    resizeMode: 'contain',
  },
  browseService: {
    width: '95%',
    alignSelf: 'center',
    height: Utils.normalize(122),
    borderRadius: Utils.normalize(12),
    marginBottom: Utils.normalize(12),
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
