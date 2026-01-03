import { useTheme } from '@shopify/restyle';
import { StyleSheet, View } from 'react-native';
import { CircularIconButtonComponent } from '../Buttons/CircularIconButton';
import { appIcons } from '../../config/icons/iconPath';
import { MediumTextComponent } from '../Text/MediumText';
import normalize from '../../utils/normalize/normalize';
import { Theme } from '../../config/themes/themes';

type ScreenHeaderComponentProps = {
  iconPath?: number | { uri: string } | undefined;
  onPress: () => void;
  headerText?: string;
};

export const ScreenHeaderComponent = ({
  headerText,
  onPress,
  iconPath,
}: ScreenHeaderComponentProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <>
      <View style={staticStyles.container}>
        <CircularIconButtonComponent
          iconPath={appIcons.ic_backIcon}
          iconStyle={staticStyles.backIcon}
          tintColor={theme.colors.textPrimary}
          buttonStyle={staticStyles.backButton}
          onPress={onPress}
        />
        {headerText && (
          <MediumTextComponent
            text={headerText}
            textStyle={StyleSheet.flatten([staticStyles.title, styles.title])}
          />
        )}
        {iconPath ? (
          <CircularIconButtonComponent
            buttonStyle={staticStyles.backButton}
            iconPath={iconPath}
            tintColor={theme.colors.textPrimary}
            iconStyle={staticStyles.backIcon}
            onPress={() => {}}
          />
        ) : (
          <View style={staticStyles.backButton} />
        )}
      </View>
    </>
  );
};

const staticStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: normalize(12),
    paddingHorizontal: normalize(20),
    height: normalize(32, 'height'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    width: '70%',
    textAlign: 'center',
    fontSize: normalize(18),
    fontWeight: '500',
  },
  backIcon: {
    width: normalize(20),
    height: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  backButton: {
    width: normalize(16),
    height: normalize(12, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    width: normalize(16),
    height: normalize(12, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    title: {
      color: theme.colors.textPrimary,
    },
  });
