import { StyleSheet } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import normalize from '../../../utils/normalize/normalize';
import { appColors } from '../../../config/colors/colors';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    gap: normalize(12),
    paddingBottom: normalize(30),
  },
  shimmerContainer: {
    width: '100%',
    height: normalize(233),
    marginBottom: normalize(12),
    borderRadius: normalize(12),
  },
  header: {
    paddingTop: normalize(10),
    paddingHorizontal: normalize(12),
  },
  list: {
    height: '100%',
    paddingHorizontal: normalize(12),
  },
  optionText: {
    fontWeight: '400',
    fontSize: normalize(16),
  },
  listItems: {
    flexGrow: 1,
    gap: normalize(12),
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
    width: normalize(169),
    padding: normalize(16),
    backgroundColor: appColors.app_FFFFFF,
    borderRadius: normalize(12),
    elevation: 10,
    gap: normalize(24),
  },
  option: {
    flexDirection: 'row',
    gap: normalize(8),
  },
  icon: {
    width: normalize(20),
    height: normalize(20),
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
    primarytext: {
      color: theme.colors.textPrimary,
    },
  });
