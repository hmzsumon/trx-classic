import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { useState } from 'react';
import { useEffect } from 'react';

const MinHeaders = () => {
	const { user } = useSelector((state) => state.auth);
	// const { mining } = useSelector((state) => state.mining);

	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (copied) {
			toast.success('Copied to clipboard');
		}
	}, [copied]);

	return (
		<div className='px-6 py-4 shadow-md'>
			<div className='flex items-center justify-center md:justify-between'>
				<div className='hidden md:block'>
					<Link to='/dashboard'>
						<div className='flex items-center space-x-2'>
							<IoMdArrowRoundBack />
							<span>Go Back</span>
						</div>
					</Link>
				</div>
				<div>
					ID:{' '}
					{user?.mining_id ? (
						<span className=''>{user?.mining_id}</span>
					) : (
						<span className='text-red-500'>You have no Mining ID </span>
					)}
				</div>
				<CopyToClipboard
					text={`${user?.mining_id}`}
					onCopy={() => setCopied({ copied: true })}
				>
					<FaRegCopy className='ml-4 text-gray-500 cursor-pointer' />
				</CopyToClipboard>
			</div>
		</div>
	);
};

export default MinHeaders;
