import { apiSlice } from '../api/apiSlice';

export const withdrawApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// create withdraw details
		createWithdrawDetails: builder.query({
			query: () => '/create/withdraw-details',
			invalidatesTags: ['Withdraw', 'Withdraws', 'MyWithdraws'],
		}),

		// create withdraw
		createWithdraw: builder.mutation({
			query: (data) => ({
				url: '/withdraw',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Withdraw', 'Withdraws', 'MyWithdraws'],
		}),

		// get my withdraws
		getMyWithdraws: builder.query({
			query: () => '/withdraws',
			providesTags: ['Withdraws', 'Withdraw', 'MyWithdraws'],
		}),

		// get all withdraws
		getAllWithdraws: builder.query({
			query: () => '/withdraws/all',
			providesTags: ['Withdraws', 'Withdraw'],
		}),

		// get single withdraw
		getSingleWithdraw: builder.query({
			query: (id) => `/withdraw/${id}`,
			providesTags: ['Withdraw'],
		}),

		// approve pending withdraw
		approveWithdraw: builder.mutation({
			query: (data) => ({
				url: '/withdraw/approve/',
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Withdraw', 'Withdraws', 'MyWithdraws'],
		}),

		// cancel pending withdraw
		cancelWithdraw: builder.mutation({
			query: (data) => ({
				url: '/withdraw/cancel/',
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Withdraw', 'Withdraws', 'MyWithdraws'],
		}),

		// get all approved withdraws
		getAllApprovedWithdraws: builder.query({
			query: () => '/withdraws/approved',
			providesTags: ['Withdraws', 'Withdraw'],
		}),
	}),
});

export const {
	useCreateWithdrawDetailsQuery,
	useCreateWithdrawMutation,
	useGetMyWithdrawsQuery,
	useGetAllWithdrawsQuery,
	useGetSingleWithdrawQuery,
	useApproveWithdrawMutation,
	useCancelWithdrawMutation,
	useGetAllApprovedWithdrawsQuery,
} = withdrawApi;
