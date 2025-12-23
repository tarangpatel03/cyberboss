import { StyleSheet } from 'react-native';
import normalize from '../../../../utils/normalize/normalize';
import { Theme } from '../../../../config/themes/themes';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(10, 'height'),
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: normalize(15, 'height'),
    paddingHorizontal: normalize(16),
    flexDirection: 'row',
  },
  backButton: {
    position: 'absolute',
    left: normalize(16),
    top: normalize(12),
    width: normalize(16),
    height: normalize(12, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: normalize(20),
    height: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  content: {
    alignItems: 'center',
    paddingTop: normalize(24, 'height'),
    gap: normalize(8),
  },
  line: {
    marginTop: normalize(3),
    width: normalize(239),
    borderRadius: normalize(5),
    height: normalize(5, 'height'),
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
    paddingTop: normalize(16, 'height'),
    paddingHorizontal: normalize(12),
  },
  listBar: {
    flexGrow: 1,
    gap: normalize(12),
  },
  title: {
    fontSize: normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: normalize(14),
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
