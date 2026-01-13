import {combineReducers} from '@reduxjs/toolkit';
import userReducer from '@redux/features/userSlice';
import themeReducer from '@redux/features/themeSlice';

export const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
});
