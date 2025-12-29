import './src/locale/i18n';
import { RootNavigation } from './src/navigation/RootNavigation';
import { Provider, useSelector } from 'react-redux';
import { persistor, RootState, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { DarkTheme, LightTheme } from './src/config/themes/themes';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { NavigationContainer } from '@react-navigation/native';
import { useMemo } from 'react';
import Toast from 'react-native-toast-message';
import { TourGuideProvider } from 'rn-tourguide';
import normalize from './src/utils/normalize/normalize';
import { ThemeMode } from './src/redux/features/themeSlice';
import { navigationRef } from './src/services/axios/axiosInterceptors';
import { isDarkMode } from './src/utils/theme/darkMode';

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
      return deviceTheme === ThemeMode.Dark ? DarkTheme : LightTheme;
    }
    return currentThemeMode === ThemeMode.Dark ? DarkTheme : LightTheme;
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
