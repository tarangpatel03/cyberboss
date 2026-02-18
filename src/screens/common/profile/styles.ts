import { Platform, StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: Utils.normalize(10, 'height'),
    paddingHorizontal: Utils.normalize(12),
  },
  profileImage: {
    width: Utils.normalize(64),
    height: Utils.normalize(64),
    borderRadius: Utils.normalize(32),
  },
  userDetailCard: {
    borderWidth: 1,
    padding: Utils.normalize(10),
    gap: Utils.normalize(12),
    borderRadius: Utils.normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  consultantUserCard: {
    borderWidth: 1,
    borderBottomWidth: 0,
    gap: Utils.normalize(12),
    padding: Utils.normalize(10),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameCard: {
    width: '75%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTexts: {
    width: '65%',
    gap: Utils.normalize(8),
    paddingLeft: Platform.OS === 'ios' ? Utils.normalize(12) : 0,
  },
  utilCardContainer: {
    flexDirection: 'row',
    gap: Utils.normalize(12),
  },
  consultantUtilCardContainer: {
    flexDirection: 'row',
    top: Utils.normalize(-12),
    gap: Utils.normalize(12),
  },
  optionsIcon: {
    width: Utils.normalize(28),
    height: Utils.normalize(28),
    borderRadius: Utils.normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfile: {
    position: 'absolute',
    width: Utils.normalize(28),
    height: Utils.normalize(28),
    right: Utils.normalize(12),
    borderRadius: Utils.normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: Utils.normalize(16),
    height: Utils.normalize(16),
  },
  userName: {
    fontSize: Utils.normalize(18),
    fontWeight: '500',
  },
  userEmail: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  innerContainer: {
    gap: Utils.normalize(12),
    paddingHorizontal: Utils.normalize(12),
    paddingBottom:
      Platform.OS === 'ios' ? Utils.normalize(50) : Utils.normalize(75),
  },
  editIcon: {
    width: Utils.normalize(13),
    height: Utils.normalize(13),
  },
  infoText: {
    fontSize: Utils.normalize(16),
    fontWeight: '400',
  },
  optionTitle: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
    left: Utils.normalize(12),
  },
  utilCard: {
    width: '48%',
    borderRadius: Utils.normalize(12),
    top: Utils.normalize(-12),
    padding: Utils.normalize(12),
    gap: Utils.normalize(10),
  },
  consultantUtilCard: {
    width: '48%',
    borderRadius: Utils.normalize(12),
    top: Utils.normalize(-24),
    padding: Utils.normalize(12),
    gap: Utils.normalize(10),
  },
  profileCard: {
    borderRadius: Utils.normalize(12),
    gap: Utils.normalize(12),
    paddingVertical: Utils.normalize(12),
  },
  optionsCard: {
    borderRadius: Utils.normalize(12),
    gap: Utils.normalize(12),
    top: Utils.normalize(-12),
    paddingVertical: Utils.normalize(12),
  },
  consultantOptionsCard: {
    borderRadius: Utils.normalize(12),
    gap: Utils.normalize(12),
    top: Utils.normalize(-24),
    paddingVertical: Utils.normalize(12),
  },
  consultantCard: {
    borderWidth: 1,
    borderTopWidth: 0,
    top: Utils.normalize(-12),
    paddingBottom: Utils.normalize(12),
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  separator: {
    width: '100%',
    borderWidth: 0.5,
  },
  options: {
    gap: Utils.normalize(12),
    paddingHorizontal: Utils.normalize(12),
  },
  versionText: {
    fontSize: Utils.normalize(12),
    fontWeight: '400',
    alignSelf: 'center',
    bottom: Utils.normalize(32),
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
      backgroundColor: theme.colors.bgPrimary,
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
      backgroundColor: theme.colors.bgPrimary,
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
