import { StyleSheet } from 'react-native';
import { Utils } from '@utils/index';
import { Config } from '@config/index';
import {appColors} from "@config/colors/colors.ts";

export const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Utils.normalize(12),
    backgroundColor: Config.appColors.app_18171C,
  },
  headerIcon: {
    width: Utils.normalize(14),
    height: Utils.normalize(14),
    resizeMode: 'contain',
  },
  cancelButton: {
    alignItems: 'center',
    width: Utils.normalize(32),
    height: Utils.normalize(32),
    justifyContent: 'center',
  },
  listItems: {
    flexGrow: 1,
    gap: Utils.normalize(12),
  },
  trustedUserContainer: {
    gap: Utils.normalize(20),
  },
  benefits: {
    gap: Utils.normalize(15),
  },
  bottomLine: {
    borderWidth: 1,
    borderRadius: Utils.normalize(12),
    alignItems: 'center',
    flexDirection: 'row',
    padding: Utils.normalize(12),
    justifyContent: 'space-between',
    borderColor: Config.appColors.app_FFFFFF40,
    backgroundColor: Config.appColors.app_202126,
  },
  monthlyContainer: {
    borderRadius: Utils.normalize(30),
    paddingVertical: Utils.normalize(6),
    paddingHorizontal: Utils.normalize(12),
    backgroundColor: Config.appColors.app_2F2F37,
  },
  bottomButton: {
    gap: Utils.normalize(16),
    bottom: Utils.normalize(0),
    paddingVertical: Utils.normalize(12),
  },
  benefitLine: {
    gap: Utils.normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastLine: {
    gap: Utils.normalize(12),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    borderRadius: Utils.normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Utils.normalize(12),
    backgroundColor: Config.appColors.app_3554FF,
  },
  separator: {
    height: Utils.normalize(1),
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalUsers: {
    width: '31%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator2: {
    height: Utils.normalize(2),
    backgroundColor: Config.appColors.app_26252A,
  },
  features: {
    gap: Utils.normalize(8),
    flexDirection: 'row',
    borderRadius: Utils.normalize(10),
    paddingVertical: Utils.normalize(10),
    paddingHorizontal: Utils.normalize(12),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Utils.normalize(16),
    paddingBottom: Utils.normalize(12),
    justifyContent: 'space-between',
  },
  energyIcon: {
    width: Utils.normalize(16),
    height: Utils.normalize(16),
    resizeMode: 'contain',
  },
  restoreButton: {
    borderWidth: 1,
    borderRadius: Utils.normalize(8),
    gap: Utils.normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    padding: Utils.normalize(8),
    justifyContent: 'center',
    borderColor: Config.appColors.app_38393E,
    backgroundColor: Config.appColors.app_202126,
  },
  mainContainer: {
    flex: 1,
    paddingTop: Utils.normalize(12),
  },
  mainContainer2: {
    gap: Utils.normalize(32),
    paddingBottom: Utils.normalize(20),
  },
  featuresIcon: {
    width: Utils.normalize(20),
    height: Utils.normalize(20),
    resizeMode: 'contain',
  },
  proContainer: {
    borderRadius: Utils.normalize(5),
    gap: Utils.normalize(10),
    paddingVertical: Utils.normalize(2),
    paddingHorizontal: Utils.normalize(8),
  },
  horizontal8: {
    gap: Utils.normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontal12: {
    gap: Utils.normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontal6: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text14500: {
    fontSize: Utils.normalize(14),
    fontWeight: '500',
    color: Config.appColors.app_FFFFFF,
  },
  text16400: {
    fontSize: Utils.normalize(16),
    fontWeight: '400',
    color: Config.appColors.app_FFFFFF,
  },
  proText: {
    color: Config.appColors.app_18171C,
  },
  text16500: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
    color: Config.appColors.app_FFFFFF,
  },
  text16500Secondary: {
    fontWeight: '500',
    alignSelf: 'flex-end',
    color: Config.appColors.app_8C8694,
    fontSize: Utils.normalize(16),
    paddingBottom: Utils.normalize(3),
  },
  latterSpace: {
    letterSpacing: 4,
  },
  text14400: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
    color: Config.appColors.app_FFFFFF,
  },
  text14600: {
    fontSize: Utils.normalize(14),
    fontWeight: '600',
    color: Config.appColors.app_18171C,
  },
  text24500: {
    fontSize: Utils.normalize(24),
    fontWeight: '500',
    color: Config.appColors.app_FFFFFF,
  },
  text20500: {
    fontSize: Utils.normalize(24),
    fontWeight: '500',
    color: Config.appColors.app_FFFFFF,
  },
  text12500: {
    fontSize: Utils.normalize(12),
    fontWeight: '500',
    color: Config.appColors.app_FFFFFF,
  },
  benefitImageContainer: {
    borderRadius: Utils.normalize(7),
    alignItems: 'center',
    width: Utils.normalize(28),
    height: Utils.normalize(28),
    justifyContent: 'center',
  },
  trustedUserImage: {
    borderWidth: 1,
    borderRadius: Utils.normalize(20),
    width: Utils.normalize(28),
    height: Utils.normalize(28),
    backgroundColor: 'red',
    borderColor: Config.appColors.app_211A3B,
  },
  trustedUserImage2: {
    backgroundColor: 'blue',
    left: Utils.normalize(-7),
  },
  trustedUserImage3: {
    backgroundColor: 'orange',
    left: Utils.normalize(-14),
  },
  trustedUserImage4: {
    backgroundColor: 'purple',
    left: Utils.normalize(-21),
  },
  trustedUserImage5: {
    backgroundColor: 'pink',
    left: Utils.normalize(-28),
  },
  benefitContainer: {
    borderWidth: 0.5,
    borderRadius: Utils.normalize(12),
    gap: Utils.normalize(20),
    padding: Utils.normalize(12),
    paddingTop: Utils.normalize(20),
    borderColor: Config.appColors.app_FFD84D,
  },
  dot: {
    width: Utils.normalize(3),
    height: Utils.normalize(3),
    borderRadius: Utils.normalize(5),
    backgroundColor: Config.appColors.app_FFFFFF,
  },
});
