import { StyleSheet, TouchableOpacity } from 'react-native';
import { Components } from '@components/index';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import {Utils} from '@utils/index';
import { memo } from 'react';
import FastImage from 'react-native-fast-image';
import { Config } from '@config/index';

type ServiceListCardProp = {
  text: string;
  onRemove: (serviceText: string) => void;
};

export const ServiceListCard = memo(
  ({ text, onRemove }: ServiceListCardProp) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onRemove(text)}
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <Components.TextComponent
          family={'regular'}
          text={text}
          textStyle={StyleSheet.flatten([staticStyle.text, styles.text])}
        />
        <FastImage
          source={Config.appIcons.ic_cross}
          tintColor={theme.colors.textPrimary}
          style={staticStyle.image}
        />
      </TouchableOpacity>
    );
  },
);

const staticStyle = StyleSheet.create({
  container: {
    paddingVertical: Utils.normalize(8),
    paddingHorizontal: Utils.normalize(8),
    marginBottom: Utils.normalize(8),
    marginLeft: Utils.normalize(8),
    flexDirection: 'row',
    gap: Utils.normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: Utils.normalize(8),
  },
  text: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  image: {
    width: Utils.normalize(16),
    height: Utils.normalize(16),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgSecondary,
      borderColor: theme.colors.primary,
    },
    text: {
      color: theme.colors.textPrimary,
    },
  });
