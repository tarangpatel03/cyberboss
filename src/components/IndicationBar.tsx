import { StyleSheet, View } from 'react-native';
import normalize from '../utils/normalize/normalize';
import { Theme } from '../config/themes/themes';
import { useTheme } from '@shopify/restyle';

type IndicationBarProps = {
  currentIndex: number;
};

export const IndicationBar = ({ currentIndex }: IndicationBarProps) => {
  const theme = useTheme<Theme>();

  const styles = createStyles(theme);
  return (
    <View style={styles.bar}>
      <View
        style={currentIndex === 0 ? styles.focusIndex : styles.unfocusIndex}
      />
      <View
        style={currentIndex === 1 ? styles.focusIndex : styles.unfocusIndex}
      />
      <View
        style={currentIndex === 2 ? styles.focusIndex : styles.unfocusIndex}
      />
      <View
        style={currentIndex === 3 ? styles.focusIndex : styles.unfocusIndex}
      />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    bar: {
      height: normalize(6, 'height'),
      gap: normalize(8),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      alignItems: 'center',
      marginBottom: normalize(32),
      backgroundColor: theme.colors.bgPrimary,
    },
    focusIndex: {
      width: normalize(16),
      height: normalize(6, 'height'),
      borderRadius: normalize(3, 'height'),
      backgroundColor: theme.colors.primary,
    },
    unfocusIndex: {
      width: normalize(8),
      height: normalize(6, 'height'),
      borderRadius: normalize(3, 'height'),
      backgroundColor: theme.colors.unfocusIndex,
    },
  });
