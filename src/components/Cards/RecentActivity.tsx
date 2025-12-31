import { StyleSheet, View } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import normalize from '../../utils/normalize/normalize';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import FastImage from 'react-native-fast-image';
import { memo } from 'react';
import { tConsultantHomeNotificationModel } from '../../models/formattedAPI/tHome';
import { appImages } from '../../config/images/imagePath';

export const RecentActivity = memo(
  (props: tConsultantHomeNotificationModel) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    return (
      <View
        style={StyleSheet.flatten([staticStyle.container, styles.container])}
      >
        <FastImage
          source={appImages.img_defaultProfile}
          style={staticStyle.image}
        />
        <View style={staticStyle.row}>
          <RegularTextComponent
            text={props.title}
            noOfLines={2}
            textStyle={StyleSheet.flatten([
              staticStyle.title,
              styles.primaryText,
            ])}
          />
          <RegularTextComponent
            text={props.createdAt}
            textStyle={StyleSheet.flatten([
              staticStyle.subtitle,
              styles.secondaryText,
            ])}
          />
        </View>
      </View>
    );
  },
);

const staticStyle = StyleSheet.create({
  container: {
    borderRadius: normalize(12),
    borderWidth: 0.5,
    gap: normalize(12),
    flexDirection: 'row',
    padding: normalize(12),
    marginHorizontal: normalize(12),
  },
  row: {
    width: '80%',
    gap: normalize(4),
  },
  image: {
    borderRadius: normalize(30),
    width: normalize(48),
    height: normalize(48),
  },
  title: {
    fontSize: normalize(16),
    fontWeight: '600',
  },
  subtitle: {
    fontSize: normalize(14),
    fontWeight: '400',
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgPrimary,
      borderColor: theme.colors.borderPrimary,
    },
    primaryText: {
      color: theme.colors.textPrimary,
    },
    secondaryText: {
      color: theme.colors.textSecondary,
    },
  });
