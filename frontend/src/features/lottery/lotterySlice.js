import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	lotteries: [],
	lottery: {},
};

const lotterySlice = createSlice({
	name: 'lottery',
	initialState,
	reducers: {
		setLotteries: (state, action) => {
			state.lotteries = action.payload;
		},
	},
});

export const { setLotteries } = lotterySlice.actions;
export default lotterySlice.reducer;
