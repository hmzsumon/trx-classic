import React from 'react';
import Menu from './Menu';
import MinHeaders from './MinHeaders';

const MiningLayout = ({ children }) => {
	return (
		<>
			<div className='h-auto pb-20'>
				<MinHeaders />
				<Menu />
				<div className=''>{children}</div>
			</div>
		</>
	);
};

export default MiningLayout;
