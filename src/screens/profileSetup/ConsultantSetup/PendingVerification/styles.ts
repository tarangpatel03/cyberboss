import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import {Utils} from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    paddingHorizontal: Utils.normalize(16),
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
    top: Utils.normalize(12, 'height'),
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
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Utils.normalize(32),
  },
  image: {
    width: Utils.normalize(56),
    height: Utils.normalize(56),
    alignSelf: 'center',
  },
  title: {
    fontSize: Utils.normalize(24),
    alignSelf: 'center',
    fontWeight: '600',
  },
  subTitle: {
    paddingHorizontal: Utils.normalize(12),
    textAlign: 'center',
    fontSize: Utils.normalize(14),
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
