import { apiSlice } from '../api/apiSlice';
import { setMining } from './miningSlice';

export const miningApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get mining
		getMining: builder.query({
			query: () => '/mining/me',
			providesTags: ['Mining'],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				const result = await queryFulfilled;
				dispatch(setMining(result.data));
			},
		}),

		// create mining id
		createMining: builder.mutation({
			query: () => ({
				url: '/mining',
				method: 'POST',
			}),
			invalidatesTags: ['Mining'],
		}),

		// start mining
		startMining: builder.mutation({
			query: (data) => ({
				url: '/mining/start',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Mining'],
		}),

		// mining convert
		convertMining: builder.mutation({
			query: (data) => ({
				url: '/mining/convert',
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Mining', 'User'],
		}),
	}),
});

export const {
	useGetMiningQuery,
	useCreateMiningMutation,
	useStartMiningMutation,
	useConvertMiningMutation,
} = miningApi;
