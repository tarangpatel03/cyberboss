import { appColors } from '../colors/colors';
import { createTheme } from '@shopify/restyle';

export const LightTheme = createTheme({
  colors: {
    primary: appColors.app_111D5F,
    secondary: appColors.app_F5F6FB,
    bgPrimary: appColors.app_FFFFFF,
    bgSecondary: appColors.app_F5F6FB,
    textPrimary: appColors.app_212121,
    textSecondary: appColors.app_8C8694,
    unfocusIndex: appColors.app_CACCD7,
    pureWhite: appColors.app_FFFFFF,
    borderPrimary: appColors.app_E8E8EA,
    whiteOverlayBorder: appColors.app_FFFFFF40,
    cardBackground: appColors.app_FFFFFF,
    pureBlack: appColors.app_18171C,
    warningBorder: appColors.app_F44336BF,
    bottomTabActiveBar: appColors.app_FFFFFF80,
    bgBookingHistory: appColors.app_111D5F12,
    backgroundTransparent: appColors.app_00000080,
    pureTransparentGreen: appColors.app_3AB4891A,
    pureTransparentOrange: appColors.app_F973151A,
    pureGreen: appColors.app_3AB489,
    pureOrange: appColors.app_F97315,
  },
  spacing: {},
});

export const DarkTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    primary: appColors.app_3554FF,
    secondary: appColors.app_202126,
    bgPrimary: appColors.app_18171C,
    bgSecondary: appColors.app_2F2F37,
    textPrimary: appColors.app_FFFFFF,
    textSecondary: appColors.app_8C8694,
    unfocusIndex: appColors.app_CACCD7,
    pureWhite: appColors.app_FFFFFF,
    borderPrimary: appColors.app_38393E,
    whiteOverlayBorder: appColors.app_FFFFFF40,
    cardBackground: appColors.app_202126,
    pureBlack: appColors.app_18171C,
    warningBorder: appColors.app_F44336BF,
    bottomTabActiveBar: appColors.app_FFFFFF80,
    bgBookingHistory: appColors.app_111D5F12,
    backgroundTransparent: appColors.app_FFFFFF0F,
    pureTransparentGreen: appColors.app_3AB4891A,
    pureTransparentOrange: appColors.app_F973151A,
    pureGreen: appColors.app_3AB489,
    pureOrange: appColors.app_F97315,
  },
  spacing: {
    ...LightTheme.spacing,
  },
};

export type Theme = typeof LightTheme;
