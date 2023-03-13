import { apiSlice } from '../api/apiSlice';

export const tnxApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all tnx
		getAllTnx: builder.query({
			query: () => '/my/transactions',
			providesTags: ['Tnx'],
		}),
	}),
});

export const { useGetAllTnxQuery } = tnxApi;
