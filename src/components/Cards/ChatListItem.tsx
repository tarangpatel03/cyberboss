import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../config/themes/themes';
import { useTheme } from '@shopify/restyle';
import { MediumTextComponent } from '../Text/MediumTextComponent';
import { RegularTextComponent } from '../Text/RegularTextComponent';
import normalize from '../../utils/normalize/normalize';
import FastImage from 'react-native-fast-image';
import { memo, useEffect, useState } from 'react';
import { appImages } from '../../config/images/imagePath';
import firestore from '@react-native-firebase/firestore';
import { formatFirebaseTimestamp } from '../../utils/format/formatDate';
import { width } from '../../config/constants/variables';

type chatListItemProps = {
  data: any;
  uid: string;
  onPress: ({
    image,
    name,
    users,
  }: {
    image: number | string | { uri: string } | undefined;
    name: string;
    users: string[];
  }) => void;
};

type userDataType = {
  name: string;
  date: string;
  profile_image: string;
};

export const ChatListItem = memo((props: chatListItemProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [userData, setUserData] = useState<userDataType>({
    name: '',
    date: '',
    profile_image: '',
  });

  const getUserData = async () => {
    try {
      const userID = props.data.users.filter((x: string) => x !== props.uid)[0];
      const data = await firestore()
        .collection('users')
        .doc(userID)
        .get()
        .then(q => q.data());
      const date = formatFirebaseTimestamp(props.data.lastMessageTimestamp);
      if (data)
        setUserData({
          name: data.name,
          profile_image: data.profile_image,
          date: date,
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        props.onPress({
          image: userData.profile_image,
          name: userData.name,
          users: props.data.users,
        })
      }
      style={StyleSheet.flatten([staticStyle.container, styles.container])}
    >
      <FastImage
        source={appImages.img_defaultProfile}
        style={staticStyle.image}
      />
      <View style={staticStyle.info}>
        <View style={staticStyle.line}>
          <MediumTextComponent
            text={userData.name}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              styles.titleText,
            ])}
          />
          <MediumTextComponent
            text={`${userData.date}`}
            textStyle={StyleSheet.flatten([
              staticStyle.timeText,
              props.data.unreadCount[props.uid] > 0
                ? styles.timeUnreadText
                : styles.timeText,
            ])}
          />
        </View>
        <View style={staticStyle.line}>
          <RegularTextComponent
            text={`${
              props.data.lastMessageSender === props.uid ? 'you:' : ''
            } ${props.data.lastMessage ?? ''}`}
            noOfLines={1}
            textStyle={StyleSheet.flatten([
              staticStyle.msgText,
              styles.msgText,
            ])}
          />
          {props.data.unreadCount[props.uid] > 0 && (
            <View
              style={StyleSheet.flatten([
                staticStyle.unReadContainer,
                styles.unReadContainer,
              ])}
            >
              <RegularTextComponent
                text={`${props.data.unreadCount[props.uid]}`}
                textStyle={StyleSheet.flatten([
                  staticStyle.unReadText,
                  styles.unReadText,
                ])}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});

const staticStyle = StyleSheet.create({
  container: {
    gap: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    width: width,
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(16, 'height'),
  },
  info: {
    gap: normalize(4, 'height'),
  },
  line: {
    flexDirection: 'row',
    width: '91%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: normalize(14),
    fontWeight: '500',
  },
  msgText: {
    fontSize: normalize(14),
    maxWidth: normalize(265),
    fontWeight: '400',
  },
  timeText: {
    fontSize: normalize(12),
    fontWeight: '500',
  },
  unReadContainer: {
    width: normalize(23),
    height: normalize(17, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(18),
  },
  unReadText: {
    fontSize: normalize(12),
    fontWeight: '400',
  },
  image: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(24),
  },
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderColor: theme.colors.borderPrimary,
    },
    titleText: {
      color: theme.colors.textPrimary,
    },
    msgText: {
      color: theme.colors.textSecondary,
    },
    timeText: {
      color: theme.colors.textSecondary,
    },
    timeUnreadText: {
      color: theme.colors.primary,
    },
    unReadContainer: {
      backgroundColor: theme.colors.primary,
    },
    unReadText: {
      color: theme.colors.pureWhite,
    },
  });
