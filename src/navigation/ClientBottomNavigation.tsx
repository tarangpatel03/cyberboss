import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { routeName } from '../config/constants/routes';
import { appIcons } from '../config/icons/iconPath';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/themes/themes';
import { StyleSheet } from 'react-native';
import { HistoryScreen } from '../screens/common/History';
import { ProfileScreen } from '../screens/common/profile';
import { ClientHomeScreen } from '../screens/client/Home';
import { ChatScreen } from '../screens/common/Chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from '../utils/normalize/normalize';
import { clientBottomNavigationParams } from '../models/navigationModal';
import { BarTabIconComponent } from '../components/BottomTabIcon/BarTabIcon';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { navigationRef } from '../services/axios/axiosInterceptors';
import { EventArg } from '@react-navigation/native';
import { ConsultantHomeScreen } from '../screens/consultant/home';

const Tab = createBottomTabNavigator<clientBottomNavigationParams>();
type SetBarIconType = {
  focused: boolean;
  icon: number | { uri: string } | undefined;
  fillIcon: number | { uri: string } | undefined;
  zone: number;
  title: string;
};

export const BottomNavigation = () => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { bottom } = useSafeAreaInsets();
  const token = useSelector((state: RootState) => state.user.token);
  const role = useSelector((state: RootState) => state.user.userData.role);

  const checkAuth = (e: EventArg<'tabPress', true, undefined>) => {
    if (!token) {
      e.preventDefault();
      navigationRef.navigate(routeName.LogIn);
    }
  };

  const setBarIcon = ({
    focused,
    fillIcon,
    icon,
    title,
    zone,
  }: SetBarIconType) => {
    return (
      <BarTabIconComponent
        icon={focused ? fillIcon : icon}
        isFocus={focused}
        title={title}
        zone={zone}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        animation: 'none',
        tabBarStyle: StyleSheet.flatten([
          {
            paddingBottom: bottom + normalize(10, 'height'),
            height: bottom + normalize(45, 'height'),
          },
          styles.bar,
        ]),
      }}
    >
      <Tab.Screen
        name={routeName.Home}
        component={role === 'client' ? ClientHomeScreen : ConsultantHomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            setBarIcon({
              focused: focused,
              fillIcon: appIcons.ic_fillHome,
              icon: appIcons.ic_borderHome,
              title: t('home'),
              zone: 5,
            }),
        }}
      />
      <Tab.Screen
        name={routeName.Chat}
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            setBarIcon({
              focused: focused,
              fillIcon: appIcons.ic_fillChat,
              icon: appIcons.ic_borderChat,
              title: t('chat'),
              zone: 6,
            }),
        }}
        listeners={{ tabPress: e => checkAuth(e) }}
      />
      <Tab.Screen
        name={routeName.History}
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            setBarIcon({
              focused: focused,
              fillIcon: appIcons.ic_fillHistory,
              icon: appIcons.ic_borderHistory,
              title: t('history'),
              zone: 7,
            }),
        }}
        listeners={{ tabPress: e => checkAuth(e) }}
      />
      <Tab.Screen
        name={routeName.Profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            setBarIcon({
              focused: focused,
              fillIcon: appIcons.ic_fillProfile,
              icon: appIcons.ic_borderProfile,
              title: t('profile'),
              zone: 8,
            }),
        }}
        listeners={{ tabPress: e => checkAuth(e) }}
      />
    </Tab.Navigator>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    bar: {
      backgroundColor: theme.colors.primary,
    },
  });
