import { apiSlice } from '../api/apiSlice';

export const tnxApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all tnx
		getAllTnx: builder.query({
			query: () => '/my/transactions',
			providesTags: ['Tnx'],
		}),

		// transfer bonus to main balance
		transferBonus: builder.mutation({
			query: () => ({
				url: '/transfer/bonus',
				method: 'POST',
			}),
			invalidatesTags: ['Tnx', 'User'],
		}),

		// transfer trx mining profit to main balance
		transferTrxMiningProfit: builder.mutation({
			query: () => ({
				url: '/transfer/trx-mining-profit',
				method: 'POST',
			}),
			invalidatesTags: ['Tnx', 'User'],
		}),
	}),
});

export const {
	useGetAllTnxQuery,
	useTransferBonusMutation,
	useTransferTrxMiningProfitMutation,
} = tnxApi;
