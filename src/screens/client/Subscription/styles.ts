import { StyleSheet } from 'react-native';
import { appColors } from '../../../config/colors/colors';
import normalize from '../../../utils/normalize/normalize';

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(12),
    backgroundColor: appColors.app_18171C,
  },
  headerIcon: {
    width: normalize(14),
    height: normalize(14),
    resizeMode: 'contain',
  },
  cancelButton: {
    alignItems: 'center',
    width: normalize(32),
    height: normalize(32),
    justifyContent: 'center',
  },
  listItems: {
    flexGrow: 1,
    gap: normalize(12),
  },
  trustedUserContainer: {
    gap: normalize(20),
  },
  benefits: {
    gap: normalize(15),
  },
  bottomLine: {
    borderWidth: 1,
    borderRadius: normalize(12),
    alignItems: 'center',
    flexDirection: 'row',
    padding: normalize(12),
    justifyContent: 'space-between',
    borderColor: appColors.app_FFFFFF40,
    backgroundColor: appColors.app_202126,
  },
  monthlyContainer: {
    borderRadius: normalize(30),
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    backgroundColor: appColors.app_2F2F37,
  },
  bottomButton: {
    gap: normalize(16),
    bottom: normalize(0),
    paddingVertical: normalize(12),
  },
  benefitLine: {
    gap: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastLine: {
    gap: normalize(12),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    borderRadius: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(12),
    backgroundColor: appColors.app_3554FF,
  },
  separator: {
    height: normalize(1),
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator2: {
    height: normalize(2),
    backgroundColor: appColors.app_26252A,
  },
  features: {
    borderRadius: normalize(10),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(12),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: normalize(16),
    paddingBottom: normalize(12),
    justifyContent: 'space-between',
  },
  energyIcon: {
    width: normalize(16),
    height: normalize(16),
    resizeMode: 'contain',
  },
  restoreButton: {
    borderWidth: 1,
    borderRadius: normalize(8),
    gap: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(8),
    justifyContent: 'center',
    borderColor: appColors.app_38393E,
    backgroundColor: appColors.app_202126,
  },
  mainContainer: {
    flex: 1,
    paddingTop: normalize(12),
  },
  mainContainer2: {
    gap: normalize(32),
    paddingBottom: normalize(20),
  },
  featuresIcon: {
    width: normalize(20),
    height: normalize(20),
    resizeMode: 'contain',
  },
  proContainer: {
    borderRadius: normalize(5),
    gap: normalize(10),
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(8),
  },
  horizontal8: {
    gap: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontal12: {
    gap: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontal6: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text14500: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: appColors.app_FFFFFF,
  },
  text16400: {
    fontSize: normalize(16),
    fontWeight: '400',
    color: appColors.app_FFFFFF,
  },
  text16500: {
    fontSize: normalize(16),
    fontWeight: '500',
    color: appColors.app_FFFFFF,
  },
  latterSpace: {
    letterSpacing: 4,
  },
  text14400: {
    fontSize: normalize(14),
    fontWeight: '400',
    color: appColors.app_FFFFFF,
  },
  text14600: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: appColors.app_18171C,
  },
  text24500: {
    fontSize: normalize(24),
    fontWeight: '500',
    color: appColors.app_FFFFFF,
  },
  text20500: {
    fontSize: normalize(24),
    fontWeight: '500',
    color: appColors.app_FFFFFF,
  },
  text12500: {
    fontSize: normalize(12),
    fontWeight: '500',
    color: appColors.app_FFFFFF,
  },
  benefitImageContainer: {
    borderRadius: normalize(7),
    alignItems: 'center',
    width: normalize(28),
    height: normalize(28),
    justifyContent: 'center',
  },
  trustedUserImage: {
    borderWidth: 1,
    borderRadius: normalize(20),
    width: normalize(28),
    height: normalize(28),
    borderColor: appColors.app_211A3B,
  },
  trustedUserImage2: {
    left: normalize(-7),
  },
  trustedUserImage3: {
    left: normalize(-14),
  },
  trustedUserImage4: {
    left: normalize(-21),
  },
  trustedUserImage5: {
    left: normalize(-28),
  },
  benefitContainer: {
    borderWidth: 0.5,
    borderRadius: normalize(12),
    gap: normalize(20),
    padding: normalize(12),
    paddingTop: normalize(20),
    borderColor: appColors.app_FFD84D,
  },
});
