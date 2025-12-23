import { appImages } from '../config/images/imagePath';
import { Dispatch, SetStateAction } from 'react';

export type BookingHistoryDataProp = {
  id: string;
  status: string;
  profileImage: number | { uri: string } | undefined;
  name: string;
  time: number;
  cost: number;
  category: {
    image: number | { uri: string } | undefined;
    text: string;
  };
  rating: number;
  yourRating: string;
  gradientColors: string[];
  date: string;
  billDetails: {
    hourlyRate: number;
    hours: number;
    total: number;
    platformPercentage: number;
    platformFee: number;
    tax: number;
    grandTotal: number;
  };
};

export type ratingProps = {
  rating: number;
  yourRating: string;
  setRating: Dispatch<SetStateAction<number>>;
  setYourRating: Dispatch<SetStateAction<string>>;
};

export const bookingHistoryData: BookingHistoryDataProp[] = [
  {
    id: '#DTX8765',
    status: 'Completed',
    profileImage: appImages.img_test1,
    name: 'Daisy Bell',
    time: 12,
    cost: 720,
    category: {
      image: require('../assets/icons/ic_fullCloud.png'),
      text: 'Cloud Security',
    },
    rating: 0,
    yourRating: '',
    gradientColors: ['#2A71ED12', '#2A71ED00'],
    date: '15 Aug 2025',
    billDetails: {
      platformPercentage: 10,
      grandTotal: 884.5,
      hourlyRate: 60,
      hours: 12,
      platformFee: 144,
      tax: 20.5,
      total: 720,
    },
  },
  {
    id: '#TDX9843',
    status: 'In Progress',
    profileImage: appImages.img_test1,
    name: 'Gigi Hadid',
    time: 72,
    cost: 720,
    category: {
      image: require('../assets/icons/ic_fullCyber.png'),
      text: 'Cyber Security',
    },
    gradientColors: ['#3F51B512', '#3F51B500'],
    date: '16 Aug 2025',
    rating: 0,
    yourRating: '',
    billDetails: {
      platformPercentage: 10,
      grandTotal: 884.5,
      hourlyRate: 10,
      hours: 72,
      platformFee: 144,
      tax: 20.5,
      total: 720,
    },
  },
  {
    id: '#DCO6544',
    status: 'Completed',
    profileImage: appImages.img_test1,
    name: 'Brett Lee',
    time: 56,
    cost: 2240,
    rating: 0,
    yourRating: '',
    category: {
      image: require('../assets/icons/ic_fullForensic.png'),
      text: 'Digitl Forensics',
    },
    gradientColors: ['#6D28D912', '#6D28D900'],
    date: '17 Aug 2025',
    billDetails: {
      platformPercentage: 10,
      grandTotal: 2886.5,
      hourlyRate: 40,
      hours: 56,
      platformFee: 144,
      tax: 56.5,
      total: 2240,
    },
  },
  {
    id: '#DLA3215',
    status: 'Completed',
    profileImage: appImages.img_test1,
    name: 'ABC',
    time: 500,
    cost: 5000,
    rating: 0,
    yourRating: '',
    category: {
      image: require('../assets/icons/ic_fullNetwork.png'),
      text: 'Network Security',
    },
    date: '18 Aug 2025',
    gradientColors: ['#00968812', '#00968800'],
    billDetails: {
      platformPercentage: 10,
      grandTotal: 5274.5,
      hourlyRate: 10,
      hours: 500,
      platformFee: 144,
      tax: 120.5,
      total: 5000,
    },
  },
];
