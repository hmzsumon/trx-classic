import React, { useState } from 'react';
import Icon2 from '../../assets/icon/bet365_8_id_b.png';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import Layout from '../Dashboard/Layout/Layout';
import GoBack from '../../global/GoBack';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import FadeLoader from 'react-spinners/FadeLoader';

const Document2 = () => {
	const location = useLocation();
	const { imgInfo1, method } = location.state;
	console.log('method', method);
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [imgInfo2, setImgInfo2] = useState({
		file2: [],
		imagePreviewUrl_2: null,
	});

	console.log('UserInfo2', imgInfo2.file2);

	let reader = new FileReader();

	const handleInputChange = (event) => {
		setLoading(true);
		const imageFile = event.target.files[0];
		const imageFilname = event.target.files[0].name;

		if (!imageFile) {
			toast.error('Please select image.');
			setLoading(false);
			return false;
		}

		if (!imageFile.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif)$/)) {
			toast.error('Please select valid image JPG,JPEG,PNG');
			setLoading(false);
			return false;
		}
		reader.onload = (e) => {
			const img = new Image();
			img.onload = () => {
				//------------- Resize img code ----------------------------------
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);

				var MAX_WIDTH = 437;
				var MAX_HEIGHT = 437;
				var width = img.width;
				var height = img.height;

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(img, 0, 0, width, height);
				ctx.canvas.toBlob(
					(blob) => {
						const file = new File([blob], imageFilname, {
							type: 'image/jpeg',
							lastModified: Date.now(),
						});
						setImgInfo2({
							...imgInfo2,
							file2: file,
							imagePreviewUrl_2: URL.createObjectURL(imageFile),
						});
					},
					'image/jpeg',
					1
				);
			};
			img.onerror = () => {
				toast.error('Invalid image content.');
				setLoading(false);
				return false;
			};
			//debugger
			img.src = e.target.result;
		};
		reader.readAsDataURL(imageFile);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	// handel cancel button
	const handleCancel = () => {
		setImgInfo2({
			...imgInfo2,
			imagePreviewUrl_2: null,
		});
	};

	// handle confirm button
	const handleConfirm = () => {
		navigate('/verification/profile-photo', {
			state: { imgInfo1, imgInfo2, method },
		});
	};
	return (
		<Layout>
			<div className='w-11/12 p-4 mx-auto border rounded-md md:w-6/12 '>
				{loading ? (
					<div className='flex items-center justify-center w-full h-[50vh] '>
						<FadeLoader color={'#fbbf24'} />
					</div>
				) : (
					<>
						<div>
							{imgInfo2.imagePreviewUrl_2 ? (
								<img
									src={imgInfo2.imagePreviewUrl_2}
									alt='Icon'
									className='py-2 mx-auto rounded w-44'
								/>
							) : (
								<img
									src={Icon2}
									alt='Icon'
									className='py-2 mx-auto rounded w-44'
								/>
							)}
						</div>
						{method === 'Driving License' && (
							<h1 className='my-2 text-xl text-center'>
								Upload back of your driving license
							</h1>
						)}

						{method === 'Passport' && (
							<h1 className='my-2 text-sm text-center'>
								Upload the page with the address of the passport
							</h1>
						)}

						{method === 'National ID' && (
							<h1 className='my-2 text-xl text-center'>
								Upload back of your national ID
							</h1>
						)}

						<p className='text-xs italic text-center'>Step 2 of 3</p>
						<p className='my-2 text-xs text-center'>
							Upload a color image of the entire document. Screenshots are not
							allowed. JPEG, JPG or PNG format only
						</p>
						{imgInfo2.imagePreviewUrl_2 ? (
							<div className='grid grid-cols-2 gap-4'>
								<button
									type='button'
									className='w-full py-2 bg-red-500 rounded'
									onClick={handleCancel}
								>
									Cancel
								</button>
								<button
									type='button'
									className='w-full py-2 bg-green-500 rounded'
									onClick={handleConfirm}
								>
									Confirm
								</button>
							</div>
						) : (
							<div className='upload'>
								<button type='button' className='btn-warning'>
									<AiOutlineCloudUpload /> Upload File
									<input
										type='file'
										accept='image/*'
										onChange={handleInputChange}
									/>
								</button>
							</div>
						)}
					</>
				)}

				<div className='flex items-center justify-center mt-9 '>
					<GoBack />
				</div>
			</div>
		</Layout>
	);
};

export default Document2;

// import Icon2 from '../../assets/icon/bet365_8_id_b.png';
// import Icon3 from '../../assets/icon/profile.png';
