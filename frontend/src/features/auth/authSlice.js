import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	btnLogin: false,
	user: null,
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setBtnLogin: (state) => {
			state.btnLogin = !state.btnLogin;
		},
		setUser: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		logoutUser: (state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setBtnLogin, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
