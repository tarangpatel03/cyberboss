import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Components} from '@components/index';
import {Theme} from '@config/themes/themes';
import {useTheme} from '@shopify/restyle';
import {Utils} from '@utils/index';
import {memo} from 'react';

type RoleSelectionCardProps = {
    title: string;
    subtitle: string;
    isSelected: boolean;
    onPress: () => void;
};

export const RoleSelectionCard = memo((props: RoleSelectionCardProps) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onPress}
            style={StyleSheet.flatten([staticStyle.card, styles.card])}
        >
            <View style={staticStyle.header}>
                <Components.TextComponent
                    family={'medium'}
                    text={props.title}
                    textStyle={StyleSheet.flatten([
                        staticStyle.titleText,
                        styles.titleText,
                    ])}
                />
                <View
                    style={StyleSheet.flatten([
                        staticStyle.selector,
                        props.isSelected ? styles.selected : styles.unselected,
                    ])}
                >
                    {props.isSelected && (
                        <View
                            style={StyleSheet.flatten([
                                staticStyle.selectedInner,
                                styles.selectedInner,
                            ])}
                        />
                    )}
                </View>
            </View>
            <Components.TextComponent
                family={'regular'}
                text={props.subtitle}
                textStyle={StyleSheet.flatten([
                    staticStyle.subTitleText,
                    styles.subTitleText,
                ])}
            />
        </TouchableOpacity>
    );
});

const staticStyle = StyleSheet.create({
    card: {
        borderRadius: Utils.normalize(12),
        padding: Utils.normalize(16),
        gap: Utils.normalize(8, 'height'),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selector: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Utils.normalize(22),
        height: Utils.normalize(22),
        borderRadius: Utils.normalize(15),
        borderWidth: 2,
    },
    selectedInner: {
        width: Utils.normalize(12),
        height: Utils.normalize(12),
        borderRadius: Utils.normalize(10),
    },
    titleText: {
        fontSize: Utils.normalize(18),
        fontWeight: '500',
    },
    subTitleText: {
        fontSize: Utils.normalize(14),
        fontWeight: '400',
    },
});
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        card: {
            backgroundColor: theme.colors.cardBackground,
        },
        selected: {
            borderColor: theme.colors.primary,
        },
        selectedInner: {
            backgroundColor: theme.colors.primary,
        },
        unselected: {
            borderColor: theme.colors.borderPrimary,
        },
        titleText: {
            color: theme.colors.textPrimary,
        },
        subTitleText: {
            color: theme.colors.textSecondary,
        },
    });
