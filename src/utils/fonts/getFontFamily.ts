import { fontFamilies } from '@config/constants/fontFamily';

export const getFontFamily = (
  weight: 'regular' | 'medium' | 'bold' | 'light' | 'semiBold',
) => {
  const selectedFontFamily = fontFamilies.INTERTIGHT;
  return selectedFontFamily[weight];
};
