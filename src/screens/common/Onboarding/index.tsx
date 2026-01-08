import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onboardingData } from '@screens/common/Onboarding/onboardingData';
import { useRef, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import { createStyles } from '@screens/common/Onboarding/styles';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import { useDispatch } from 'react-redux';
import { setIsFirstTime } from '@redux/features/userSlice';
import { useTranslation } from 'react-i18next';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const OnboardingScreen = ({
  navigation,
}: RootNavigationProps<routeName.Onboarding>) => {
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
          <Components.List.OnboardingList
            flatListRef={flatListRef}
            handleScroll={handleScroll}
          />
          <Components.IndicationBar currentIndex={currentIndex} />
        </View>
        {currentIndex < 3 ? (
          <View style={styles.bottomButtons}>
            <Components.Buttons.PrimaryButton
              text={t('skip')}
              buttonStyle={StyleSheet.flatten([
                styles.button,
                styles.skipButton,
              ])}
              textStyle={styles.skipText}
              onPress={handleSkip}
            />
            <Components.Buttons.PrimaryButton
              text={t('next')}
              buttonStyle={styles.button}
              textStyle={styles.nextText}
              onPress={handleNext}
            />
          </View>
        ) : (
          <View style={styles.bottomButtons}>
            <Components.Buttons.PrimaryButtonWithIcon
              buttonStyle={StyleSheet.flatten([
                styles.button,
                styles.nextButton,
                styles.fullLength,
              ])}
              icon={Config.appIcons.ic_next}
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
