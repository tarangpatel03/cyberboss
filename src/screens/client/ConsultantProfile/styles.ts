import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleLine: {
    gap: Utils.normalize(12),
  },
  reviewCard: {
    gap: Utils.normalize(12),
    paddingBottom: Utils.normalize(12),
    paddingHorizontal: Utils.normalize(12),
  },
  bulletPoint: {
    width: Utils.normalize(3),
    height: Utils.normalize(3),
    borderRadius: Utils.normalize(3),
  },
  profileContainer: {
    gap: Utils.normalize(20),
    paddingHorizontal: Utils.normalize(12),
    paddingVertical: Utils.normalize(16),
  },
  secondaryContainer: {
    gap: Utils.normalize(16),
    paddingHorizontal: Utils.normalize(12),
    paddingVertical: Utils.normalize(20),
  },
  listItems: {
    gap: Utils.normalize(12),
  },
  titleText: {
    fontSize: Utils.normalize(18),
    fontWeight: '500',
  },
  reviewImage: {
    width: Utils.normalize(32),
    height: Utils.normalize(32),
    borderRadius: Utils.normalize(50),
  },
  rating: {
    alignSelf: 'flex-start',
  },
  moveLeft: {
    left: Utils.normalize(4),
  },
  ratingText: {
    fontSize: Utils.normalize(24),
    fontWeight: '600',
  },
  listContainer: {
    gap: Utils.normalize(8),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  semiTitleText: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
  subTitleText: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  tinyText: {
    fontSize: Utils.normalize(12),
    fontWeight: '400',
  },
  line: {
    gap: Utils.normalize(8),
  },
  image: {
    width: Utils.normalize(64),
    height: Utils.normalize(64),
    borderRadius: Utils.normalize(50),
  },
  leftMoveText: {
    paddingLeft: Utils.normalize(4),
  },
  rowLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    borderWidth: 1,
  },
  separator2: {
    borderWidth: 0.75,
  },
  bottomBar: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Utils.normalize(12),
    paddingHorizontal: Utils.normalize(16),
  },
  bookNowButton: {
    paddingHorizontal: Utils.normalize(24),
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
    primaryText: {
      color: theme.colors.textPrimary,
    },
    secondaryText: {
      color: theme.colors.textSecondary,
    },
    bulletPoint: {
      backgroundColor: theme.colors.textSecondary,
    },
    separator: {
      borderColor: theme.colors.borderPrimary,
    },
  });
