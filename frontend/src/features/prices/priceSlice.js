import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	prices: [],
	currentPrice: null,
	lastPrice: null,
};

const priceSlice = createSlice({
	name: 'prices',
	initialState,
	reducers: {
		setPrices(state, action) {
			state.prices = action.payload;
		},
		setCurrentPrice(state, action) {
			state.currentPrice = action.payload;
		},

		setLastPrice(state, action) {
			state.lastPrice = action.payload;
		},
	},
});

export const { setPrices, setCurrentPrice, setLastPrice } = priceSlice.actions;
export default priceSlice.reducer;
