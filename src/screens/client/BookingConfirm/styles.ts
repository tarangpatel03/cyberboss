import {StyleSheet} from 'react-native';
import {Theme} from '@config/themes/themes';
import {Utils} from '@utils/index';

export const staticStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Utils.normalize(12),
    },
    button: {
        padding: Utils.normalize(12),
    },
    confirmCard: {
        gap: Utils.normalize(32),
        alignItems: 'center',
    },
    confirmIcon: {
        width: Utils.normalize(100),
        height: Utils.normalize(100),
        borderRadius: Utils.normalize(60),
    },
    confirmLine: {
        alignItems: 'center',
        gap: Utils.normalize(8),
    },
    titleText: {
        fontSize: Utils.normalize(14),
        fontWeight: '500',
    },
    subtitleText: {
        fontSize: Utils.normalize(14),
        fontWeight: '400',
    },
    confirmText: {
        fontSize: Utils.normalize(24),
        fontWeight: '600',
    },
    summaryCard: {
        borderRadius: Utils.normalize(12),
        borderWidth: 0.75,
        gap: Utils.normalize(16),
        paddingTop: Utils.normalize(16),
        paddingBottom: Utils.normalize(12),
    },
    fullLengthView: {
        flex: 1,
        gap: Utils.normalize(8),
        paddingLeft: Utils.normalize(2),
    },
    row: {
        borderBottomWidth: 0.75,
        paddingBottom: Utils.normalize(16),
        paddingHorizontal: Utils.normalize(12),
    },
    categoryIcon: {
        width: Utils.normalize(16),
        height: Utils.normalize(16),
        resizeMode: 'contain',
        marginRight: Utils.normalize(12),
    },
    profileImage: {
        width: Utils.normalize(48),
        height: Utils.normalize(48),
        borderRadius: Utils.normalize(25),
        marginRight: Utils.normalize(8),
    },
    rowLine: {
        width: '100%',
        paddingHorizontal: Utils.normalize(12),
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    separator: {
        left: Utils.normalize(-12),
        borderWidth: 0.75,
    },
    gradient: {
        borderRadius: Utils.normalize(8),
        padding: Utils.normalize(8),
        marginHorizontal: Utils.normalize(12),
    },
    text: {
        alignSelf: 'flex-end',
    },
});

export const createStyles = (theme: Theme) =>
    StyleSheet.create({
        bgPrimary: {
            backgroundColor: theme.colors.bgPrimary,
        },
        textPrimary: {
            color: theme.colors.textPrimary,
        },
        textSecondary: {
            color: theme.colors.textSecondary,
        },
        summaryCard: {
            borderColor: theme.colors.borderPrimary,
        },
        bottomBorder: {
            borderBottomColor: theme.colors.borderPrimary,
        },
    });
