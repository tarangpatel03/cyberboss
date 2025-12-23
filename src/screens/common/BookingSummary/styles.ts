import { StyleSheet } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import normalize from '../../../utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: normalize(12),
  },
  innerContainer: {
    paddingHorizontal: normalize(12),
    paddingTop: normalize(12),
    gap: normalize(12),
  },
  titleText: {
    fontSize: normalize(14),
    fontWeight: '500',
  },
  downloadInvoice: {
    gap: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadIcon: {
    width: normalize(15),
    height: normalize(15),
  },
  buttonText: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  subtitleText: {
    fontSize: normalize(14),
    fontWeight: '400',
    paddingLeft: normalize(3),
  },
  text: {
    alignSelf: 'flex-end',
  },
  card: {
    borderRadius: normalize(12),
    gap: normalize(16),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(16),
    marginBottom: normalize(12),
  },
  rowLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: normalize(12),
    borderRadius: normalize(10),
    gap: normalize(12),
  },
  horizontalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryIcon: {
    width: normalize(16),
    height: normalize(16),
    resizeMode: 'contain',
    marginRight: normalize(12),
  },
  gradient: {
    padding: normalize(8),
    borderRadius: normalize(8),
  },
  profileImage: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(25),
    marginRight: normalize(8),
  },
  fullLengthView: {
    paddingLeft: normalize(2),
    gap: normalize(8),
    flex: 1,
  },
  id: {
    gap: normalize(8),
  },
  button: {
    padding: normalize(12),
    gap: normalize(12),
  },
  statusContainer: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    gap: normalize(6),
    borderRadius: normalize(24),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  downloadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: normalize(8),
    paddingVertical: normalize(12),
    borderRadius: normalize(12),
  },
  icon: {
    width: normalize(14),
    height: normalize(14),
    borderRadius: normalize(10),
  },
  tinyText: {
    fontSize: normalize(12),
    fontWeight: '500',
  },
  saperator: {
    borderWidth: 0.75,
  },
  fullWidth: {
    width: '107.5%',
    left: normalize(-12),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
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
    saperator: {
      borderColor: theme.colors.borderPrimary,
    },
  });
