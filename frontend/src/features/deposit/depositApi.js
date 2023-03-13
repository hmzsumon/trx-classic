import { apiSlice } from '../api/apiSlice';

export const depositApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// create new deposit request
		newDeposit: builder.mutation({
			query: (data) => ({
				url: '/new/deposit',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Deposit', 'User', 'Users'],
		}),
		// get all deposit requests
		getAdminDeposits: builder.query({
			query: () => '/admin/deposits',
			providesTags: ['Deposit'],
		}),

		// get a single deposit request
		getSingleDeposit: builder.query({
			query: (id) => `/deposit/${id}`,
			providesTags: ['Deposit'],
		}),

		// approve deposit request
		approveDeposit: builder.mutation({
			query: (id) => ({
				url: `/deposit/approve/${id}`,
				method: 'PUT',
			}),
			invalidatesTags: ['Deposit'],
		}),

		// cancel deposit request
		cancelDeposit: builder.mutation({
			query: (data) => ({
				url: '/deposit/cancel',
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Deposit'],
		}),
	}),
});

export const {
	useNewDepositMutation,
	useGetAdminDepositsQuery,
	useGetSingleDepositQuery,
	useApproveDepositMutation,
	useCancelDepositMutation,
} = depositApi;
