import {StyleSheet, View} from 'react-native';
import {Theme} from '@config/themes/themes';
import {useTheme} from '@shopify/restyle';
import {Utils} from '@utils/index';
import FastImage from 'react-native-fast-image';
import {Components} from '@components/index';

type ConsultantInfoBadgeProps = {
    text: string;
    image?: string;
    imagePath?: number | { uri: string } | undefined;
};

export const ConsultantInfoBadge = ({
                                        text,
                                        image,
                                        imagePath,
                                    }: ConsultantInfoBadgeProps) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    return (
        <View style={StyleSheet.flatten([staticStyle.container, styles.container])}>
            {image && (
                <FastImage source={{uri: image}} style={staticStyle.uriImage}/>
            )}
            {imagePath && <FastImage source={imagePath} style={staticStyle.image}/>}
            <Components.TextComponent
                family={'regular'}
                text={text}
                textStyle={StyleSheet.flatten([staticStyle.text, styles.text])}
            />
        </View>
    );
};

const staticStyle = StyleSheet.create({
    container: {
        borderRadius: Utils.normalize(20),
        gap: Utils.normalize(8),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Utils.normalize(8),
        paddingHorizontal: Utils.normalize(12),
    },
    text: {
        fontSize: Utils.normalize(14),
        fontWeight: '400',
    },
    image: {
        width: Utils.normalize(14),
        height: Utils.normalize(14),
    },
    uriImage: {
        width: Utils.normalize(20),
        height: Utils.normalize(20),
    },
});

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.bgSecondary,
        },
        text: {
            color: theme.colors.textSecondary,
        },
    });
