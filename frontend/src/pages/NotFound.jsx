import { Link } from 'react-router-dom';
// import notFound from '../assets/404-not-found.svg';
import notFound from '../assets/coming-soon.png';

const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-4 mt-16 bg-slate-900'>
			<div className='w-11/12'>
				<img
					draggable='false'
					className='h-full mx-auto sm:w-1/3'
					src={notFound}
					alt='Page Not Found'
				/>
			</div>
			<Link
				to='/'
				className='px-4 py-2 text-white uppercase bg-blue-500 rounded-sm shadow hover:shadow-lg'
			>
				Back To Home
			</Link>
		</div>
	);
};

export default NotFound;
