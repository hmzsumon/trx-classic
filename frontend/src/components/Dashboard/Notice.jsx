/* eslint-disable jsx-a11y/no-distracting-elements */
import React from 'react';
import { useGetNoticeQuery } from '../../features/notice/noticeApi';

const Notice = () => {
	const { data, isLoading } = useGetNoticeQuery();
	const { notice } = data || {};
	return (
		<div>
			<small className='font-bold text-orange-500'>Notice:</small>
			<marquee behavior='scroll' direction='left'>
				<h1 className='text-sm font-semibold text-yellow-500'>
					{/* {isLoading ? 'Loading...' : notice?.description} */}
					Dear user! Any user who creates a new account will get a 50$ signup
					bonus, and if he refers, he will get a 5$ bonus per refer and can
					refer as much as he wants. And if you do TRXC free mining you will get
					10$ per day. This free offer is available till 30th April. Everyone
					make unlimited income by referring more and more.
				</h1>
			</marquee>
		</div>
	);
};

export default Notice;
