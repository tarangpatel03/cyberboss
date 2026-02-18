import { StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    paddingHorizontal: Utils.normalize(16),
    paddingBottom: Utils.normalize(10, 'height'),
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Utils.normalize(15, 'height'),
    paddingHorizontal: Utils.normalize(16),
    flexDirection: 'row',
  },
  inputs: {
    width: '93%',
    gap: Utils.normalize(16, 'height'),
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
  profileImage: {
    gap: Utils.normalize(12, 'height'),
  },
  image: {
    alignSelf: 'center',
    width: Utils.normalize(100),
    height: Utils.normalize(100),
    borderRadius: Utils.normalize(50),
  },
  uploadText: {
    fontSize: Utils.normalize(14),
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
    gap: Utils.normalize(8, 'height'),
    alignItems: 'center',
  },
  contentContainer: {
    gap: Utils.normalize(32, 'height'),
    alignItems: 'center',
    paddingTop: Utils.normalize(20, 'height'),
    paddingHorizontal: Utils.normalize(12),
  },
  title: {
    alignSelf: 'center',
    fontSize: Utils.normalize(24),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: Utils.normalize(14),
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
