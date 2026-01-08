import { useTheme } from '@shopify/restyle';
import { Platform, StyleProp, StyleSheet, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Components } from '@components/index';
import {Utils} from '@utils/index';
import { memo } from 'react';
import FastImage, { ImageStyle } from 'react-native-fast-image';

type ListEmptyCardProps = {
  text: string;
  tintColor?: string;
  image?: number | { uri: string } | undefined;
  style?: StyleProp<ImageStyle>;
};

export const ChatListEmptyCard = memo((props: ListEmptyCardProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View
      style={StyleSheet.flatten([
        staticStyle.container,
        Platform.OS === 'ios'
          ? staticStyle.transformIos
          : staticStyle.transformAndroid,
        styles.oneOnOneChat,
      ])}
    >
      <FastImage
        source={props.image}
        resizeMode={FastImage.resizeMode.contain}
        tintColor={props.tintColor}
        style={StyleSheet.flatten([staticStyle.image, props.style])}
      />
      <Components.TextComponent
        family={'semiBold'}
        text={props.text}
        textStyle={StyleSheet.flatten([staticStyle.text, styles.text])}
      />
    </View>
  );
});

const staticStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    gap: Utils.normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  transformIos: {
    transform: [{ rotate: '180deg' }, { rotateY: '180deg' }],
  },
  transformAndroid: {
    transform: [{ rotate: '180deg' }],
  },
  text: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
  image: {
    width: Utils.normalize(150),
    height: Utils.normalize(150),
  },
});
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    oneOnOneChat: {
      backgroundColor: theme.colors.cardBackground,
    },
    text: {
      color: theme.colors.textPrimary,
    },
    image: {
      tintColor: theme.colors.textPrimary,
    },
  });
