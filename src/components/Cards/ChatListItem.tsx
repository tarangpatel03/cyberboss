import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme } from '@config/themes/themes';
import { useTheme } from '@shopify/restyle';
import { Components } from '@components/index';
import {Utils} from '@utils/index';
import FastImage from 'react-native-fast-image';
import { memo, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { width } from '@config/constants/variables';
import { Config } from '@config/index';

type ChatListItemProps = {
  data: any;
  uid: string;
  onPress: ({
    image,
    name,
    chatId,
  }: {
    image: number | string | { uri: string } | undefined;
    name: string;
    chatId: string;
  }) => void;
};

type UserDataType = {
  name: string;
  date: string;
  profile_image: string;
};

export const ChatListItem = memo((props: ChatListItemProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [userData, setUserData] = useState<UserDataType>({
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
      const date = Utils.formatFirebaseTimestamp(props.data.lastMessageTimestamp);
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
    getUserData().then(() => console.log('Picture: ', userData.profile_image));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        props.onPress({
          image: userData.profile_image,
          name: userData.name,
          chatId: props.data.id,
        })
      }
      style={StyleSheet.flatten([staticStyle.container, styles.container])}
    >
      <View>
        <FastImage
          source={
            userData.profile_image
              ? Utils.getProfilePicture(userData.profile_image)
              : Config.appImages.img_defaultProfile
          }
          style={staticStyle.image}
        />
        {props.data?.onlineStatus?.[
          props.data.users.filter((v: string) => v !== props.uid)
        ] && <View style={staticStyle.userStatus} />}
      </View>
      <View style={staticStyle.info}>
        <View style={staticStyle.line}>
          <Components.Text.MediumTextComponent
            text={userData.name}
            textStyle={StyleSheet.flatten([
              staticStyle.titleText,
              styles.titleText,
            ])}
          />
          <Components.Text.MediumTextComponent
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
          <Components.Text.RegularTextComponent
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
              <Components.Text.RegularTextComponent
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
    gap: Utils.normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    width: width,
    paddingHorizontal: Utils.normalize(12),
    paddingVertical: Utils.normalize(16, 'height'),
  },
  info: {
    gap: Utils.normalize(4, 'height'),
  },
  line: {
    flexDirection: 'row',
    width: '91%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: Utils.normalize(14),
    fontWeight: '500',
  },
  msgText: {
    fontSize: Utils.normalize(14),
    maxWidth: Utils.normalize(265),
    fontWeight: '400',
  },
  timeText: {
    fontSize: Utils.normalize(12),
    fontWeight: '500',
  },
  unReadContainer: {
    width: Utils.normalize(23),
    height: Utils.normalize(17, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Utils.normalize(18),
  },
  unReadText: {
    fontSize: Utils.normalize(12),
    fontWeight: '400',
  },
  userStatus: {
    right: 0,
    bottom: 0,
    position: 'absolute',
    width: Utils.normalize(10),
    height: Utils.normalize(10),
    backgroundColor: 'green',
    borderRadius: Utils.normalize(8),
  },
  image: {
    width: Utils.normalize(48),
    height: Utils.normalize(48),
    borderRadius: Utils.normalize(24),
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
