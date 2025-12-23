import { useTheme } from '@shopify/restyle';
import { StyleProp, StyleSheet, View } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { SemiBoldTextComponent } from '../Text/SemiBoldTextComponent';
import normalize from '../../utils/normalize/normalize';
import { memo } from 'react';
import FastImage, { ImageStyle } from 'react-native-fast-image';

type listEmptyCardProps = {
  text: string;
  tintColor?: string;
  image?: number | { uri: string } | undefined;
  style?: StyleProp<ImageStyle>;
};

export const ListEmptyCard = memo(
  ({ text, image, style, tintColor }: listEmptyCardProps) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    return (
      <View
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <FastImage
          source={image}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={tintColor}
          style={StyleSheet.flatten([staticStyle.image, style])}
        />
        <SemiBoldTextComponent
          text={text}
          textStyle={StyleSheet.flatten([staticStyle.text, styles.text])}
        />
      </View>
    );
  },
);

const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    gap: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  image: {
    width: normalize(150),
    height: normalize(150),
  },
});
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    text: {
      color: theme.colors.textPrimary,
    },
    image: {
      tintColor: theme.colors.textPrimary,
    },
  });
