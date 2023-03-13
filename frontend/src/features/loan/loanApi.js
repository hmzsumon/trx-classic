import { apiSlice } from '../api/apiSlice';

export const loanApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// new loan request
		newLoanRequest: builder.mutation({
			query: (data) => ({
				url: '/loan/new',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Loan', 'User', 'Mining', 'Loans', 'Users'],
		}),

		// get all loan requests
		getLoanRequests: builder.query({
			query: () => '/admin/loans',
			providesTags: ['Loan'],
		}),

		// get single loan request
		getSingleLoan: builder.query({
			query: (id) => `/loan/${id}`,
			providesTags: ['Loan'],
		}),

		// approve loan request
		approveLoanRequest: builder.mutation({
			query: (id) => ({
				url: `/admin/loan/approve/${id}`,
				method: 'PUT',
			}),
			invalidatesTags: ['Loan', 'User', 'Mining', 'Loans', 'Users'],
		}),

		// reject loan request
		rejectLoanRequest: builder.mutation({
			query: ({ body, id }) => ({
				url: `/admin/loan/reject/${id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Loan', 'User', 'Mining', 'Loans', 'Users'],
		}),
	}),
});

export const {
	useNewLoanRequestMutation,
	useGetLoanRequestsQuery,
	useGetSingleLoanQuery,
	useApproveLoanRequestMutation,
	useRejectLoanRequestMutation,
} = loanApi;
