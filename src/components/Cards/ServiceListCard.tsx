import { StyleSheet, TouchableOpacity } from 'react-native';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { Theme } from '../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import normalize from '../../utils/normalize/normalize';
import { appIcons } from '../../config/icons/iconPath';
import { memo } from 'react';
import FastImage from 'react-native-fast-image';

type serviceListCardProp = {
  text: string;
  onRemove: (serviceText: string) => void;
};

export const ServiceListCard = memo(
  ({ text, onRemove }: serviceListCardProp) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onRemove(text)}
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <RegularTextComponent
          text={text}
          textStyle={StyleSheet.flatten([staticStyle.text, styles.text])}
        />
        <FastImage
          source={appIcons.ic_cross}
          tintColor={theme.colors.textPrimary}
          style={staticStyle.image}
        />
      </TouchableOpacity>
    );
  },
);

const staticStyle = StyleSheet.create({
  container: {
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(8),
    marginLeft: normalize(8),
    flexDirection: 'row',
    gap: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: normalize(8),
  },
  text: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  image: {
    width: normalize(16),
    height: normalize(16),
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
