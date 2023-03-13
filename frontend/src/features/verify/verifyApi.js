import { apiSlice } from '../api/apiSlice';

export const verifyApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// create new verification request
		newVerify: builder.mutation({
			query: (data) => ({
				url: '/new/verify',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Verify', 'User', 'Users'],
		}),

		// get all verification requests
		getVerifications: builder.query({
			query: () => '/admin/verifications',
			providesTags: ['Verify'],
		}),

		// get single verification request
		getVerification: builder.query({
			query: (id) => `/admin/verification/${id}`,
			providesTags: ['Verify'],
		}),

		// approve verification request
		approveVerification: builder.mutation({
			query: (id) => ({
				url: `/verification/approve/${id}`,
				method: 'PUT',
			}),
			invalidatesTags: ['Verify', 'User', 'Users'],
		}),

		// reject verification request
		rejectVerification: builder.mutation({
			query: (data) => ({
				url: `/reject/verification`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Verify', 'User', 'Users'],
		}),

		// test post
		testPost: builder.mutation({
			query: (data) => ({
				url: `/test-body`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useNewVerifyMutation,
	useGetVerificationsQuery,
	useGetVerificationQuery,
	useApproveVerificationMutation,
	useRejectVerificationMutation,
	useTestPostMutation,
} = verifyApi;
