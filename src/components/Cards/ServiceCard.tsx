import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Theme} from '@config/themes/themes';
import {useTheme} from '@shopify/restyle';
import {Utils} from '@utils/index';
import {Components} from '@components/index';
import FastImage from 'react-native-fast-image';
import {memo, useState} from 'react';
import {TExpertiseModel} from '@models/formattedAPI/tConsultant';
import {Config} from '@config/index';

type ServiceCardProps = {
    data: TExpertiseModel;
    onPress: (id: string, name: string) => void;
};

export const ServiceCard = memo(({data, onPress}: ServiceCardProps) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const [imageError, setImageError] = useState<boolean>(false);

    return (
        <TouchableOpacity
            onPress={() => onPress(data.id, data.name)}
            activeOpacity={0.7}
            style={StyleSheet.flatten([staticStyle.container, styles.container])}
        >
            <View style={staticStyle.heading}>
                <FastImage
                    source={
                        imageError ? Config.appIcons.ic_noImage : Utils.getProfilePicture(data.image)
                    }
                    onError={() => setImageError(true)}
                    resizeMode={FastImage.resizeMode.contain}
                    tintColor={imageError ? theme.colors.textPrimary : ''}
                    style={staticStyle.image}
                />
                <Components.TextComponent
                    family={'medium'}
                    text={data.name}
                    textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
                />
            </View>
            <View style={staticStyle.details}>
                <View style={staticStyle.heading}>
                    <FastImage source={Config.appIcons.ic_cash} style={staticStyle.icon}/>
                    <Components.TextComponent
                        family={'regular'}
                        text={`$${Number(data.rate)}/hr`}
                        textStyle={StyleSheet.flatten([
                            staticStyle.subTitle,
                            styles.subTitle,
                        ])}
                    />
                </View>
                {data.bookingCount !== 0 && (
                    <View style={staticStyle.heading}>
                        <FastImage source={Config.appIcons.ic_check} style={staticStyle.icon}/>
                        <Components.TextComponent
                            family={'regular'}
                            text={Utils.formatBooking(data.bookingCount ?? 0)}
                            textStyle={StyleSheet.flatten([
                                staticStyle.subTitle,
                                styles.subTitle,
                            ])}
                        />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
});

const staticStyle = StyleSheet.create({
    container: {
        gap: Utils.normalize(16, 'height'),
        width: '93%',
        alignSelf: 'center',
        borderRadius: Utils.normalize(12),
        padding: Utils.normalize(12),
        borderWidth: 1,
        marginBottom: Utils.normalize(12),
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Utils.normalize(8),
    },
    title: {
        fontSize: Utils.normalize(16),
        fontWeight: '500',
    },
    subTitle: {
        fontSize: Utils.normalize(14),
        fontWeight: '400',
    },
    details: {
        gap: Utils.normalize(12),
    },
    image: {
        width: Utils.normalize(36),
        height: Utils.normalize(36),
        borderRadius: Utils.normalize(8),
    },
    icon: {
        width: Utils.normalize(14),
        height: Utils.normalize(14),
    },
});

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.cardBackground,
            borderColor: theme.colors.borderPrimary,
        },
        title: {
            color: theme.colors.textPrimary,
        },
        subTitle: {
            color: theme.colors.textSecondary,
        },
    });
