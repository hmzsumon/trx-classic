import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Header/Sidebar';

function DashboardLayout({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<div className='flex h-screen overflow-hidden bg-slate-800'>
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className='relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto'>
				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<div className=''>{children}</div>
			</div>
		</div>
	);
}

export default DashboardLayout;
