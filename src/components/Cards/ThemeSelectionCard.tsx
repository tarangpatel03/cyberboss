import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import { Utils } from '@utils/index';
import { Components } from '@components/index';
import { memo } from 'react';

type ThemeSelectionCardProps = {
  title: string;
  isSelected: boolean;
  onPress: () => void;
};

export const ThemeSelectionCard = memo(
  ({ isSelected, onPress, title }: ThemeSelectionCardProps) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={staticStyle.card}
      >
        <View style={staticStyle.header}>
          <Components.TextComponent
            family={'regular'}
            text={title}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              styles.titleText,
            ])}
          />
          <View
            style={StyleSheet.flatten([
              staticStyle.selector,
              isSelected ? styles.selected : styles.unselected,
            ])}
          >
            {isSelected && (
              <View
                style={StyleSheet.flatten([
                  staticStyle.selectedInner,
                  styles.selectedInner,
                ])}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const staticStyle = StyleSheet.create({
  card: {
    justifyContent: 'center',
    height: Utils.normalize(36),
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selector: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Utils.normalize(22),
    height: Utils.normalize(22),
    borderRadius: Utils.normalize(15),
    borderWidth: 2,
  },
  selectedInner: {
    width: Utils.normalize(12),
    height: Utils.normalize(12),
    borderRadius: Utils.normalize(10),
  },
  titleText: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
});
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    selected: {
      borderColor: theme.colors.primary,
    },
    selectedInner: {
      backgroundColor: theme.colors.primary,
    },
    unselected: {
      borderColor: theme.colors.borderPrimary,
    },
    titleText: {
      color: theme.colors.textPrimary,
    },
  });
