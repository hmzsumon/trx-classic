import React, { useEffect } from 'react';
import Layout from '../Dashboard/Layout/Layout';
import GoBack from '../../global/GoBack';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNewVerifyMutation } from '../../features/verify/verifyApi';
import FadeLoader from 'react-spinners/FadeLoader';

const Submit = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { imgInfo1, imgInfo2, imgInfo3, method } = location.state;

	const [newVerify, { isLoading, isSuccess, isError, error }] =
		useNewVerifyMutation();

	const submitHandler = async (e) => {
		e.preventDefault();
		const images = [imgInfo1.file1, imgInfo2.file2, imgInfo3.file3];
		console.log('images1', images);
		const formData = new FormData();
		formData.append('method', method);
		images.forEach((image) => {
			formData.append('images', image);
		});

		newVerify(formData);
	};

	useEffect(() => {
		if (isError) {
			toast.error(error.data.message);
		}
		if (isSuccess) {
			toast.success('Your documents are submitted successfully');
			navigate('/verify/message', {
				state: {
					status: 'pending',
				},
			});
		}
	}, [isSuccess, isError, error, navigate]);

	return (
		<Layout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-[50vh] '>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className=' h-[60vh] sm:h-auto flex items-center justify-center'>
					<div className='w-11/12 p-4 mx-auto border rounded-md md:w-6/12 '>
						<h1 className='my-4 text-center'>Your Documents</h1>
						<form onSubmit={submitHandler} encType='multipart/form-data'>
							<div className='grid grid-cols-3 gap4'>
								<Link
									to='/view-image'
									state={{ image: imgInfo1.imagePreviewUrl_1 }}
								>
									<img
										src={imgInfo1.imagePreviewUrl_1}
										alt='image1'
										className='w-20 md:w-40 '
									/>
								</Link>
								<Link
									to='/view-image'
									state={{ image: imgInfo2.imagePreviewUrl_2 }}
								>
									<img
										src={imgInfo2.imagePreviewUrl_2}
										alt='image1'
										className='w-20 md:w-40 '
									/>
								</Link>

								<Link
									to='/view-image'
									state={{ image: imgInfo3.imagePreviewUrl_3 }}
								>
									<img
										src={imgInfo3.imagePreviewUrl_3}
										alt='image1'
										className='w-20 md:w-40 '
									/>
								</Link>
							</div>
							<button className=' bg-green-500 w-full my-4 rounded py-1'>
								Submit
							</button>
						</form>
						<div className='flex items-center justify-center mt-9 '>
							<GoBack />
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Submit;

// for (let i = 0; i < files.length; i++) {
// 	(function (file) {
// 		var reader = new FileReader();
// 		reader.onload = (file) => {
// 			console.log('render', reader.result);
// 			setImagesPreview([...imagesPreview, reader.result]);
// 		};

// 		reader.readAsDataURL(file);
// 	})(files[i]);
// }
