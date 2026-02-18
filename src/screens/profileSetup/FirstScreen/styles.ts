import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Utils.normalize(15, 'height'),
  },
  backIcon: {
    width: Utils.normalize(20),
    height: Utils.normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  backButton: {
    position: 'absolute',
    left: Utils.normalize(16),
    top: Utils.normalize(12, 'height'),
    width: Utils.normalize(16),
    height: Utils.normalize(12, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    borderRadius: Utils.normalize(5),
    width: Utils.normalize(239),
    alignSelf: 'center',
    height: Utils.normalize(5, 'height'),
  },
  content: {
    gap: Utils.normalize(32, 'height'),
    alignItems: 'center',
    paddingTop: Utils.normalize(20, 'height'),
    paddingHorizontal: Utils.normalize(12),
  },
  titleView: {
    gap: Utils.normalize(8, 'height'),
  },
  title: {
    fontSize: Utils.normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  selectionCardContainer: {
    width: '100%',
    gap: Utils.normalize(16, 'height'),
  },
  bottomButton: {
    paddingHorizontal: Utils.normalize(16),
    bottom: Utils.normalize(10, 'height'),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    backIcon: {
      tintColor: theme.colors.textPrimary,
    },
    line: {
      backgroundColor: theme.colors.cardBackground,
    },
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
  });
