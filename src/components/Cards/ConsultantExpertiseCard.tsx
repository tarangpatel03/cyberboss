import {
  createStyles,
  staticStyle,
} from '@screens/client/ConsultantProfile/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Components } from '@components/index';
import { TConsultantDetailsModel } from '@models/formattedAPI/tConsultant';

type ConsultantExpertiseCardProps = {
  data: TConsultantDetailsModel;
};

export const ConsultantExpertiseCard = (
  props: ConsultantExpertiseCardProps,
) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={staticStyle.secondaryContainer}>
      <Components.TextComponent
        family={'medium'}
        text={t('expertiseAndServices')}
        textStyle={StyleSheet.flatten([
          staticStyle.semiTitleText,
          styles.primaryText,
        ])}
      />
      <View style={staticStyle.listContainer}>
        {props.data.expertises.length > 0 &&
          props.data.expertises.map(item => (
            <Components.ConsultantInfoBadge
              image={item.image}
              text={item.name}
              key={item.id}
            />
          ))}
      </View>
      <View
        style={StyleSheet.flatten([staticStyle.separator2, styles.separator])}
      />
      <View style={staticStyle.listContainer}>
        {props.data.services.length > 0 &&
          props.data.services.map(item => (
            <Components.ConsultantInfoBadge text={item.name} key={item.id} />
          ))}
      </View>
    </View>
  );
};
