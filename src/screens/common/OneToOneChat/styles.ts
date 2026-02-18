import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';
import { width } from '@config/constants/variables';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Utils.normalize(12),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Utils.normalize(12),
    justifyContent: 'space-between',
    gap: Utils.normalize(16),
  },
  subheader: {
    flexDirection: 'row',
    gap: Utils.normalize(8),
    alignItems: 'center',
  },
  centralHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Utils.normalize(12),
  },
  input: {
    width: '75%',
    fontWeight: '400',
    paddingVertical: 0,
    alignItems: 'center',
    fontSize: Utils.normalize(16),
    maxHeight: Utils.normalize(150),
    marginLeft: Utils.normalize(10),
  },
  profile: {
    width: Utils.normalize(44),
    height: Utils.normalize(44),
    borderRadius: Utils.normalize(22),
  },
  removeBorder: {
    borderWidth: 0,
    top: Utils.normalize(-2),
    width: '80%',
    paddingHorizontal: Utils.normalize(4),
  },
  moreIcon: {
    width: Utils.normalize(16),
    height: Utils.normalize(3.5, 'height'),
    resizeMode: 'contain',
  },
  backIcon: {
    width: Utils.normalize(16),
    height: Utils.normalize(12, 'height'),
    resizeMode: 'contain',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Utils.normalize(32),
    height: Utils.normalize(32),
    borderRadius: Utils.normalize(16),
  },
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
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
    flex: 1,
    width: width,
    left: Utils.normalize(-12),
    paddingTop: Utils.normalize(8),
    paddingHorizontal: Utils.normalize(12),
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
    input: {
      color: theme.colors.textPrimary,
    },
    inputBar: {
      backgroundColor: theme.colors.bgPrimary,
      borderColor: theme.colors.borderPrimary,
    },
    sendButton: {
      backgroundColor: theme.colors.primary,
    },
  });
