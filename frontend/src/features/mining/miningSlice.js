import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	mining: false,
};

const miningSlice = createSlice({
	name: 'mining',
	initialState,
	reducers: {
		setMining(state, action) {
			state.mining = action.payload;
		},
	},
});
export const { setMining } = miningSlice.actions;
export default miningSlice.reducer;
