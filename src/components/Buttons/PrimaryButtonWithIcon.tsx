import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Components } from '@components/index';
import {Utils} from '@utils/index';
import { Config } from '@config/index';
import FastImage from 'react-native-fast-image';

type PrimaryButtonWithIconComponentProps = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  buttonStyle: StyleProp<ViewStyle>;
  icon?: number | { uri: string } | undefined;
  onPress: () => void;
};

export const PrimaryButtonWithIcon = (
  props: PrimaryButtonWithIconComponentProps,
) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={props.buttonStyle}
      onPress={props.onPress}
    >
      <Components.TextComponent 
        family={'medium'} 
        text={props.text} 
        textStyle={props.textStyle} 
      />
      <FastImage source={props.icon} style={styles.iconStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: Utils.normalize(16),
    height: Utils.normalize(16),
    position: 'absolute',
    right: Utils.normalize(16),
    tintColor: Config.appColors.app_FFFFFF,
  },
});
