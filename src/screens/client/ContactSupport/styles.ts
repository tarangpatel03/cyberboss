import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Utils.normalize(12),
    paddingHorizontal: Utils.normalize(20),
    gap: Utils.normalize(16),
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Utils.normalize(8),
  },
  centralHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Utils.normalize(12),
  },
  profile: {
    width: Utils.normalize(44),
    height: Utils.normalize(44),
    borderRadius: Utils.normalize(22),
  },
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: Utils.normalize(32),
    height: Utils.normalize(32),
    borderRadius: Utils.normalize(16),
  },
  input: {
    width: '85%',
    fontWeight: '400',
    paddingVertical: 0,
    alignItems: 'center',
    fontSize: Utils.normalize(16),
    maxHeight: Utils.normalize(150),
    marginLeft: Utils.normalize(10),
  },
  removeBorder: {
    borderWidth: 0,
    top: Utils.normalize(-3),
    width: '80%',
    paddingHorizontal: Utils.normalize(4),
  },
  moreIcon: {
    width: Utils.normalize(16),
    height: Utils.normalize(3.5),
    resizeMode: 'contain',
  },
  backIcon: {
    width: Utils.normalize(16),
    height: Utils.normalize(12),
    resizeMode: 'contain',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Utils.normalize(32),
    height: Utils.normalize(32),
    borderRadius: Utils.normalize(16),
  },
  sendIcon: {
    width: Utils.normalize(12),
    height: Utils.normalize(16),
    resizeMode: 'contain',
  },
  listContainer: {
    paddingTop: Utils.normalize(8),
    paddingHorizontal: Utils.normalize(12),
    flex: 1,
  },
  title: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
  list: {
    flexGrow: 1,
    gap: Utils.normalize(12),
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Utils.normalize(12),
  },
  inputBar: {
    maxWidth: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Utils.normalize(8),
    maxHeight: Utils.normalize(150),
    borderRadius: Utils.normalize(24),
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
