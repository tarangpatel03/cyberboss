import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: Utils.normalize(12),
  },
  innerContainer: {
    paddingHorizontal: Utils.normalize(12),
    paddingTop: Utils.normalize(12),
    gap: Utils.normalize(12),
  },
  titleText: {
    fontSize: Utils.normalize(14),
    fontWeight: '500',
  },
  downloadInvoice: {
    gap: Utils.normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadIcon: {
    width: Utils.normalize(15),
    height: Utils.normalize(15),
  },
  buttonText: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
  subtitleText: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
    paddingLeft: Utils.normalize(3),
  },
  text: {
    alignSelf: 'flex-end',
  },
  card: {
    borderRadius: Utils.normalize(12),
    gap: Utils.normalize(16),
    paddingHorizontal: Utils.normalize(12),
    paddingVertical: Utils.normalize(16),
    marginBottom: Utils.normalize(12),
  },
  rowLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  padding8: {
    padding: Utils.normalize(8),
  },
  input: {
    padding: Utils.normalize(12),
    borderRadius: Utils.normalize(10),
    gap: Utils.normalize(12),
  },
  horizontalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryIcon: {
    width: Utils.normalize(16),
    height: Utils.normalize(16),
    resizeMode: 'contain',
    marginRight: Utils.normalize(12),
  },
  gradient: {
    borderRadius: Utils.normalize(8),
  },
  profileImage: {
    width: Utils.normalize(48),
    height: Utils.normalize(48),
    borderRadius: Utils.normalize(25),
    marginRight: Utils.normalize(8),
  },
  fullLengthView: {
    paddingLeft: Utils.normalize(2),
    gap: Utils.normalize(8),
    flex: 1,
  },
  id: {
    gap: Utils.normalize(8),
  },
  button: {
    padding: Utils.normalize(12),
    gap: Utils.normalize(12),
  },
  statusContainer: {
    paddingVertical: Utils.normalize(6),
    paddingHorizontal: Utils.normalize(12),
    gap: Utils.normalize(6),
    borderRadius: Utils.normalize(24),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  downloadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Utils.normalize(8),
    paddingVertical: Utils.normalize(12),
    borderRadius: Utils.normalize(12),
  },
  icon: {
    width: Utils.normalize(14),
    height: Utils.normalize(14),
    borderRadius: Utils.normalize(10),
  },
  tinyText: {
    fontSize: Utils.normalize(12),
    fontWeight: '500',
  },
  separator: {
    borderWidth: 0.75,
  },
  fullWidth: {
    width: '107.5%',
    left: Utils.normalize(-12),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    primaryBackground: {
      backgroundColor: theme.colors.primary,
    },
    innerContainer: {
      backgroundColor: theme.colors.bgSecondary,
    },
    primaryText: {
      color: theme.colors.textPrimary,
    },
    secondaryText: {
      color: theme.colors.textSecondary,
    },
    redBG: {
      backgroundColor: theme.colors.pureTransparentOrange,
    },
    greenBG: {
      backgroundColor: theme.colors.pureTransparentGreen,
    },
    redText: {
      color: theme.colors.pureOrange,
    },
    greenText: {
      color: theme.colors.pureGreen,
    },
    separator: {
      borderColor: theme.colors.borderPrimary,
    },
  });
