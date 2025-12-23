import { StyleSheet } from 'react-native';
import normalize from '../../../utils/normalize/normalize';
import { Theme } from '../../../config/themes/themes';

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
  titletext: {
    width: normalize(100),
    height: normalize(20),
    borderRadius: normalize(4),
  },
  fullWidth: {
    width: '100%',
  },
  longrtWidth: {
    width: normalize(80),
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
    width: normalize(35),
    height: normalize(30),
    borderRadius: normalize(8),
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
    height: normalize(14),
    width: normalize(100),
    borderRadius: normalize(4),
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
  gap8: {
    gap: normalize(8),
  },
  saperator2: {
    borderWidth: 0.75,
  },
  badgeContainer: {
    height: normalize(33),
    width: normalize(87),
    borderRadius: normalize(20),
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
