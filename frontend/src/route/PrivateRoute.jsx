import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, isAdmin }) => {
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	return (
		<>
			{isAuthenticated === false ? (
				<Navigate to='/login' />
			) : isAdmin ? (
				user.role !== 'admin' ? (
					<Navigate to='/login' />
				) : (
					children
				)
			) : (
				children
			)}
		</>
	);
};

export default PrivateRoute;
