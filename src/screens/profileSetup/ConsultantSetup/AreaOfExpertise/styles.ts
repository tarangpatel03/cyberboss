import { StyleSheet } from 'react-native';
import {Utils} from '@utils/index';
import { Theme } from '@config/themes/themes';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    paddingHorizontal: Utils.normalize(16),
    paddingBottom: Utils.normalize(10, 'height'),
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Utils.normalize(15, 'height'),
    paddingHorizontal: Utils.normalize(16),
    flexDirection: 'row',
  },
  backButton: {
    position: 'absolute',
    left: Utils.normalize(16),
    top: Utils.normalize(12),
    width: Utils.normalize(16),
    height: Utils.normalize(12, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: Utils.normalize(20),
    height: Utils.normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  content: {
    alignItems: 'center',
    paddingTop: Utils.normalize(24, 'height'),
    gap: Utils.normalize(8),
  },
  line: {
    marginTop: Utils.normalize(3),
    width: Utils.normalize(239),
    borderRadius: Utils.normalize(5),
    height: Utils.normalize(5, 'height'),
  },
  fillLineDetail: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: '25%',
    height: '100%',
  },
  lineDetail: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: '75%',
    height: '100%',
  },
  list: {
    flex: 1,
    paddingTop: Utils.normalize(16, 'height'),
    paddingHorizontal: Utils.normalize(12),
  },
  listBar: {
    flexGrow: 1,
    gap: Utils.normalize(12),
  },
  title: {
    fontSize: Utils.normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    filledLine: {
      backgroundColor: theme.colors.primary,
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
