import { useSelector } from 'react-redux';
import { useTheme } from '@shopify/restyle';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Theme } from '../../config/themes/themes';
import normalize from '../../utils/normalize/normalize';
import { width } from '../../config/constants/variables';
import { ThemeMode } from '../../redux/features/themeSlice';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { RegularTextComponent } from '../Text/RegularText';
import { SemiBoldTextComponent } from '../Text/SemiBoldText';
import { onboardingDataProps } from '../../screens/common/Onboarding/onboardingData';

type OnboardingListProps = {
  data: onboardingDataProps;
};

export const OnboardingListComponent = ({ data }: OnboardingListProps) => {
  const { t } = useTranslation();
  const currenTheme = useSelector((state: RootState) => state.theme.themeMode);
  const theme = useTheme<Theme>();
  const deviceTheme = useColorScheme();
  const styles = createStyles(theme);
  const isDarkTheme =
    currenTheme === ThemeMode.Device
      ? deviceTheme === ThemeMode.Dark
      : currenTheme === ThemeMode.Dark;

  return (
    <View style={styles.container}>
      <FastImage
        source={isDarkTheme ? data.imagePathDark : data.imagePathLight}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <SemiBoldTextComponent text={t(data.title)} textStyle={styles.title} />
        <RegularTextComponent
          noOfLines={2}
          text={t(data.subTitle)}
          textStyle={styles.subTitle}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
      paddingTop: normalize(30),
      paddingHorizontal: 16,
      width: width,
    },
    image: {
      height: normalize(400, 'height'),
      resizeMode: 'contain',
    },
    title: {
      fontSize: normalize(24),
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
    subTitle: {
      fontSize: normalize(14),
      fontWeight: '400',
      textAlign: 'center',
      color: theme.colors.textSecondary,
    },
    textContainer: {
      alignItems: 'center',
      gap: normalize(12),
      marginBottom: normalize(32),
    },
  });
