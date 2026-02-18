import { useTheme } from '@shopify/restyle';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from '@config/themes/themes';
import { Utils } from '@utils/index';
import { Components } from '@components/index';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { TWorkshopModel } from '@models/formattedAPI/tConsultant';
import { Config } from '@config/index';

type WorkshopCardProps = {
  data: TWorkshopModel;
  cardStyle: StyleProp<ViewStyle>;
};

export const WorkshopCard = memo(({ data, cardStyle }: WorkshopCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const addEventToCalendar = async () => {
    const startISO = Utils.convertToEventDate(data.date, data.startTime);
    const endISO = Utils.convertToEventDate(data.date, data.endTime);

    await Utils.addToCalendar({
      notes: data.name,
      startDate: startISO,
      endDate: endISO,
    });

    Utils.showSuccessToast({ title: t('addedToCalendar') });
  };

  return (
    <View
      style={StyleSheet.flatten([
        staticStyle.container,
        cardStyle,
        styles.container,
      ])}
    >
      <Components.TextComponent
        family={'medium'}
        text={data.name}
        textStyle={StyleSheet.flatten([staticStyle.title, styles.title])}
      />
      <View style={staticStyle.detail}>
        <View style={staticStyle.line}>
          <FastImage
            source={Config.appIcons.ic_calender}
            tintColor={theme.colors.textSecondary}
            style={staticStyle.icon}
          />
          <Components.TextComponent
            family={'regular'}
            text={Utils.getFullDate(data.date)}
            textStyle={StyleSheet.flatten([
              staticStyle.subTitle,
              styles.subTitle,
            ])}
          />
        </View>
        <View style={staticStyle.line}>
          <FastImage
            source={Config.appIcons.ic_fillHistory}
            tintColor={theme.colors.textSecondary}
            style={staticStyle.icon}
          />
          <Components.TextComponent
            family={'regular'}
            text={`${data.startTime} - ${data.endTime}`}
            textStyle={StyleSheet.flatten([
              staticStyle.subTitle,
              styles.subTitle,
            ])}
          />
        </View>
      </View>
      <Components.Buttons.PrimaryButton
        onPress={addEventToCalendar}
        text={t('addToCalender')}
      />
    </View>
  );
});

const staticStyle = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: Utils.normalize(12),
    gap: Utils.normalize(16),
    padding: Utils.normalize(12),
    borderWidth: 1,
  },
  title: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
  },
  subTitle: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
  },
  detail: {
    gap: Utils.normalize(12),
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Utils.normalize(8),
  },
  icon: {
    width: Utils.normalize(14),
    height: Utils.normalize(14),
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
