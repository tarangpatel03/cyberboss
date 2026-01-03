import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { appImages } from '../../config/images/imagePath';

export type UserDetailProps = {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'consultant';
  profilePicture: number | { uri: string } | undefined;
  bio: string | null;
  experience_year: string | null;
  rate: string | null;
  firebaseUid: string;
  expertises: string[] | null;
  services: string[] | null;
  is_verified: boolean | null;
  login_type: string;
  profile_setup: boolean;
};

export type UpdateUserDetailProps = {
  id?: string;
  name?: string;
  email?: string;
  role?: 'client' | 'consultant';
  profilePicture?: number | { uri: string } | undefined;
  bio?: string | null;
  experience_year?: string | null;
  rate?: string | null;
  firebaseUid?: string;
  expertises?: string[] | null;
  services?: string[] | null;
  is_verified?: boolean | null;
  login_type?: string;
  profile_setup?: boolean;
};

export interface UserState {
  token?: string;
  isFirstTime: boolean;
  showTour: boolean;
  isPro: boolean | undefined;
  userData: UserDetailProps;
}

const initialState: UserState = {
  token: undefined,
  showTour: true,
  isFirstTime: true,
  isPro: false,
  userData: {
    id: '',
    email: '',
    bio: null,
    rate: null,
    name: 'User',
    login_type: '',
    services: null,
    role: 'client',
    firebaseUid: '',
    expertises: null,
    is_verified: null,
    profile_setup: false,
    experience_year: null,
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
    setUserData: (state, action: PayloadAction<UpdateUserDetailProps>) => {
      if (action.payload.bio !== undefined)
        state.userData.bio = action.payload.bio;
      if (action.payload.email !== undefined)
        state.userData.email = action.payload.email;
      if (action.payload.experience_year !== undefined)
        state.userData.experience_year = action.payload.experience_year;
      if (action.payload.expertises !== undefined)
        state.userData.expertises = action.payload.expertises;
      if (action.payload.id !== undefined)
        state.userData.id = action.payload.id;
      if (action.payload.firebaseUid !== undefined)
        state.userData.firebaseUid = action.payload.firebaseUid;
      if (action.payload.is_verified !== undefined)
        state.userData.is_verified = action.payload.is_verified;
      if (action.payload.login_type !== undefined)
        state.userData.login_type = action.payload.login_type;
      if (action.payload.name !== undefined)
        state.userData.name = action.payload.name;
      if (action.payload.profilePicture !== undefined)
        state.userData.profilePicture = action.payload.profilePicture;
      if (action.payload.profile_setup !== undefined)
        state.userData.profile_setup = action.payload.profile_setup;
      if (action.payload.rate !== undefined)
        state.userData.rate = action.payload.rate;
      if (action.payload.role !== undefined)
        state.userData.role = action.payload.role;
      if (action.payload.services !== undefined)
        state.userData.services = action.payload.services;
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
        firebaseUid: '',
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
