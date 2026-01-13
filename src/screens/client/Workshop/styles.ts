import {StyleSheet} from 'react-native';
import {Theme} from '@config/themes/themes';
import {Utils} from '@utils/index';
import {height} from '@config/constants/variables';

export const staticStyle = StyleSheet.create({
    container: {
        flex: 1,
        height: Utils.normalize(height),
        paddingBottom: Utils.normalize(12),
    },
    cardStyle: {
        marginTop: Utils.normalize(12),
        width: '95%',
    },
    list: {
        flexGrow: 1,
        gap: Utils.normalize(12),
    },
    shimmerContainer: {
        width: '100%',
        height: Utils.normalize(157),
        marginTop: Utils.normalize(12),
        borderRadius: Utils.normalize(12),
    },
});

export const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.bgPrimary,
        },
        image: {
            tintColor: theme.colors.textPrimary,
        },
    });
