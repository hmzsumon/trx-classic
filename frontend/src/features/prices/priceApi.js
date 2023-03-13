import { apiSlice } from '../api/apiSlice';
import { setPrices, setCurrentPrice, setLastPrice } from './priceSlice';

export const priceApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get prices
		getPrices: builder.query({
			query: () => '/PXC-prices',
			providesTags: ['Prices'],

			async onQueryStarted({ dispatch, queryFulfilled }) {
				const result = await queryFulfilled;
				dispatch(setPrices(result.data.PXCPrices));
				dispatch(setCurrentPrice(result.data.currentPrice));
				dispatch(setLastPrice(result.data.lastPrice));
			},
		}),
	}),
});

export const { useGetPricesQuery } = priceApi;
