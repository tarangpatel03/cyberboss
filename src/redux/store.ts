import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootReducer} from '@redux/features/rootReducer';

const rootConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'theme'],
    blacklist: [],
};

const persistentReducer = persistReducer(rootConfig, rootReducer);

export const store = configureStore({
    reducer: persistentReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/REGISTER',
                ],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
