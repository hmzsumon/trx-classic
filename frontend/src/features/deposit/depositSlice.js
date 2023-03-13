import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const depositSlice = createSlice({
	name: 'deposit',
	initialState,
	reducers: {
		newDeposit: (state, action) => {
			state.deposit = action.payload;
		},
	},
});

export const { newDeposit } = depositSlice.actions;
export default depositSlice.reducer;
