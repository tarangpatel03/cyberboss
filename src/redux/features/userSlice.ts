import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { appImages } from '../../config/images/imagePath';
import { IExpertiesModal } from '../../models/formattedAPI/formatedModals';

export type userDetailProps = {
  id?: string;
  name?: string;
  email?: string;
  role?: 'client' | 'consultant';
  profilePicture?: number | { uri: string } | undefined;
  bio?: string | null;
  experience_year?: string | null;
  rate?: string | null;
  expertises?: IExpertiesModal[] | null;
  services?: null;
  is_verified?: boolean | null;
  login_type?: string;
  profile_setup?: boolean;
};

export interface UserState {
  token?: string;
  isFirstTime: boolean;
  showTour: boolean;
  isPro: boolean | undefined;
  userData: userDetailProps;
}

const initialState: UserState = {
  token: undefined,
  showTour: true,
  isFirstTime: true,
  isPro: false,
  userData: {},
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
    clearUser: state => {
      state.token = undefined;
      state.userData = {
        id: '',
        email: '',
        bio: null,
        rate: null,
        name: 'User',
        login_type: '',
        services: null,
        role: 'client',
        expertises: null,
        is_verified: null,
        profile_setup: false,
        experience_year: null,
        profilePicture: appImages.img_defaultProfile,
      };
    },
  },
});

export const {
  setUser,
  setIsPro,
  setIsFirstTime,
  setShowTour,
  setUserData,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;
