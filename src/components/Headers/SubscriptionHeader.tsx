import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { View, TouchableOpacity } from 'react-native';
import { appIcons } from '../../config/icons/iconPath';
import { MediumTextComponent } from '../Text/MediumText';
import { staticStyle } from '../../screens/client/Subscription/styles';

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
        <FastImage source={appIcons.ic_cancel} style={staticStyle.headerIcon} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={staticStyle.restoreButton}>
        <FastImage
          source={appIcons.ic_refresh}
          style={staticStyle.headerIcon}
        />
        <MediumTextComponent
          text={t('restore')}
          textStyle={staticStyle.text14500}
        />
      </TouchableOpacity>
    </View>
  );
};
