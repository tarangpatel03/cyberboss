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

export const getPicture = (
  picture: number | string | { uri: string } | undefined,
) => {
  if (typeof picture === 'string') {
    return { uri: picture };
  } else {
    return picture;
  }
};
