import { useTheme } from '@shopify/restyle';
import { Theme } from '../../config/themes/themes';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import normalize from '../../utils/normalize/normalize';
import { memo, useState } from 'react';
import FastImage from 'react-native-fast-image';

type categoryCardProp = {
  image: number | { uri: string } | undefined;
  text: string;
  add: (text: string) => void;
  remove: (text: string) => void;
  data: string[];
};

export const CategoryCard = memo(({ obj }: { obj: categoryCardProp }) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [isSelected, setIsSelected] = useState<boolean>(
    obj.data.includes(obj.text),
  );

  const toggleSelected = () => {
    setIsSelected(prev => !prev);
    isSelected ? obj.remove(obj.text) : obj.add(obj.text);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={toggleSelected}
      style={StyleSheet.flatten([
        staticStyle.container,
        isSelected ? styles.selectedContainer : styles.container,
      ])}
    >
      <FastImage source={obj.image} style={staticStyle.image} />
      <MediumTextComponent
        text={obj.text}
        textStyle={StyleSheet.flatten([staticStyle.text, styles.text])}
      />
    </TouchableOpacity>
  );
});

const staticStyle = StyleSheet.create({
  container: {
    borderRadius: normalize(12),
    padding: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    borderWidth: 1,
  },
  image: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(8),
  },
  text: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderColor: theme.colors.borderPrimary,
    },
    selectedContainer: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.primary,
    },
    text: {
      color: theme.colors.textPrimary,
    },
  });
