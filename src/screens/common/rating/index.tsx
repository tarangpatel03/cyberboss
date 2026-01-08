import { StyleSheet, View } from 'react-native';
import { RootNavigationProps } from '@models/navigationModel';
import { routeName } from '@config/constants/routes';
import { useTheme } from '@shopify/restyle';
import { createStyles, staticStyle } from '@screens/common/Rating/styles';
import { Theme } from '@config/themes/themes';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from '@utils/normalize/normalize';
import { useTranslation } from 'react-i18next';
import { refineFeedBack } from '@services/api/feedback/refineFeedBack';
import { Utils } from '@utils/index';
import { Config } from '@config/index';
import { Components } from '@components/index';

export const YourRatingScreen = ({
  navigation,
  route,
}: RootNavigationProps<routeName.YourRating>) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { rating, setRating, setYourRating, yourRating } = route.params;
  const [text, setText] = useState<string>(yourRating);
  const [starRating, setStarRating] = useState<number>(rating);
  const isButtonDisabled = text.length === 0;
  const { bottom } = useSafeAreaInsets();
  const end = { x: 0, y: 0.5 };
  const start = { x: 1, y: 0.5 };
  const [loader, setLoader] = useState(false);

  const refineRating = async () => {
    try {
      setLoader(true);
      const res = await refineFeedBack(text);
      setText(res);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const backLineGradient = () => {
    if (Utils.isDarkMode(theme)) {
      return [Config.appColors.app_3554FF26, Config.appColors.app_3554FF00];
    } else {
      return [Config.appColors.app_E8E8EA00, Config.appColors.app_E8E8EA];
    }
  };

  const frontLineGradient = () => {
    if (Utils.isDarkMode(theme)) {
      return [Config.appColors.app_3554FF26, Config.appColors.app_3554FF00];
    } else {
      return [Config.appColors.app_E8E8EA, Config.appColors.app_E8E8EA00];
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const showStar = (val: number) => {
    if (starRating >= val) {
      return Config.appIcons.ic_ratingStarFill;
    } else {
      return Config.appIcons.ic_ratingStar;
    }
  };

  const onSubmit = () => {
    setRating(starRating);
    setYourRating(text);
    goBack();
  };

  return (
    <>
      <View style={StyleSheet.flatten([staticStyle.header, styles.primaryBg])}>
        <Components.Headers.ScreenHeader
          onPress={goBack}
          headerText={t('shareYourExperience')}
        />
      </View>
      <View
        style={StyleSheet.flatten([staticStyle.container, styles.secondaryBg])}
      >
        <View style={StyleSheet.flatten([staticStyle.card, styles.primaryBg])}>
          <Components.Cards.StarReviewCard showStar={showStar} setStarRating={setStarRating} />
          <Components.Inputs.ReviewInput
            text={text}
            setText={setText}
            end={end}
            start={start}
            loader={loader}
            refineRating={refineRating}
            backLineGradient={backLineGradient}
            frontLineGradient={frontLineGradient}
          />
        </View>
      </View>
      <View
        style={StyleSheet.flatten([
          staticStyle.button,
          { paddingBottom: normalize(bottom + 12) },
          styles.primaryBg,
        ])}
      >
        <Components.Buttons.PrimaryButton
          onPress={onSubmit}
          isButtonActive={isButtonDisabled}
          text={t('submit')}
          buttonStyle={isButtonDisabled ? styles.secondaryBg : undefined}
          textStyle={isButtonDisabled ? styles.secondaryText : undefined}
        />
      </View>
    </>
  );
};
