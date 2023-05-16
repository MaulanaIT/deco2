// Import Library
import storeReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
    reducer: {
        store: storeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);