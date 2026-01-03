import { StyleSheet, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import normalize from '@utils/normalize/normalize';
import { RegularTextComponent } from '@components/Text/RegularText';
import FastImage from 'react-native-fast-image';

type ConsultantInfoBadgeProps = {
  text: string;
  image?: string;
  imagePath?: number | { uri: string } | undefined;
};

export const ConsultantInfoBadge = ({
  text,
  image,
  imagePath,
}: ConsultantInfoBadgeProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={StyleSheet.flatten([staticStyle.container, styles.container])}>
      {image && (
        <FastImage source={{ uri: image }} style={staticStyle.uriImage} />
      )}
      {imagePath && <FastImage source={imagePath} style={staticStyle.image} />}
      <RegularTextComponent
        text={text}
        textStyle={StyleSheet.flatten([staticStyle.text, styles.text])}
      />
    </View>
  );
};

const staticStyle = StyleSheet.create({
  container: {
    borderRadius: normalize(20),
    gap: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(12),
  },
  text: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  image: {
    width: normalize(14),
    height: normalize(14),
  },
  uriImage: {
    width: normalize(20),
    height: normalize(20),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgSecondary,
    },
    text: {
      color: theme.colors.textSecondary,
    },
  });
