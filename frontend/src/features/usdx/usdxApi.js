import { apiSlice } from '../api/apiSlice';
import { setUsdx } from './usdxSlice';

export const usdxApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get logged in user usdx details
		getUsdxDetails: builder.query({
			query: () => '/usdx',
			providesTags: (result) => [...(result?.usdx?.tags ?? [])],

			async onQueryStarted(usdxId, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					console.log('result', result);
					dispatch(setUsdx(result.data.usdx));
				} catch (error) {
					console.log(error);
				}
			},
		}),

		// send usdx to another usdx
		sendUsdx: builder.mutation({
			query: (body) => ({
				url: '/send/usdx',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Usdx'],
		}),
	}),
});

export const { useGetUsdxDetailsQuery, useSendUsdxMutation } = usdxApi;
