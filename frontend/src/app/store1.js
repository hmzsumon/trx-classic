import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import usdxReducer from '../features/usdx/usdxSlice';
import miningReducer from '../features/mining/miningSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		counter: counterReducer,
		auth: authReducer,
		usdxDetails: usdxReducer,
		mining: miningReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(apiSlice.middleware);
	},
});
