import { StyleSheet, View } from 'react-native';
import normalize from '@utils/normalize/normalize';
import { MediumTextComponent } from '@components/Text/MediumText';
import { RegularTextComponent } from '@components/Text/RegularText';
import { appIcons } from '@config/icons/iconPath';
import { getFullDate } from '@utils/format/formatDate';
import { appColors } from '@config/colors/colors';
import { width } from '@config/constants/variables';
import FastImage from 'react-native-fast-image';
import { memo } from 'react';
import { TWorkshopModel } from '@models/formattedAPI/tConsultant';

type WorkshopCardProps = {
  data: TWorkshopModel;
};

export const WorkshopFlatListCard = memo(({ data }: WorkshopCardProps) => {
  return (
    <View style={StyleSheet.flatten([staticStyle.container])}>
      <MediumTextComponent
        text={data.name}
        textStyle={StyleSheet.flatten([staticStyle.title])}
      />
      <View style={staticStyle.detail}>
        <View style={staticStyle.line}>
          <FastImage
            source={appIcons.ic_calender}
            style={StyleSheet.flatten([staticStyle.icon])}
          />
          <RegularTextComponent
            text={getFullDate(data.date)}
            textStyle={StyleSheet.flatten([staticStyle.subTitle])}
          />
        </View>
        <View style={staticStyle.line}>
          <FastImage
            source={appIcons.ic_fillHistory}
            style={StyleSheet.flatten([staticStyle.icon])}
          />
          <RegularTextComponent
            text={`${data.startTime} - ${data.endTime}`}
            textStyle={StyleSheet.flatten([staticStyle.subTitle])}
          />
        </View>
      </View>
    </View>
  );
});

const staticStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: normalize(12),
    gap: normalize(16),
    alignSelf: 'center',
    padding: normalize(12),
    width: normalize(width * 0.7),
    borderColor: appColors.app_FFFFFF80,
    backgroundColor: appColors.app_202126,
  },
  title: {
    fontSize: normalize(16),
    fontWeight: '500',
    color: appColors.app_FFFFFF,
  },
  subTitle: {
    fontSize: normalize(14),
    fontWeight: '400',
    color: appColors.app_FFFFFFBF,
  },
  detail: {
    gap: normalize(12),
  },
  line: {
    gap: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: normalize(14),
    height: normalize(14),
    tintColor: appColors.app_FFFFFFBF,
  },
});
