import {useTheme} from '@shopify/restyle';
import {Rating} from 'react-native-ratings';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Theme} from '@config/themes/themes';
import {Components} from '@components/index';
import {Utils} from '@utils/index';

export const ConsultantProfileScreenShimmer = () => {
    const {t} = useTranslation();
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={staticStyle.profileContainer}>
                    <View
                        style={StyleSheet.flatten([
                            staticStyle.rowLine,
                            staticStyle.titleLine,
                        ])}
                    >
                        <Components.Skeleton.ShimmerHolder style={staticStyle.image}/>
                        <View style={staticStyle.gap8}>
                            <Components.Skeleton.ShimmerHolder style={staticStyle.titleText}/>
                            <View style={staticStyle.rowLine}>
                                <Components.Skeleton.ShimmerHolder style={staticStyle.subTitleText}/>
                            </View>
                        </View>
                    </View>
                    <View
                        style={StyleSheet.flatten([staticStyle.rowLine, staticStyle.line])}
                    >
                        <Components.Skeleton.ShimmerHolder style={staticStyle.badgeContainer}/>
                        <Components.Skeleton.ShimmerHolder style={staticStyle.badgeContainer}/>
                        <Components.Skeleton.ShimmerHolder style={staticStyle.badgeContainer}/>
                    </View>
                </View>
                <View
                    style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
                />
                <View style={staticStyle.secondaryContainer}>
                    <Components.TextComponent
                        family={'medium'}
                        text={t('about')}
                        textStyle={StyleSheet.flatten([
                            staticStyle.semiTitleText,
                            styles.primaryText,
                        ])}
                    />
                    <Components.Skeleton.ShimmerHolder
                        style={StyleSheet.flatten([
                            staticStyle.subTitleText,
                            staticStyle.fullWidth,
                        ])}
                    />
                    <Components.Skeleton.ShimmerHolder
                        style={StyleSheet.flatten([
                            staticStyle.subTitleText,
                            staticStyle.fullWidth,
                        ])}
                    />
                    <Components.Skeleton.ShimmerHolder
                        style={StyleSheet.flatten([
                            staticStyle.subTitleText,
                            staticStyle.fullWidth,
                        ])}
                    />
                </View>
                <View
                    style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
                />
                <View style={staticStyle.secondaryContainer}>
                    <Components.TextComponent
                        family={'medium'}
                        text={t('expertiseAndServices')}
                        textStyle={StyleSheet.flatten([
                            staticStyle.semiTitleText,
                            styles.primaryText,
                        ])}
                    />
                    <View style={staticStyle.listContainer}>
                        <Components.Skeleton.ShimmerHolder style={staticStyle.badgeContainer}/>
                        <Components.Skeleton.ShimmerHolder style={staticStyle.badgeContainer}/>
                        <Components.Skeleton.ShimmerHolder style={staticStyle.badgeContainer}/>
                    </View>
                    <View
                        style={StyleSheet.flatten([
                            staticStyle.separator2,
                            styles.separator,
                        ])}
                    />
                    <View style={staticStyle.listContainer}>
                        <Components.Skeleton.ShimmerHolder style={staticStyle.badgeContainer}/>
                        <Components.Skeleton.ShimmerHolder style={staticStyle.badgeContainer}/>
                        <Components.Skeleton.ShimmerHolder style={staticStyle.badgeContainer}/>
                    </View>
                </View>
                <View
                    style={StyleSheet.flatten([staticStyle.separator, styles.separator])}
                />
                <View style={staticStyle.secondaryContainer}>
                    <Components.TextComponent
                        family={'medium'}
                        text={t('ratingsAndReviews')}
                        textStyle={StyleSheet.flatten([
                            staticStyle.semiTitleText,
                            styles.primaryText,
                        ])}
                    />
                    <View style={staticStyle.line}>
                        <View
                            style={StyleSheet.flatten([
                                staticStyle.rowLine,
                                staticStyle.line,
                            ])}
                        >
                            <Components.Skeleton.ShimmerHolder style={staticStyle.ratingTextShimmer}/>
                            <Rating
                                readonly
                                imageSize={20}
                                ratingCount={5}
                                fractions={true}
                                startingValue={0}
                                tintColor={theme.colors.bgPrimary}
                            />
                        </View>
                        <Components.Skeleton.ShimmerHolder style={staticStyle.subTitleText}/>
                    </View>
                </View>
            </ScrollView>
            <View
                style={StyleSheet.flatten([staticStyle.bottomBar, styles.separator])}
            >
                <Components.Skeleton.ShimmerHolder
                    style={StyleSheet.flatten([
                        staticStyle.ratingTextShimmer,
                        staticStyle.longerWidth,
                    ])}
                />
                <Components.Buttons.PrimaryButton
                    onPress={() => {
                    }}
                    text={t('bookNow')}
                    buttonStyle={staticStyle.bookNowButton}
                />
            </View>
        </>
    );
};

export const staticStyle = StyleSheet.create({

    titleLine: {
        gap: Utils.normalize(12),
    },
    profileContainer: {
        gap: Utils.normalize(20),
        paddingHorizontal: Utils.normalize(12),
        paddingVertical: Utils.normalize(16),
    },
    secondaryContainer: {
        gap: Utils.normalize(16),
        paddingHorizontal: Utils.normalize(12),
        paddingVertical: Utils.normalize(20),
    },
    titleText: {
        width: Utils.normalize(100),
        height: Utils.normalize(20),
        borderRadius: Utils.normalize(4),
    },
    fullWidth: {
        width: '100%',
    },
    longerWidth: {
        width: Utils.normalize(80),
    },
    ratingTextShimmer: {
        width: Utils.normalize(35),
        height: Utils.normalize(30),
        borderRadius: Utils.normalize(8),
    },
    listContainer: {
        gap: Utils.normalize(8),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    semiTitleText: {
        fontSize: Utils.normalize(16),
        fontWeight: '500',
    },
    subTitleText: {
        height: Utils.normalize(14),
        width: Utils.normalize(100),
        borderRadius: Utils.normalize(4),
    },
    line: {
        gap: Utils.normalize(8),
    },
    image: {
        width: Utils.normalize(64),
        height: Utils.normalize(64),
        borderRadius: Utils.normalize(50),
    },
    rowLine: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    separator: {
        borderWidth: 1,
    },
    gap8: {
        gap: Utils.normalize(8),
    },
    separator2: {
        borderWidth: 0.75,
    },
    badgeContainer: {
        height: Utils.normalize(33),
        width: Utils.normalize(87),
        borderRadius: Utils.normalize(20),
    },
    bottomBar: {
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Utils.normalize(12),
        paddingHorizontal: Utils.normalize(16),
    },
    bookNowButton: {
        paddingHorizontal: Utils.normalize(24),
    },
});

export const createStyles = (theme: Theme) =>
    StyleSheet.create({
        primaryText: {
            color: theme.colors.textPrimary,
        },
        separator: {
            borderColor: theme.colors.borderPrimary,
        },
    });
