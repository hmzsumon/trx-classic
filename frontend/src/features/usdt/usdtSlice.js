import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	usdx: {},
};

export const usdtSlice = createSlice({
	name: 'usdt',
	initialState,
	reducers: {},
});

export default usdtSlice.reducer;
