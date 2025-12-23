import {
  ImageSourcePropType,
  ImageResolvedAssetSource,
  Image,
} from 'react-native';

export const extractImageUri = (
  source: ImageSourcePropType | undefined,
): string | null => {
  if (!source) return null;

  if (typeof source === 'object' && 'uri' in source) {
    return source.uri ?? null;
  }

  const asset: ImageResolvedAssetSource | null =
    Image.resolveAssetSource(source);
  return asset?.uri || null;
};
