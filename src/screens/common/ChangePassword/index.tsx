import {useTheme} from '@shopify/restyle';
import {StyleSheet, View} from 'react-native';
import {Theme} from '@config/themes/themes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootNavigationProps} from '@models/navigationModel';
import {routeName} from '@config/constants/routes';
import {
    createStyles,
    staticStyle,
} from '@screens/common/ChangePassword/styles';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import auth from '@react-native-firebase/auth';
import {Utils} from '@utils/index';
import {Components} from '@components/index';

export const ChangePasswordScreen = ({
                                         navigation,
                                     }: RootNavigationProps<routeName.ChangePassword>) => {
    const {t} = useTranslation();
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [oldPassVisible, setOldPassVisible] = useState(false);
    const [newPassVisible, setNewPassVisible] = useState(false);
    const [confirmNewPassVisible, setConfirmNewPassVisible] = useState(false);

    const goBack = () => {
        navigation.goBack();
    };

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword) {
            Utils.showErrorToast({title: 'Please enter both old and new password'});
            return;
        } else if (newPassword !== confirmNewPassword) {
            Utils.showErrorToast({title: "Password don't match"});
        } else if (oldPassword === newPassword) {
            Utils.showErrorToast({
                title: 'New password must be different from old password',
            });
        } else {
            try {
                const user = auth().currentUser;

                if (!user || !user.email) {
                    console.log('User not authenticated');
                    return;
                }

                const credential = auth.EmailAuthProvider.credential(
                    user.email,
                    oldPassword,
                );

                await user.reauthenticateWithCredential(credential);
                await user.updatePassword(newPassword);
                console.log('Password updated successfully');
                goBack();
            } catch (error: any) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <SafeAreaView
                style={StyleSheet.flatten([staticStyle.container, styles.container])}
            >
                <Components.Headers.ScreenHeader
                    onPress={goBack}
                    headerText={t('changePassword')}
                />
                <View style={staticStyle.inputField}>
                    <Components.Inputs.CustomInput
                        isPassword={true}
                        placeholder={t('oldPassword')}
                        setValue={setOldPassword}
                        value={oldPassword}
                    />
                    <Components.Inputs.CustomInput
                        isPassword={true}
                        placeholder={t('newPassword')}
                        setValue={setNewPassword}
                        value={newPassword}
                    />
                    <Components.Inputs.CustomInput
                        isPassword={true}
                        placeholder={t('confirmNewPassword')}
                        setValue={setConfirmNewPassword}
                        value={confirmNewPassword}
                    />
                </View>
                <View style={staticStyle.buttonContainer}>
                    <Components.Buttons.PrimaryButton
                        onPress={handleChangePassword}
                        text={t('updatePassword')}
                    />
                </View>
            </SafeAreaView>
        </>
    );
};
