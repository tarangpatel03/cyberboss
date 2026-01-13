import {StyleSheet} from 'react-native';
import {Theme} from '@config/themes/themes';
import {Utils} from '@utils/index';

export const staticStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchHeader: {
        paddingTop: Utils.normalize(24),
        padding: Utils.normalize(12),
    },
    browseService: {
        width: '100%',
        alignSelf: 'center',
        height: Utils.normalize(122),
        borderWidth: Utils.normalize(1),
        borderRadius: Utils.normalize(12),
        marginBottom: Utils.normalize(12),
    },
    list: {
        flexGrow: 1,
        gap: Utils.normalize(12),
    },
});

export const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.bgPrimary,
        },
    });
