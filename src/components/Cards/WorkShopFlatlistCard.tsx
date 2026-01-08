import { StyleSheet, View } from 'react-native';
import {Utils} from '@utils/index';
import { Components } from '@components/index';
import { Config } from '@config/index';
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
      <Components.Text.MediumTextComponent
        text={data.name}
        textStyle={StyleSheet.flatten([staticStyle.title])}
      />
      <View style={staticStyle.detail}>
        <View style={staticStyle.line}>
          <FastImage
            source={Config.appIcons.ic_calender}
            style={StyleSheet.flatten([staticStyle.icon])}
          />
          <Components.Text.RegularTextComponent
            text={Utils.getFullDate(data.date)}
            textStyle={StyleSheet.flatten([staticStyle.subTitle])}
          />
        </View>
        <View style={staticStyle.line}>
          <FastImage
            source={Config.appIcons.ic_fillHistory}
            style={StyleSheet.flatten([staticStyle.icon])}
          />
          <Components.Text.RegularTextComponent
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
    borderRadius: Utils.normalize(12),
    gap: Utils.normalize(16),
    alignSelf: 'center',
    padding: Utils.normalize(12),
    width: Utils.normalize(width * 0.7),
    borderColor: Config.appColors.app_FFFFFF80,
    backgroundColor: Config.appColors.app_202126,
  },
  title: {
    fontSize: Utils.normalize(16),
    fontWeight: '500',
    color: Config.appColors.app_FFFFFF,
  },
  subTitle: {
    fontSize: Utils.normalize(14),
    fontWeight: '400',
    color: Config.appColors.app_FFFFFFBF,
  },
  detail: {
    gap: Utils.normalize(12),
  },
  line: {
    gap: Utils.normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: Utils.normalize(14),
    height: Utils.normalize(14),
    tintColor: Config.appColors.app_FFFFFFBF,
  },
});
