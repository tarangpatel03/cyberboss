import {
    ActivityIndicator,
    ImageSourcePropType,
    StyleSheet,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View
} from 'react-native';
import {RootNavigationProps} from '@models/navigationModel';
import {routeName} from '@config/constants/routes';
import {useTheme} from '@shopify/restyle';
import {createStyles, staticStyle} from '@screens/common/Rating/styles';
import {Theme} from '@config/themes/themes';
import {Dispatch, SetStateAction, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import normalize from '@utils/normalize/normalize';
import {useTranslation} from 'react-i18next';
import {refineFeedBack} from '@services/api/feedback/refineFeedBack';
import {Utils} from '@utils/index';
import {Config} from '@config/index';
import {Components} from '@components/index';
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";

export const YourRatingScreen = ({
                                     navigation,
                                     route,
                                 }: RootNavigationProps<routeName.YourRating>) => {
    const {t} = useTranslation();
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const {rating, setRating, setYourRating, yourRating} = route.params;
    const [text, setText] = useState<string>(yourRating);
    const [starRating, setStarRating] = useState<number>(rating);
    const isButtonDisabled = text.length === 0;
    const {bottom} = useSafeAreaInsets();
    const end = {x: 0, y: 0.5};
    const start = {x: 1, y: 0.5};
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
                    <View style={staticStyle.ratingLine}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setStarRating(2)}
                            style={staticStyle.ratingContainer}
                        >
                            <FastImage source={showStar(2)} style={staticStyle.star}/>
                            <Components.TextComponent
                                family={'regular'}
                                text={t('bad')}
                                textStyle={StyleSheet.flatten([
                                    staticStyle.tinyText,
                                    styles.secondaryText,
                                ])}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setStarRating(3)}
                            style={staticStyle.ratingContainer}
                        >
                            <FastImage source={showStar(3)} style={staticStyle.star}/>
                            <Components.TextComponent
                                family={'regular'}
                                text={t('okay')}
                                textStyle={StyleSheet.flatten([
                                    staticStyle.tinyText,
                                    styles.secondaryText,
                                ])}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setStarRating(4)}
                            style={staticStyle.ratingContainer}
                        >
                            <FastImage source={showStar(4)} style={staticStyle.star}/>
                            <Components.TextComponent
                                family={'regular'}
                                text={t('good')}
                                textStyle={StyleSheet.flatten([
                                    staticStyle.tinyText,
                                    styles.secondaryText,
                                ])}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setStarRating(5)}
                            style={staticStyle.ratingContainer}
                        >
                            <FastImage source={showStar(5)} style={staticStyle.star}/>
                            <Components.TextComponent
                                family={'regular'}
                                text={t('excellent')}
                                textStyle={StyleSheet.flatten([
                                    staticStyle.tinyText,
                                    styles.secondaryText,
                                ])}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={staticStyle.review}>
                        <View style={staticStyle.row}>
                            <LinearGradient
                                colors={frontLineGradient()}
                                style={staticStyle.line}
                                end={end}
                                start={start}
                            />
                            <Components.TextComponent
                                family={'medium'}
                                text={t('tellUsMore')}
                                textStyle={StyleSheet.flatten([
                                    staticStyle.text,
                                    styles.secondaryText,
                                ])}
                            />
                            <LinearGradient
                                colors={backLineGradient()}
                                style={staticStyle.line}
                                end={end}
                                start={start}
                            />
                        </View>
                        <View
                            style={StyleSheet.flatten([
                                staticStyle.inputContainer,
                                styles.inputContainer,
                            ])}
                        >
                            {loader && (
                                <View style={staticStyle.refresherContainer}>
                                    <ActivityIndicator
                                        size={'large'}
                                        style={StyleSheet.flatten([staticStyle.refresher])}
                                    />
                                </View>
                            )}
                            {!loader && (
                                <>
                                    <TextInput
                                        placeholder={t('shareYourThoughts')}
                                        multiline={true}
                                        style={StyleSheet.flatten([
                                            staticStyle.input,
                                            styles.primaryText,
                                        ])}
                                        autoCapitalize="none"
                                        value={text}
                                        onChangeText={setText}
                                        placeholderTextColor={
                                            Utils.isDarkMode(theme) ? Config.appColors.app_FFFFFF : Config.appColors.app_212121
                                        }
                                    />
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={refineRating}
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
                    {/*<Components.Inputs.ReviewInput*/}
                    {/*    text={text}*/}
                    {/*    setText={setText}*/}
                    {/*    end={end}*/}
                    {/*    start={start}*/}
                    {/*    loader={loader}*/}
                    {/*    refineRating={refineRating}*/}
                    {/*    backLineGradient={backLineGradient}*/}
                    {/*    frontLineGradient={frontLineGradient}*/}
                    {/*/>*/}
                </View>
            </View>
            <View
                style={StyleSheet.flatten([
                    staticStyle.button,
                    {paddingBottom: normalize(bottom + 12)},
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
