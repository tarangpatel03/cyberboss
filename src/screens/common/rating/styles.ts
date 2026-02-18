import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Utils.normalize(12),
    paddingHorizontal: Utils.normalize(12),
  },
  mainContainer: {
    flex: 1,
  },
  header: {
    paddingBottom: Utils.normalize(12),
  },
  card: {
    gap: Utils.normalize(32),
    padding: Utils.normalize(12),
    paddingTop: Utils.normalize(20),
    borderRadius: Utils.normalize(12),
  },
  ratingLine: {
    gap: Utils.normalize(8),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tinyText: {
    fontWeight: '400',
    fontSize: Utils.normalize(12),
  },
  star: {
    width: Utils.normalize(36),
    height: Utils.normalize(36),
    marginHorizontal: Utils.normalize(7),
  },
  line: {
    width: '35%',
    height: Utils.normalize(1),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    gap: Utils.normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: Utils.normalize(14),
    fontWeight: '500',
  },
  review: {
    gap: Utils.normalize(16),
  },
  button: {
    paddingHorizontal: Utils.normalize(12),
    paddingTop: Utils.normalize(12),
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    minHeight: Utils.normalize(80),
    borderRadius: Utils.normalize(12),
    paddingHorizontal: Utils.normalize(6),
  },
  input: {
    top: 0,
    fontWeight: '400',
    fontSize: Utils.normalize(14),
    paddingBottom: Utils.normalize(40),
  },
  askAi: {
    right: Utils.normalize(4),
    width: Utils.normalize(76),
    position: 'absolute',
    bottom: Utils.normalize(4),
    height: Utils.normalize(27),
    resizeMode: 'contain',
    paddingBottom: Utils.normalize(8),
  },
  refresherContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refresher: {
    alignSelf: 'center',
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    primaryBg: {
      backgroundColor: theme.colors.bgPrimary,
    },
    secondaryBg: {
      backgroundColor: theme.colors.bgSecondary,
    },
    secondaryText: {
      color: theme.colors.textSecondary,
    },
    primaryText: {
      color: theme.colors.textPrimary,
    },
    inputContainer: {
      borderColor: theme.colors.borderPrimary,
    },
  });
