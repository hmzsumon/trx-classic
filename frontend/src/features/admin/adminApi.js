import { apiSlice } from '../api/apiSlice';

export const adminApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Get company info
		getCompanyAdmin: builder.query({
			query: () => '/admin/company',
			providesTags: ['Company'],
		}),
	}),
});

export const { useGetCompanyAdminQuery } = adminApi;
