import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../Dashboard/Layout/Layout';
import CreateMining from './CreateMining';
import MiningLayout from './MiningLayout';
import MiningStatus from './MiningStatus';

const Mining = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<Layout>
			<MiningLayout>
				<div className=''>
					{user?.mining_id ? <MiningStatus /> : <CreateMining />}
				</div>
			</MiningLayout>
		</Layout>
	);
};

export default Mining;
