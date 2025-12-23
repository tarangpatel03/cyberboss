import { DarkTheme, Theme } from '../../config/themes/themes';

export const isDarkMode = (theme: Theme) => {
  return theme === DarkTheme;
};
