import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { appImages } from '../../config/images/imagePath';

export type userDetailProps = {
  name: string;
  email: string;
  role: 'client' | 'consultant';
  profilePicture: number | { uri: string } | undefined;
};

export interface UserState {
  token?: string;
  isFirstTime: boolean;
  showTour: boolean;
  tourCompleted: boolean;
  isPro: boolean | undefined;
  userData: userDetailProps;
}

const initialState: UserState = {
  token: undefined,
  showTour: true,
  isFirstTime: true,
  tourCompleted: false,
  isPro: false,
  userData: {
    email: '',
    name: 'User',
    role: 'client',
    profilePicture: appImages.img_defaultProfile,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setIsFirstTime: (state, action: PayloadAction<boolean>) => {
      state.isFirstTime = action.payload;
    },
    setIsPro: (state, action: PayloadAction<boolean | undefined>) => {
      state.isPro = action.payload;
    },
    setShowTour: (state, action: PayloadAction<boolean>) => {
      state.showTour = action.payload;
    },
    setUserData: (state, action: PayloadAction<userDetailProps>) => {
      state.userData = action.payload;
    },
    setTourCompleted: state => {
      state.tourCompleted = true;
      state.showTour = false;
    },
  },
});

export const {
  setUser,
  setIsPro,
  setIsFirstTime,
  setShowTour,
  setUserData,
  setTourCompleted,
} = userSlice.actions;
export default userSlice.reducer;
