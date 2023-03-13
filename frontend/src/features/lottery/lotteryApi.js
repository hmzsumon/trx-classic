import { apiSlice } from '../api/apiSlice';

export const lotteryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getLotteries: builder.query({
			query: (limit) => `/tickets?limit=${limit}`,
			providesTags: (result) => [...(result?.lottery?.tags ?? ['Lottery'])],
		}),

		// buy ticket
		buyTicket: builder.mutation({
			query: (id) => ({
				url: `/ticket/buy/${id}`,
				method: 'POST',
				body: id,
			}),
			invalidatesTags: ['Lottery'],
		}),

		// my tickets
		getMyTickets: builder.query({
			query: () => `/user/tickets`,
			providesTags: (result) => [...(result?.lottery?.tags ?? ['Lottery'])],
		}),

		// get all sold tickets
		getAllSoldTickets: builder.query({
			query: () => `/sold/tickets`,
			providesTags: (result) => [...(result?.lottery?.tags ?? ['Lottery'])],
		}),

		// publish winners
		publishWinners: builder.mutation({
			query: (winners) => ({
				url: `/winners/publish`,
				method: 'POST',
				body: winners,
			}),
		}),

		// get all winners
		getAllWinners: builder.query({
			query: () => `/winners`,
			providesTags: (result) => [...(result?.lottery?.tags ?? ['Lottery'])],
		}),

		// get draw by date
		getDrawByDate: builder.query({
			query: (date) => `/raffle-draw?date=${date}`,
			providesTags: (result) => [...(result?.lottery?.tags ?? ['Lottery'])],
		}),
	}),
});

export const {
	useGetLotteriesQuery,
	useBuyTicketMutation,
	useGetMyTicketsQuery,
	useGetAllSoldTicketsQuery,
	usePublishWinnersMutation,
	useGetAllWinnersQuery,
	useGetDrawByDateQuery,
} = lotteryApi;
