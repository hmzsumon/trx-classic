import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivetRoute = ({ isAdmin }) => {
	const { user, isAuthenticated } = useSelector((state) => state.auth);

	// // check if user email_verified is true
	// if (user?.email_verified === false) {
	// 	return <Navigate to={`/email-verify?email=${user?.email}`} />;
	// }

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	if (isAdmin) {
		return user.role === 'admin' || user?.role === 'manager' ? (
			<Outlet />
		) : (
			<Navigate to='/not-access' />
		);
	}

	if (user.role === 'user') {
		return <Outlet />;
	}
};

export default PrivetRoute;
