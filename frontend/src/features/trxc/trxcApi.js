import { apiSlice } from '../api/apiSlice';

export const trxcApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// start trxc mining
		startTrxcMining: builder.mutation({
			query: () => ({
				url: '/start-trxc/mining',
				method: 'POST',
			}),
		}),

		// get user trxc mining
		getUserTrxcMining: builder.query({
			query: () => ({
				url: '/get-user-trxc-mining',
				method: 'GET',
			}),
			providesTags: ['TrxcMining'],
		}),
	}),
});

export const { useStartTrxcMiningMutation, useGetUserTrxcMiningQuery } =
	trxcApi;
