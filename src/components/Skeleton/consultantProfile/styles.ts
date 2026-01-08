import { StyleSheet } from 'react-native';
import {Utils} from '@utils/index';
import { Theme } from '@config/themes/themes';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleLine: {
    gap: Utils.normalize(12),
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
  titleText: {
    width: Utils.normalize(100),
    height: Utils.normalize(20),
    borderRadius: Utils.normalize(4),
  },
  fullWidth: {
    width: '100%',
  },
  longerWidth: {
    width: Utils.normalize(80),
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
  ratingTextShimmer: {
    width: Utils.normalize(35),
    height: Utils.normalize(30),
    borderRadius: Utils.normalize(8),
  },
  ratingText: {
    fontWeight: '700',
    fontSize: Utils.normalize(16, 'height'),
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
    height: Utils.normalize(14),
    width: Utils.normalize(100),
    borderRadius: Utils.normalize(4),
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
  gap8: {
    gap: Utils.normalize(8),
  },
  separator2: {
    borderWidth: 0.75,
  },
  badgeContainer: {
    height: Utils.normalize(33),
    width: Utils.normalize(87),
    borderRadius: Utils.normalize(20),
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
    separator: {
      borderColor: theme.colors.borderPrimary,
    },
  });
