import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';
import { Config } from '@config/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    gap: Utils.normalize(12),
    paddingBottom: Utils.normalize(30),
  },
  shimmerContainer: {
    width: '100%',
    height: Utils.normalize(233),
    marginBottom: Utils.normalize(12),
    borderRadius: Utils.normalize(12),
  },
  header: {
    paddingTop: Utils.normalize(10),
    paddingHorizontal: Utils.normalize(12),
  },
  list: {
    height: '100%',
    paddingHorizontal: Utils.normalize(12),
  },
  optionText: {
    fontWeight: '400',
    fontSize: Utils.normalize(16),
  },
  listItems: {
    flexGrow: 1,
    gap: Utils.normalize(12),
  },
  modalWrapper: {
    position: 'absolute',
    zIndex: 999,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  modalContent: {
    width: Utils.normalize(169),
    padding: Utils.normalize(16),
    backgroundColor: Config.appColors.app_FFFFFF,
    borderRadius: Utils.normalize(12),
    elevation: 10,
    gap: Utils.normalize(24),
  },
  option: {
    flexDirection: 'row',
    gap: Utils.normalize(8),
  },
  icon: {
    width: Utils.normalize(20),
    height: Utils.normalize(20),
    resizeMode: 'contain',
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    image: {
      tintColor: theme.colors.textPrimary,
    },
    bgSecondary: {
      backgroundColor: theme.colors.bgSecondary,
    },
    primaryText: {
      color: theme.colors.textPrimary,
    },
  });
