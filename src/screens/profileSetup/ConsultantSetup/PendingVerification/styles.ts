import { StyleSheet } from 'react-native';
import { Theme } from '../../../../config/themes/themes';
import normalize from '../../../../utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    paddingHorizontal: normalize(16),
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
    top: normalize(12, 'height'),
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
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalize(32),
  },
  image: {
    width: normalize(56),
    height: normalize(56),
    alignSelf: 'center',
  },
  title: {
    fontSize: normalize(24),
    alignSelf: 'center',
    fontWeight: '600',
  },
  subTitle: {
    paddingHorizontal: normalize(12),
    textAlign: 'center',
    fontSize: normalize(14),
    alignSelf: 'center',
    fontWeight: '400',
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
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
  });
