import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const verifySlice = createSlice({
	name: 'verify',
	initialState,
	reducers: {
		newVerify: (state, action) => {
			state.newVerify = action.payload;
		},
	},
});

export const { newVerify } = verifySlice.actions;
export default verifySlice.reducer;
