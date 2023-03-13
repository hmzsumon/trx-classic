import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	usdx: {},
};

export const usdxSlice = createSlice({
	name: 'usdx',
	initialState,
	reducers: {
		setUsdx: (state, action) => {
			state.usdx = action.payload;
		},
	},
});

export const { setUsdx } = usdxSlice.actions;

export default usdxSlice.reducer;
