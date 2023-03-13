import { apiSlice } from '../api/apiSlice';

export const usdtApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// convert usdt to PXC
		convertUsdtToPXC: builder.mutation({
			query: () => ({
				url: '/convert-usdt-to-PXC',
				method: 'PUT',
				invalidateTags: ['Users', 'User'],
			}),
		}),
	}),
});

export const { useConvertUsdtToPXCMutation } = usdtApi;
