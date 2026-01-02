import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButtonComponent } from '../../../components/Buttons/PrimaryButton';
import { OnboardingList } from '../../../components/List/OnboardingList';
import { onboardingData } from './onboardingData';
import { useRef, useState } from 'react';
import { IndicationBar } from '../../../components/IndicationBar';
import { appIcons } from '../../../config/icons/iconPath';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../config/themes/themes';
import { createStyles } from './styles';
import { PrimaryButtonWithIconComponent } from '../../../components/Buttons/PrimaryButtonWithIcon';
import { routeName } from '../../../config/constants/routes';
import { rootNavigationProps } from '../../../models/navigationModel';
import { useDispatch } from 'react-redux';
import { setIsFirstTime } from '../../../redux/features/userSlice';
import { useTranslation } from 'react-i18next';

export const OnboardingScreen = ({
  navigation,
}: rootNavigationProps<routeName.Onboarding>) => {
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const navigateToLogIn = () => {
    dispatch(setIsFirstTime(false));
    navigation.replace(routeName.BottomTab);
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(
      contentOffsetX / event.nativeEvent.layoutMeasurement.width,
    );
    setCurrentIndex(index);
  };

  const handleSkip = () => {
    flatListRef.current?.scrollToIndex({
      index: 3,
      animated: true,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerView}>
          <OnboardingList
            flatListRef={flatListRef}
            handleScroll={handleScroll}
          />
          <IndicationBar currentIndex={currentIndex} />
        </View>
        {currentIndex < 3 ? (
          <View style={styles.bottomButtons}>
            <PrimaryButtonComponent
              text={t('skip')}
              buttonStyle={StyleSheet.flatten([
                styles.button,
                styles.skipButton,
              ])}
              textStyle={styles.skipText}
              onPress={handleSkip}
            />
            <PrimaryButtonComponent
              text={t('next')}
              buttonStyle={styles.button}
              textStyle={styles.nextText}
              onPress={handleNext}
            />
          </View>
        ) : (
          <View style={styles.bottomButtons}>
            <PrimaryButtonWithIconComponent
              buttonStyle={StyleSheet.flatten([
                styles.button,
                styles.nextButton,
                styles.fullLength,
              ])}
              icon={appIcons.ic_next}
              text={t('getStarted')}
              textStyle={styles.nextText}
              onPress={navigateToLogIn}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
