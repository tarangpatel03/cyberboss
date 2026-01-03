import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import normalize from '@utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(20),
    gap: normalize(16),
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  centralHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },
  profile: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
  },
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
  },
  input: {
    width: '85%',
    fontWeight: '400',
    paddingVertical: 0,
    alignItems: 'center',
    fontSize: normalize(16),
    maxHeight: normalize(150),
    marginLeft: normalize(10),
  },
  removeBorder: {
    borderWidth: 0,
    top: normalize(-3),
    width: '80%',
    paddingHorizontal: normalize(4),
  },
  moreIcon: {
    width: normalize(16),
    height: normalize(3.5),
    resizeMode: 'contain',
  },
  backIcon: {
    width: normalize(16),
    height: normalize(12),
    resizeMode: 'contain',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
  },
  sendIcon: {
    width: normalize(12),
    height: normalize(16),
    resizeMode: 'contain',
  },
  listContainer: {
    paddingTop: normalize(8),
    paddingHorizontal: normalize(12),
    flex: 1,
  },
  title: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  list: {
    flexGrow: 1,
    gap: normalize(12),
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(12),
  },
  inputBar: {
    maxWidth: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(8),
    maxHeight: normalize(150),
    borderRadius: normalize(24),
    borderWidth: 1,
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    title: {
      color: theme.colors.textPrimary,
    },
    listContainer: {
      backgroundColor: theme.colors.cardBackground,
    },
    inputBar: {
      backgroundColor: theme.colors.bgPrimary,
      borderColor: theme.colors.borderPrimary,
    },
    sendButton: {
      backgroundColor: theme.colors.primary,
    },
  });
