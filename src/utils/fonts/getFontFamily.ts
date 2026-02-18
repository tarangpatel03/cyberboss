import { Config } from '@config/index';

export const getFontFamily = (
  weight: 'regular' | 'medium' | 'bold' | 'light' | 'semiBold',
) => {
  const selectedFontFamily = Config.fontFamilies.INTERTIGHT;
  return selectedFontFamily[weight];
};
