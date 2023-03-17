import { apiSlice } from '../api/apiSlice';

export const shareApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get logged in user share details
		getShareDetails: builder.query({
			query: () => '/share/details',
			providesTags: ['ShareDetails'],
		}),

		// buy a share
		buyShare: builder.mutation({
			query: (qty) => ({
				url: '/share/buy',
				method: 'POST',
				body: qty,
			}),
			invalidatesTags: ['ShareDetails'],
		}),
	}),
});

export const { useGetShareDetailsQuery, useBuyShareMutation } = shareApi;
