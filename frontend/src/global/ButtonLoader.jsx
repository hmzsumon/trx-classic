const ButtonLoader = ({ bgColor }) => {
	let circleCommonClasses =
		'h-1.5 w-1.5 bg-current rounded-full flex justify-center';

	return (
		<button
			className={`flex items-center justify-center w-full py-1 space-x-2 ${bgColor} rounded disabled `}
			disabled
		>
			<div className='mb-2 font-bold text-white text-md animate-pulse'>
				Processing
			</div>
			<div className='flex space-x-1'>
				<div
					className={`${circleCommonClasses}   animate-bounce text-white`}
				></div>
				<div
					className={`${circleCommonClasses}  items-center animate-bounce200 text-white`}
				></div>
				<div
					className={`${circleCommonClasses}  items-center animate-bounce400 text-white`}
				></div>
			</div>
		</button>
	);
};

export default ButtonLoader;
