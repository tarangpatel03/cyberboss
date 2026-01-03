import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import normalize from '@utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: normalize(10, 'height'),
    paddingHorizontal: normalize(12),
  },
  profileImage: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(32),
  },
  userDetailCard: {
    borderWidth: 1,
    padding: normalize(10),
    gap: normalize(12),
    borderRadius: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  consultantUserCard: {
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: normalize(10),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameCard: {
    width: '75%',
    paddingLeft: normalize(8),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  utilCardContainer: {
    flexDirection: 'row',
    gap: normalize(12),
  },
  consultantUtilCardContainer: {
    flexDirection: 'row',
    top: normalize(-12),
    gap: normalize(12),
  },
  editProfile: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: normalize(16),
    height: normalize(16),
  },
  userName: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  userEmail: {
    fontSize: normalize(12),
    fontWeight: '400',
  },
  innerContainer: {
    gap: normalize(12),
    paddingHorizontal: normalize(12),
    flex: 1,
  },
  editIcon: {
    width: normalize(13),
    height: normalize(13),
  },
  infoText: {
    fontSize: normalize(16),
    fontWeight: '400',
  },
  optionTitle: {
    fontSize: normalize(16),
    fontWeight: '500',
    left: normalize(12),
  },
  utilCard: {
    width: '48%',
    borderRadius: normalize(12),
    top: normalize(-12),
    padding: normalize(12),
    gap: normalize(10),
  },
  consultantUtilCard: {
    width: '48%',
    borderRadius: normalize(12),
    top: normalize(-24),
    padding: normalize(12),
    gap: normalize(10),
  },
  profileCard: {
    borderRadius: normalize(12),
    gap: normalize(12),
    paddingVertical: normalize(12),
  },
  optionsCard: {
    borderRadius: normalize(12),
    gap: normalize(12),
    top: normalize(-12),
    paddingVertical: normalize(12),
  },
  consultantOptionsCard: {
    borderRadius: normalize(12),
    gap: normalize(12),
    top: normalize(-24),
    paddingVertical: normalize(12),
  },
  consultantCard: {
    borderWidth: 1,
    borderTopWidth: 0,
    top: normalize(-12),
    paddingBottom: normalize(12),
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  separator: {
    width: '100%',
    borderWidth: 0.5,
  },
  options: {
    gap: normalize(12),
    paddingHorizontal: normalize(12),
  },
  versionText: {
    fontSize: normalize(12),
    fontWeight: '400',
    alignSelf: 'center',
    top: normalize(-24),
    paddingVertical: normalize(14),
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    editProfile: {
      backgroundColor: theme.colors.primary,
    },
    userDetailCard: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderPrimary,
    },
    userName: {
      color: theme.colors.textPrimary,
    },
    userEmail: {
      color: theme.colors.textSecondary,
    },
    innerContainer: {
      backgroundColor: theme.colors.bgSecondary,
    },
    utilCard: {
      backgroundColor: theme.colors.cardBackground,
    },
    iconContainer: {
      backgroundColor: theme.colors.borderPrimary,
    },
    separator: {
      borderColor: theme.colors.borderPrimary,
    },
    versionText: {
      color: theme.colors.textSecondary,
    },
  });
