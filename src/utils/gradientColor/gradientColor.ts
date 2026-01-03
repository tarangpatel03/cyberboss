import { appColors } from '@config/colors/colors';
import { appIcons } from '@config/icons/iconPath';

export const getGradientColor = (type: string | undefined) => {
  switch (type) {
    case 'Cloud Security':
      return [appColors.app_2A71ED12, appColors.app_2A71ED00];
    case 'Network Security':
      return [appColors.app_00968812, appColors.app_00968800];
    case 'Digital Forensics':
      return [appColors.app_6D28D912, appColors.app_6D28D900];
    case 'Threat Detection':
      return [appColors.app_F4433612, appColors.app_F4433600];
    case 'Compliance':
      return [appColors.app_4CAF5012, appColors.app_4CAF5000];
    case 'Cybersecurity Program Development':
      return [appColors.app_79554812, appColors.app_79554800];
    case 'Product Security':
      return [appColors.app_607D8B12, appColors.app_607D8B00];
    case 'Growth':
      return [appColors.app_00BCD412, appColors.app_00BCD400];
    default:
      return [appColors.app_FFFFFF, appColors.app_FFFFFF];
  }
};
export const getServiceImage = (type: string | undefined) => {
  switch (type) {
    case 'Cloud Security':
      return appIcons.ic_cloudSecurity;
    case 'Growth':
      return appIcons.ic_cloudMigration;
    case 'Product Security':
      return appIcons.ic_privilegeAccessMgmt;
    case 'Digital Forensics':
      return appIcons.ic_digitalForensix;
    case 'Compliance':
      return appIcons.ic_compliance;
    case 'Network Security':
      return appIcons.ic_networkSecurity;
    case 'Cybersecurity Program Development':
      return appIcons.ic_cybersecurityProgramDevelopment;
    case 'Threat Detection':
      return appIcons.ic_threatProtection;
    default:
      break;
  }
};
