import { apiSlice } from '../api/apiSlice';

export const pxcApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// send pxc
		sendPxc: builder.mutation({
			query: (data) => ({
				url: '/send/pxc',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Pxc', 'User', 'Users'],
		}),

		// buy pxc
		buyPxc: builder.mutation({
			query: (data) => ({
				url: '/deposit',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Pxc'],
		}),

		// get deposits
		getDeposits: builder.query({
			query: () => '/deposits/me',
			providesTags: ['Pxc', 'User', 'Users', 'Deposit'],
		}),

		// buy pxc
		buyTrxcWithUsdt: builder.mutation({
			query: (data) => ({
				url: '/buy-trxc',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Pxc'],
		}),

		// sell pxc
		sellPxc: builder.mutation({
			query: (data) => ({
				url: '/sellPxc',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Pxc'],
		}),
	}),
});

export const {
	useSendPxcMutation,
	useBuyPxcMutation,
	useGetDepositsQuery,
	useBuyTrxcWithUsdtMutation,
	useSellPxcMutation,
} = pxcApi;
