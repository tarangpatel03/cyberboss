import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { Dispatch, SetStateAction } from 'react';
import { Theme } from '@config/themes/themes';
import LinearGradient from 'react-native-linear-gradient';
import { Components } from '@components/index';
import { createStyles, staticStyle } from '@screens/common/Rating/styles';
import { Utils } from '@utils/index';
import { Config } from '@config/index';

type ReviewInputProps = {
  text: string;
  loader: boolean;
  refineRating: () => void;
  end: { x: number; y: number };
  start: { x: number; y: number };
  backLineGradient: () => string[];
  frontLineGradient: () => string[];
  setText: Dispatch<SetStateAction<string>>;
};

export const ReviewInput = (props: ReviewInputProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <View style={staticStyle.review}>
      <View style={staticStyle.row}>
        <LinearGradient
          colors={props.frontLineGradient()}
          style={staticStyle.line}
          end={props.end}
          start={props.start}
        />
        <Components.Text.MediumTextComponent
          text={t('tellUsMore')}
          textStyle={StyleSheet.flatten([
            staticStyle.text,
            styles.secondaryText,
          ])}
        />
        <LinearGradient
          colors={props.backLineGradient()}
          style={staticStyle.line}
          end={props.end}
          start={props.start}
        />
      </View>
      <View
        style={StyleSheet.flatten([
          staticStyle.inputContainer,
          styles.inputContainer,
        ])}
      >
        {props.loader && (
          <View style={staticStyle.refresherContainer}>
            <ActivityIndicator
              size={'large'}
              style={StyleSheet.flatten([staticStyle.refresher])}
            />
          </View>
        )}
        {!props.loader && (
          <>
            <TextInput
              placeholder={t('shareYourThoughts')}
              multiline={true}
              style={StyleSheet.flatten([
                staticStyle.input,
                styles.primaryText,
              ])}
              autoCapitalize="none"
              value={props.text}
              onChangeText={props.setText}
              placeholderTextColor={
                Utils.isDarkMode(theme) ? Config.appColors.app_FFFFFF : Config.appColors.app_212121
              }
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={props.refineRating}
              style={staticStyle.askAi}
            >
              <FastImage
                source={Config.appImages.img_askAi}
                style={staticStyle.askAi}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};
