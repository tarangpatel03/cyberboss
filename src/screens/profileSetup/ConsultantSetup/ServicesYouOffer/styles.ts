import { StyleSheet } from 'react-native';
import { Utils } from '@utils/index';
import { Theme } from '@config/themes/themes';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    paddingHorizontal: Utils.normalize(16),
    bottom: Utils.normalize(50, 'height'),
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
  contentSelection: {
    paddingTop: Utils.normalize(16, 'height'),
    paddingHorizontal: Utils.normalize(12),
    gap: Utils.normalize(8),
  },
  backIcon: {
    width: Utils.normalize(20),
    height: Utils.normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  line: {
    width: '70%',
    borderRadius: Utils.normalize(5),
    height: Utils.normalize(5, 'height'),
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: Utils.normalize(10),
  },
  lineDetail: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: '50%',
    height: '100%',
  },
  content: {
    alignItems: 'center',
    paddingTop: Utils.normalize(24, 'height'),
    gap: Utils.normalize(8),
  },
  title: {
    fontSize: Utils.normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    borderRadius: Utils.normalize(12),
    padding: 12,
    height: Utils.normalize(48),
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: Utils.normalize(12),
    paddingHorizontal: Utils.normalize(12),
    paddingBottom: Utils.normalize(10, 'height'),
  },
  nextText: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
  skipText: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
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
  serviceText: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  serviceImage: {
    width: Utils.normalize(16),
    height: Utils.normalize(16),
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
    backIcon: {
      tintColor: theme.colors.textPrimary,
    },
    line: {
      backgroundColor: theme.colors.cardBackground,
    },
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
    skipButton: {
      backgroundColor: theme.colors.secondary,
    },
    bottomButtons: {
      backgroundColor: theme.colors.bgPrimary,
    },
    nextText: {
      color: theme.colors.pureWhite,
    },
    skipText: {
      color: theme.colors.textSecondary,
    },
    serviceContainer: {
      backgroundColor: theme.colors.bgSecondary,
      borderColor: theme.colors.primary,
    },
    serviceText: {
      color: theme.colors.textPrimary,
    },
  });
