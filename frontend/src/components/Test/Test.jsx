import React from 'react';
import { useTestPostMutation } from '../../features/verify/verifyApi';

const Test = () => {
	const [testPost, { isLoading }] = useTestPostMutation();
	const [input, setInput] = React.useState('');

	const id = 100;
	const handleSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.append('test', input);
		myForm.append('id', id);
		testPost(myForm);
	};

	return (
		<div className='mt-20 text-center'>
			<h1>Test</h1>
			<div className='w-1/2 mx-auto space-y-3'>
				<input
					className='w-full text-gray-800'
					type='text'
					onChange={(e) => setInput(e.target.value)}
				/>
				<button className='w-full bg-green-500' onClick={handleSubmit}>
					<span>Submit</span>
				</button>
			</div>
		</div>
	);
};

export default Test;
