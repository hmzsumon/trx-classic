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
					{isLoading ? 'Loading...' : notice?.description}
				</h1>
			</marquee>
		</div>
	);
};

export default Notice;
