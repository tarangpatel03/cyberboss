import { StyleSheet, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../config/themes/themes';
import { createStyles, staticStyle } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appIcons } from '../../../../config/icons/iconPath';
import { routeName } from '../../../../config/constants/routes';
import { RootNavigationProps } from '../../../../models/navigationModel';
import { SemiBoldTextComponent } from '../../../../components/Text/SemiBoldText';
import { RegularTextComponent } from '../../../../components/Text/RegularText';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { getAPIData } from '../../../../services/api/common/getCommonApi';
import { endPoints } from '../../../../config/endPoint/apiEndPoint';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../../redux/features/userSlice';
import { ApiResponse } from '../../../../models/apiModel';
import { ApiConsultantVerifed } from '../../../../models/api/consultant';

export const PendingVerificationScreen = ({
  navigation,
}: RootNavigationProps<routeName.PendingVerification>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const dispatch = useDispatch();

  const verify = async () => {
    try {
      const response = await getAPIData<ApiResponse<ApiConsultantVerifed>>(
        endPoints.consultantVerified,
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
      console.log(error);
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
                source={appIcons.ic_shield}
              />
              <View>
                <SemiBoldTextComponent
                  text={t('pendingVerification')}
                  textStyle={StyleSheet.flatten([
                    staticStyle.title,
                    styles.title,
                  ])}
                />
                <RegularTextComponent
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
