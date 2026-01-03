import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { appColors } from '@config/colors/colors';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import { isDarkMode } from '@utils/theme/darkMode';
import { memo } from 'react';

export const ShimmerHolder = memo(
  ({ style }: { style: StyleProp<ViewStyle> }) => {
    const darkColors = [
      appColors.app_353535,
      appColors.app_5B5B5B,
      appColors.app_353535,
    ];
    const lightColors = [
      appColors.app_EBEBEB,
      appColors.app_C5C5C5,
      appColors.app_EBEBEB,
    ];
    const theme = useTheme<Theme>();
    const setColor = () => {
      if (isDarkMode(theme)) {
        return darkColors;
      } else {
        return lightColors;
      }
    };

    return (
      <ShimmerPlaceHolder
        width={400}
        style={style}
        LinearGradient={LinearGradient}
        shimmerColors={setColor()}
      />
    );
  },
);
