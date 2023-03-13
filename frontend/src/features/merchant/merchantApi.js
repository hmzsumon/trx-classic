import { apiSlice } from '../api/apiSlice';

export const merchantApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// create a new merchant request
		createMerchant: builder.mutation({
			query: (data) => ({
				url: '/new-merchant',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Merchant', 'User', 'Users'],
		}),

		// get all merchants
		getMerchants: builder.query({
			query: (data) => ({
				url: '/all-merchants',
				method: 'GET',
				body: data,
			}),
			providesTags: ['Merchant', 'User', 'Users'],
		}),

		// get a single merchant
		getMerchant: builder.query({
			query: (id) => `/merchant/${id}`,
			providesTags: ['Merchant'],
		}),

		// approved merchant
		approveMerchant: builder.mutation({
			query: (id) => ({
				url: `/approve-merchant/${id}`,
				method: 'PUT',
			}),
			invalidatesTags: ['Merchant'],
		}),
		// cancel Merchant request
		cancelMerchant: builder.mutation({
			query: (data) => ({
				url: '/cancel-merchant',
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Deposit'],
		}),
	}),
});

export const {
	useCreateMerchantMutation,
	useGetMerchantsQuery,
	useGetMerchantQuery,
	useApproveMerchantMutation,
	useCancelMerchantMutation,
} = merchantApi;
