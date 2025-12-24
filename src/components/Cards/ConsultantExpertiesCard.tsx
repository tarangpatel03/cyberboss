import {
  createStyles,
  staticStyle,
} from '../../screens/client/ConsultantProfile/styles';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { ConsultantInfoBadge } from '../ConsultantInfoBadge';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { IConsultantDetailsModel } from '../../models/formattedAPI/tConsultant';

type consultantExpertiesCardProps = {
  data: IConsultantDetailsModel;
};

export const ConsultantExpertiesCard = (
  props: consultantExpertiesCardProps,
) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return (
    <View style={staticStyle.secondaryContainer}>
      <MediumTextComponent
        text={t('expertiseAndServices')}
        textStyle={StyleSheet.flatten([
          staticStyle.semititletext,
          styles.primaryText,
        ])}
      />
      <View style={staticStyle.listContainer}>
        {props.data.expertises.length > 0 &&
          props.data.expertises.map(item => (
            <ConsultantInfoBadge
              image={item.image}
              text={item.name}
              key={item.id}
            />
          ))}
      </View>
      <View
        style={StyleSheet.flatten([staticStyle.saperator2, styles.saperator])}
      />
      <View style={staticStyle.listContainer}>
        {props.data.services.length > 0 &&
          props.data.services.map(item => (
            <ConsultantInfoBadge text={item.name} key={item.id} />
          ))}
      </View>
    </View>
  );
};
