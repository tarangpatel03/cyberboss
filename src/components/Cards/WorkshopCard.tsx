import { useTheme } from '@shopify/restyle';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from '../../config/themes/themes';
import normalize from '../../utils/normalize/normalize';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { PrimaryButtonComponent } from '../Buttons/PrimaryButton';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import { appIcons } from '../../config/icons/iconPath';
import { getFullDate } from '../../utils/format/formatDate';
import {
  addToCalendar,
  convertToEventDate,
} from '../../utils/calendar/addCalendarEvent';
import { showSucessToast } from '../../utils/toast/toast';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { IWorkshopModel } from '../../models/formattedAPI/tConsultant';

type workshopCardProps = {
  data: IWorkshopModel;
  cardStyle: StyleProp<ViewStyle>;
};

export const WorkshopCard = memo(({ data, cardStyle }: workshopCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const addEventToCalendar = async () => {
    const startISO = convertToEventDate(data.date, data.startTime);
    const endISO = convertToEventDate(data.date, data.endTime);

    addToCalendar({
      notes: data.name,
      startDate: startISO,
      endDate: endISO,
    });

    showSucessToast({ title: t('addedToCalendar') });
  };

  return (
    <View
      style={StyleSheet.flatten([
        staticStyle.container,
        cardStyle,
        styles.container,
      ])}
    >
      <MediumTextComponent
        text={data.name}
        textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
      />
      <View style={staticStyle.detail}>
        <View style={staticStyle.line}>
          <FastImage
            source={appIcons.ic_calender}
            tintColor={theme.colors.textSecondary}
            style={staticStyle.icon}
          />
          <RegularTextComponent
            text={getFullDate(data.date)}
            textStyle={StyleSheet.flatten([
              staticStyle.subTitle,
              styles.subTitle,
            ])}
          />
        </View>
        <View style={staticStyle.line}>
          <FastImage
            source={appIcons.ic_fillHistory}
            tintColor={theme.colors.textSecondary}
            style={staticStyle.icon}
          />
          <RegularTextComponent
            text={`${data.startTime} - ${data.endTime}`}
            textStyle={StyleSheet.flatten([
              staticStyle.subTitle,
              styles.subTitle,
            ])}
          />
        </View>
      </View>
      <PrimaryButtonComponent
        onPress={addEventToCalendar}
        text={t('addToCalander')}
      />
    </View>
  );
});

const staticStyle = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: normalize(12),
    gap: normalize(16),
    padding: normalize(12),
    borderWidth: 1,
  },
  title: {
    fontSize: normalize(16),
    fontWeight: '500',
  },
  subTitle: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
  detail: {
    gap: normalize(12),
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  icon: {
    width: normalize(14),
    height: normalize(14),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderPrimary,
    },
    title: {
      color: theme.colors.textPrimary,
    },
    subTitle: {
      color: theme.colors.textSecondary,
    },
  });
