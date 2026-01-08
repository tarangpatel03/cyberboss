import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { View, TouchableOpacity } from 'react-native';
import { Components } from '@components/index';
import { staticStyle } from '@screens/client/Subscription/styles';
import { Config } from '@config/index';

type SubscriptionHeaderProps = {
  goBack: () => void;
};

export const SubscriptionHeader = (props: SubscriptionHeaderProps) => {
  const { t } = useTranslation();
  return (
    <View style={staticStyle.header}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={props.goBack}
        style={staticStyle.cancelButton}
      >
        <FastImage source={Config.appIcons.ic_cancel} style={staticStyle.headerIcon} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={staticStyle.restoreButton}>
        <FastImage
          source={Config.appIcons.ic_refresh}
          style={staticStyle.headerIcon}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Components.TextComponent
          family={'medium'}
          text={t('restore')}
          textStyle={staticStyle.text14500}
        />
      </TouchableOpacity>
    </View>
  );
};
