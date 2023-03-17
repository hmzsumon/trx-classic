import { apiSlice } from '../api/apiSlice';

export const noticeApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get notice
		getNotice: builder.query({
			query: () => '/active-notices',
			providesTags: ['Notice'],
		}),

		// get all notices
		getAllNotices: builder.query({
			query: () => '/notices',
			providesTags: ['Notice'],
		}),

		// create notice
		createNotice: builder.mutation({
			query: (body) => ({
				url: '/notice',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Notice'],
		}),
	}),
});

export const {
	useGetNoticeQuery,
	useGetAllNoticesQuery,
	useCreateNoticeMutation,
} = noticeApi;
