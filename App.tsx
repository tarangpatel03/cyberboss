import './src/locale/i18n';
import { RootNavigation } from '@navigation/RootNavigation.tsx';
import { Provider, useSelector } from 'react-redux';
import { persistor, RootState, store } from '@redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { NavigationContainer } from '@react-navigation/native';
import { useMemo } from 'react';
import Toast from 'react-native-toast-message';
import { TourGuideProvider } from 'rn-tourguide';
import normalize from './src/utils/normalize/normalize';
import { ThemeMode } from '@redux/features/themeSlice.ts';
import { navigationRef } from '@services/axios/axiosInterceptors.ts';
import { isDarkMode } from '@utils/theme/darkMode.ts';
import { Config } from '@config/index';

function App() {
  return (
    <TourGuideProvider
      tooltipStyle={staticStyle.tour}
      androidStatusBarVisible={true}
      preventOutsideInteraction={true}
    >
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemedApp />
        </PersistGate>
      </Provider>
    </TourGuideProvider>
  );
}

const ThemedApp = () => {
  const deviceTheme = useColorScheme();
  const currentThemeMode = useSelector(
    (state: RootState) => state.theme.themeMode,
  );

  const currentTheme = useMemo(() => {
    if (currentThemeMode === ThemeMode.Device) {
      return deviceTheme === ThemeMode.Dark ? Config.DarkTheme : Config.LightTheme;
    }
    return currentThemeMode === ThemeMode.Dark ? Config.DarkTheme : Config.LightTheme;
  }, [deviceTheme, currentThemeMode]);

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar
            barStyle={
              isDarkMode(currentTheme) ? 'light-content' : 'dark-content'
            }
          />
          <RootNavigation />
        </NavigationContainer>
        <Toast />
      </ThemeProvider>
    </>
  );
};

const staticStyle = StyleSheet.create({
  tour: {
    borderRadius: normalize(16),
  },
});

export default App;
