import { Config } from '@config/index';

export const getGradientColor = (type: string | undefined) => {
  switch (type) {
    case 'Cloud Security':
      return [Config.appColors.app_2A71ED12, Config.appColors.app_2A71ED00];
    case 'Network Security':
      return [Config.appColors.app_00968812, Config.appColors.app_00968800];
    case 'Digital Forensics':
      return [Config.appColors.app_6D28D912, Config.appColors.app_6D28D900];
    case 'Threat Detection':
      return [Config.appColors.app_F4433612, Config.appColors.app_F4433600];
    case 'Compliance':
      return [Config.appColors.app_4CAF5012, Config.appColors.app_4CAF5000];
    case 'Cybersecurity Program Development':
      return [Config.appColors.app_79554812, Config.appColors.app_79554800];
    case 'Product Security':
      return [Config.appColors.app_607D8B12, Config.appColors.app_607D8B00];
    case 'Growth':
      return [Config.appColors.app_00BCD412, Config.appColors.app_00BCD400];
    default:
      return [Config.appColors.app_FFFFFF, Config.appColors.app_FFFFFF];
  }
};
export const getServiceImage = (type: string | undefined) => {
  switch (type) {
    case 'Cloud Security':
      return Config.appIcons.ic_cloudSecurity;
    case 'Growth':
      return Config.appIcons.ic_cloudMigration;
    case 'Product Security':
      return Config.appIcons.ic_privilegeAccessMgmt;
    case 'Digital Forensics':
      return Config.appIcons.ic_digitalForensix;
    case 'Compliance':
      return Config.appIcons.ic_compliance;
    case 'Network Security':
      return Config.appIcons.ic_networkSecurity;
    case 'Cybersecurity Program Development':
      return Config.appIcons.ic_cybersecurityProgramDevelopment;
    case 'Threat Detection':
      return Config.appIcons.ic_threatProtection;
    default:
      break;
  }
};
