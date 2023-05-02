import React from 'react';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyBtn = ({ textData }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 1000);
	};
	return (
		<div>
			<CopyToClipboard text={textData}>
				<button
					className={`w-full px-4 py-2 font-bold text-white ${
						copied ? 'bg-orange-500' : 'bg-blue-600'
					} rounded`}
					onClick={handleCopy}
				>
					{copied ? 'Copied' : 'Copy'}
				</button>
			</CopyToClipboard>
		</div>
	);
};

export default CopyBtn;
