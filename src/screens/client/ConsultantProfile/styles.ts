import { StyleSheet } from 'react-native';
import { Theme } from '../../../config/themes/themes';
import normalize from '../../../utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleLine: {
    gap: normalize(12),
  },
  profileContainer: {
    gap: normalize(20),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(16),
  },
  secondaryContainer: {
    gap: normalize(16),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(20),
  },
  listItems: {
    gap: normalize(12),
  },
  titletext: {
    fontSize: normalize(18),
    fontWeight: '500',
  },
  reviewImage: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(50),
  },
  rating: {
    alignSelf: 'flex-start',
  },
  moveLeft: {
    left: normalize(4),
  },
  ratingtext: {
    fontSize: normalize(24),
    fontWeight: '600',
  },
  listContainer: {
    gap: normalize(8),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  semititletext: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  subtitletext: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  tinytext: {
    fontSize: normalize(12),
    fontWeight: '400',
  },
  line: {
    gap: normalize(8),
  },
  image: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(50),
  },
  leftMoveText: {
    paddingLeft: normalize(4),
  },
  rowLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saperator: {
    borderWidth: 1,
  },
  saperator2: {
    borderWidth: 0.75,
  },
  bottomBar: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
  },
  booknowButton: {
    paddingHorizontal: normalize(24),
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
    saperator: {
      borderColor: theme.colors.borderPrimary,
    },
  });
