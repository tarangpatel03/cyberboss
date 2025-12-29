import { ImageSourcePropType } from 'react-native';
import { appImages } from '../config/images/imagePath';

export type oneOnOneChat = {
  sender: 'send' | 'recieve';
  image?: ImageSourcePropType | undefined;
  message: string;
  time: string;
};

export const chatData: oneOnOneChat[] = [
  {
    sender: 'send',
    message: 'Hii',
    time: '15 Oct 2025 at 4:21 PM',
  },
  {
    sender: 'recieve',
    message: 'Hello, How can I help you?',
    time: '15 Oct 2025 at 4:24 PM',
  },
  {
    sender: 'send',
    message: 'I need help in this matter.',
    time: '15 Oct 2025 at 4:26 PM',
  },
  {
    sender: 'recieve',
    image: appImages.img_defaultProfile,
    message: 'For this',
    time: '15 Oct 2025 at 4:28 PM',
  },
  {
    sender: 'recieve',
    message:
      'Build is live now Build is live now Build is live now Build is live now Build is live now Build is live now Build is live now Build is live now Build is live now Build is live now Build is live now Build is live now Build is live now ',
    time: '15 Oct 2025 at 4:29 PM',
  },
  {
    sender: 'send',
    message:
      'Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes Yes ',
    time: '15 Oct 2025 at 4:30 PM',
  },
  {
    sender: 'send',
    image: appImages.img_defaultProfile,
    message: 'Like this',
    time: '15 Oct 2025 at 5:28 PM',
  },
];
