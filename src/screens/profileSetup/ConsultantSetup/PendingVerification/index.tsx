import { StyleSheet, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@config/themes/themes';
import {
  createStyles,
  staticStyle,
} from '@screens/profileSetup/ConsultantSetup/PendingVerification/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { routeName } from '@config/constants/routes';
import { RootNavigationProps } from '@models/navigationModel';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { getAPIData } from '@services/api/common/getCommonApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '@redux/features/userSlice';
import { ApiResponse } from '@models/apiModel';
import { ApiConsultantVerified } from '@models/api/consultant';
import { Config } from '@config/index';
import { Components } from '@components/index';
import { Utils } from '@utils/index';

export const PendingVerificationScreen = ({
  navigation,
}: RootNavigationProps<routeName.PendingVerification>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();

  const verify = async () => {
    try {
      const response = await getAPIData<ApiResponse<ApiConsultantVerified>>(
        Config.endPoints.consultantVerified,
      );
      if (response) {
        dispatch(
          setUserData({
            is_verified: response.payload.is_verified,
          }),
        );
        if (response.payload.is_verified) {
          navigation.replace(routeName.BottomTab);
        }
      }
    } catch (error) {
      Utils.showErrorToast({ title: error as string });
    }
  };

  useEffect(() => {
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SafeAreaView
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <View style={StyleSheet.flatten([styles.container])}>
          <View>
            <View style={staticStyle.content}>
              <FastImage
                style={staticStyle.image}
                source={Config.appIcons.ic_shield}
              />
              <View>
                <Components.TextComponent
                  family={'semiBold'}
                  text={t('pendingVerification')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.title,
                    styles.title,
                  ])}
                />
                <Components.TextComponent
                  family={'regular'}
                  noOfLines={2}
                  text={t('pendingVerificationLine')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.subTitle,
                    styles.subTitle,
                  ])}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
