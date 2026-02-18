import { StyleSheet } from 'react-native';
import { Utils } from '@utils/index';
import { Theme } from '@config/themes/themes';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    padding: Utils.normalize(12),
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Utils.normalize(15, 'height'),
    paddingHorizontal: Utils.normalize(16),
  },
  expertiseContainer: {
    width: Utils.normalize(90),
    gap: Utils.normalize(8),
  },
  expertiseIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Utils.normalize(90),
    height: Utils.normalize(90),
    borderRadius: Utils.normalize(15),
    borderWidth: Utils.normalize(0.6),
  },
  expertise: {
    width: Utils.normalize(76),
    height: Utils.normalize(76),
    borderRadius: Utils.normalize(10),
  },
  backButton: {
    width: Utils.normalize(16),
    height: Utils.normalize(12, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: Utils.normalize(20),
    height: Utils.normalize(20),
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
    paddingBottom: Utils.normalize(24),
    paddingTop: Utils.normalize(16, 'height'),
    paddingHorizontal: Utils.normalize(12),
  },
  listBar: {
    flexGrow: 1,
    gap: Utils.normalize(16),
  },
  title: {
    fontSize: Utils.normalize(18),
    fontWeight: '500',
  },
  subTitle: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  expertiseText: {
    fontSize: Utils.normalize(12),
    fontWeight: '400',
  },
  serviceContainer: {
    paddingHorizontal: Utils.normalize(12),
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: Utils.normalize(10),
  },
  serviceCardContainer: {
    paddingVertical: Utils.normalize(8),
    paddingHorizontal: Utils.normalize(8),
    marginBottom: Utils.normalize(8),
    marginLeft: Utils.normalize(8),
    flexDirection: 'row',
    gap: Utils.normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: Utils.normalize(8),
  },
  serviceImage: {
    width: Utils.normalize(16),
    height: Utils.normalize(16),
  },
  editExpertiseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Utils.normalize(12),
    gap: Utils.normalize(10),
    padding: Utils.normalize(12),
  },
  editIcon: {
    width: Utils.normalize(14),
    height: Utils.normalize(14),
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
    primaryBackground: {
      backgroundColor: theme.colors.primary + '12',
    },
    secondaryBg: {
      backgroundColor: theme.colors.bgSecondary,
    },
    title: {
      color: theme.colors.textPrimary,
    },
    primaryText: {
      color: theme.colors.primary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
    borderPrimary: {
      borderColor: theme.colors.borderPrimary,
    },
    serviceContainer: {
      backgroundColor: theme.colors.bgSecondary,
      borderColor: theme.colors.primary,
    },
  });
