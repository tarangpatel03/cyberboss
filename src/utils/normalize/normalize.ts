import { Dimensions, Platform, PixelRatio } from 'react-native';

export var { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

const wScale: number = SCREEN_WIDTH / 375;
const hScale: number = SCREEN_HEIGHT / 632;

export default function normalize(
  size: number,
  based: 'width' | 'height' = 'width',
) {
  const newSize = based === 'height' ? size * hScale : size * wScale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
}
