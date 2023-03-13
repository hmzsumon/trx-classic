import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
	tagTypes: [
		'Users',
		'Admin',
		'PXC',
		'Wallet',
		'Transactions',
		'User',
		'Withdraw',
		'Withdraws',
		'MyWithdraws',
		'Loan',
		'Loans',
		'Deposit',
		'Mining',
	],
	endpoints: (builder) => ({}),
});
