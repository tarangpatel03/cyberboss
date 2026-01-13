import {StyleSheet} from 'react-native';
import {Theme} from '@config/themes/themes';
import {Utils} from '@utils/index';
import {width} from '@config/constants/variables';
import {Config} from '@config/index';

export const staticStyle = StyleSheet.create({
    topBar: {
        height: Utils.normalize(75, 'height'),
    },
    card: {
        width: Utils.normalize(width * 0.7),
        marginLeft: Utils.normalize(12),
    },
    background: {
        flex: 1,
    },
    tour: {
        display: 'none',
    },
    searchBarContainer: {
        width: Utils.normalize(307),
    },
    horizontalListContainer: {marginLeft: Utils.normalize(12)},
    horizontalListItem: {gap: Utils.normalize(12)},
    searchContainer: {
        width: '100%',
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        gap: Utils.normalize(12),
        borderRadius: Utils.normalize(12),
        height: Utils.normalize(40, 'height'),
        paddingHorizontal: Utils.normalize(12),
    },
    searchIcon: {
        width: Utils.normalize(24),
        height: Utils.normalize(24),
        resizeMode: 'contain',
    },
    profileInfo: {
        paddingHorizontal: Utils.normalize(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        height: Utils.normalize(70, 'height'),
    },
    profilePictureName: {
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Utils.normalize(8),
    },
    notificationDot: {
        top: 0,
        right: 0,
        zIndex: 10,
        width: Utils.normalize(8),
        height: Utils.normalize(8),
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Utils.normalize(5),
    },
    notificationDotInner: {
        width: Utils.normalize(5),
        height: Utils.normalize(5),
        borderRadius: Utils.normalize(5),
        backgroundColor: Config.appColors.app_F20000,
    },
    image: {
        width: Utils.normalize(36),
        height: Utils.normalize(36),
        borderRadius: Utils.normalize(18),
    },
    profileText: {
        fontSize: Utils.normalize(16),
        fontWeight: '600',
    },
    bellButton: {
        width: Utils.normalize(20),
        height: Utils.normalize(20),
    },
    text: {
        fontSize: Utils.normalize(14),
        fontWeight: '500',
    },
    helpButton: {
        alignItems: 'center',
        gap: Utils.normalize(6),
    },
    proUser: {
        width: Utils.normalize(68),
        height: Utils.normalize(28, 'height'),
        borderRadius: Utils.normalize(14),
        resizeMode: 'contain',
    },
    searchBar: {
        width: '100%',
        height: Utils.normalize(50, 'height'),
        flexDirection: 'row',
        paddingHorizontal: Utils.normalize(12),
        gap: Utils.normalize(12),
        paddingTop: Utils.normalize(8),
        marginBottom: Utils.normalize(12),
    },
    imageButton: {
        width: Utils.normalize(32),
        height: Utils.normalize(32),
    },
    container: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        marginBottom: Utils.normalize(24),
    },
    list: {
        flexGrow: 1,
    },
    header: {
        paddingHorizontal: Utils.normalize(16),
        marginBottom: Utils.normalize(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tinyText: {
        fontSize: Utils.normalize(12),
        fontWeight: '500',
    },
    headerText: {
        fontWeight: '500',
        fontSize: Utils.normalize(16),
    },
    listHeaderText: {
        fontWeight: '500',
        fontSize: Utils.normalize(16),
        // paddingTop: Utils.normalize(24),
    },
    viewAllText: {
        fontSize: Utils.normalize(14),
        fontWeight: '400',
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Utils.normalize(5),
    },
    viewAllIcon: {
        width: Utils.normalize(5),
        height: Utils.normalize(9),
    },
});

export const createStyles = (theme: Theme) =>
    StyleSheet.create({
        profileText: {
            color: theme.colors.textPrimary,
        },
        background: {
            backgroundColor: theme.colors.bgPrimary,
        },
        text: {
            color: theme.colors.textPrimary,
        },
        headerText: {
            color: theme.colors.textPrimary,
        },
        helpText: {
            color: theme.colors.textSecondary,
        },
        viewAllText: {
            color: theme.colors.primary,
        },
        borderPrimary: {
            borderColor: theme.colors.borderPrimary,
        },
    });
