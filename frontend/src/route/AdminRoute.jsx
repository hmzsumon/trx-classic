import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Verifications from '../components/Admin/Verification/Verifications';

const AdminRoute = () => {
	return (
		<Routes>
			<Route
				path='/admin/verifications'
				element={
					<PrivateRoute>
						<Verifications />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};

export default AdminRoute;
