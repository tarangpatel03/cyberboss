import { Dispatch, SetStateAction } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Components } from '@components/index';
import { Theme } from '@config/themes/themes';
import {Utils} from '@utils/index';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { Config } from '@config/index';

type LogOutModalProps = {
  isModal: boolean;
  message: string;
  title: string;
  option: string;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
};

export const LogOutModal = (props: LogOutModalProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const onLogOutPress = () => {
    props.setIsModal(false);
    props.onConfirm();
  };

  return (
    <Modal
      visible={props.isModal}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={StyleSheet.flatten([staticStyle.main, styles.main])}>
        <TouchableWithoutFeedback onPress={() => props.setIsModal(false)}>
          <View
            style={StyleSheet.flatten([
              staticStyle.container,
              styles.container,
            ])}
          >
            <Components.TextComponent
              family={'medium'}
              textStyle={StyleSheet.flatten([staticStyle.head, styles.head])}
              text={props.title}
            />
            <Components.TextComponent
              family={'regular'}
              noOfLines={2}
              textStyle={StyleSheet.flatten([
                staticStyle.normalText,
                styles.normalText,
              ])}
              text={props.message}
            />
            <View style={staticStyle.buttonContainer}>
              <TouchableOpacity
                style={StyleSheet.flatten([
                  staticStyle.logoutButton,
                  styles.cancelButton,
                ])}
                onPress={() => props.setIsModal(false)}
              >
                <Components.TextComponent
                  family={'medium'}
                  textStyle={StyleSheet.flatten([
                    styles.cancelText,
                    styles.normalText,
                  ])}
                  text={t('cancel')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={StyleSheet.flatten([
                  staticStyle.logoutButton,
                  props.title === t('askLogout')
                    ? styles.logoutButton
                    : styles.deleteButton,
                ])}
                onPress={onLogOutPress}
              >
                <Components.TextComponent
                  family={'medium'}
                  textStyle={StyleSheet.flatten([
                    staticStyle.deleteText,
                    styles.deleteText,
                  ])}
                  text={props.option}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const staticStyle = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Utils.normalize(12),
  },
  container: {
    width: '100%',
    alignItems: 'center',
    padding: Utils.normalize(12),
    borderRadius: Utils.normalize(12),
    gap: Utils.normalize(20),
  },
  head: {
    fontSize: Utils.normalize(22),
  },
  normalText: {
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 10,
    width: '100%',
    flexDirection: 'row',
  },
  logoutButton: {
    flex: 1,
    padding: 7,
    alignItems: 'center',
    borderRadius: Utils.normalize(5),
  },
  deleteText: {
    fontSize: 19,
  },
  cancelText: {
    fontSize: 19,
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modal: {
      backgroundColor: theme.colors.backgroundTransparent,
    },
    main: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Utils.normalize(12),
      backgroundColor: theme.colors.backgroundTransparent,
    },
    container: {
      backgroundColor: theme.colors.bgPrimary,
    },
    head: {
      color: theme.colors.primary,
    },
    logoutButton: {
      backgroundColor: theme.colors.primary,
    },
    deleteButton: {
      backgroundColor: Config.appColors.app_F20000,
    },
    normalText: {
      color: theme.colors.textPrimary,
    },
    cancelButton: {
      backgroundColor: theme.colors.bgSecondary,
    },
    deleteText: {
      color: theme.colors.pureWhite,
    },
    cancelText: {
      fontSize: 19,
    },
  });
