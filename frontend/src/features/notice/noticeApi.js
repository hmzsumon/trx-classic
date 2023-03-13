import { apiSlice } from '../api/apiSlice';

export const noticeApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get notice
		getNotice: builder.query({
			query: () => '/active-notices',
			providesTags: ['Notice'],
		}),
	}),
});

export const { useGetNoticeQuery } = noticeApi;
