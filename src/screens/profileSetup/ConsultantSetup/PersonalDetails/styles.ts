import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import normalize from '@utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(10, 'height'),
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: normalize(15, 'height'),
    paddingHorizontal: normalize(16),
    flexDirection: 'row',
  },
  inputs: {
    width: '93%',
    gap: normalize(16, 'height'),
  },
  backButton: {
    position: 'absolute',
    left: normalize(16),
    top: normalize(12, 'height'),
    width: normalize(16),
    height: normalize(12, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: normalize(20),
    height: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  line: {
    width: '70%',
    borderRadius: normalize(5),
    height: normalize(5, 'height'),
  },
  profileImage: {
    gap: normalize(12, 'height'),
  },
  image: {
    alignSelf: 'center',
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
  },
  uploadText: {
    fontSize: normalize(14),
    fontWeight: '500',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  fillLineDetail: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: '75%',
    height: '100%',
  },
  lineDetail: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: '25%',
    height: '100%',
  },
  titleView: {
    gap: normalize(8, 'height'),
    alignItems: 'center',
  },
  contentContainer: {
    gap: normalize(32, 'height'),
    alignItems: 'center',
    paddingTop: normalize(20, 'height'),
    paddingHorizontal: normalize(12),
  },
  title: {
    alignSelf: 'center',
    fontSize: normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: normalize(14),
    fontWeight: '400',
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
    uploadText: {
      color: theme.colors.primary,
    },
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
  });
