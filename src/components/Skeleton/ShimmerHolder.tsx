import {StyleProp, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {Theme} from '@config/themes/themes';
import {useTheme} from '@shopify/restyle';
import {Utils} from '@utils/index';
import {memo} from 'react';
import {Config} from '@config/index';

export const ShimmerHolder = memo(
    ({style}: { style: StyleProp<ViewStyle> }) => {
        const darkColors = [
            Config.appColors.app_353535,
            Config.appColors.app_5B5B5B,
            Config.appColors.app_353535,
        ];
        const lightColors = [
            Config.appColors.app_EBEBEB,
            Config.appColors.app_C5C5C5,
            Config.appColors.app_EBEBEB,
        ];
        const theme = useTheme<Theme>();
        const setColor = () => {
            if (Utils.isDarkMode(theme)) {
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
