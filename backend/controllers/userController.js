const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const WithdrawDetails = require('../models/withdrawDetailsModel');
const sendToken = require('../utils/jwtToken');
const {
	sendEmail,
	sendMe,
	sendVerificationEmail,
} = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const nodeMailer = require('nodemailer');
const pxcPrice = require('./../models/pxcPrice');
const Withdraw = require('../models/withdraw');
const createTransaction = require('../utils/tnx');
const { v4: uuidv4 } = require('uuid');
const Usdx = require('../models/usdxModel');

// send verification email
exports.sendVerificationEmail = catchAsyncErrors(async (req, res, next) => {
	// const { email, subject, text } = req.body;

	const resetPasswordUrl = `${req.protocol}://${req.get('host')}/verify-email`;

	const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
	let email = 'zakariadev01@gmail.com';
	try {
		await sendEmail({
			email: email,
			subject: `Payunx Email Verification`,
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to ${email} successfully`,
		});
	} catch (error) {
		// user.resetPasswordToken = undefined;
		// user.resetPasswordExpire = undefined;

		// await user.save({ validateBeforeSave: false });

		return next(new ErrorHander(error.message, 500));
	}
});

//=========================================================
// Register a user => /api/v1/register
//=========================================================
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const referral_id = req.query.referral_id;

	// if referral id is provided
	if (referral_id) {
		const ref_user = await User.findById(referral_id);

		if (!ref_user) {
			new Error('User not found');
		}
		ref_user.referral_bonus += 5;
		ref_user.bonus_balance += 5;
		await ref_user.save();
	}

	// let random_num = Math.floor(Math.random() * 10000000);
	const random_num = uuidv4().toString().replace(/-/g, '');
	const customer_id = `P${random_num}`;

	const { name, email, password, phone_number } = req.body;

	// unique phone number validation
	const user = await User.findOne({ phone_number });
	if (user) {
		return next(new ErrorHander('Phone number already exists', 400));
	}

	// 6 digit verification code
	const verify_code = Math.floor(100000 + Math.random() * 900000);

	const newUser = await User.create({
		name,
		email,
		phone_number,
		customer_id,
		password,
		sponsor_id: referral_id ? referral_id : null,
		sinUp_bonus: 50,
		bonus_balance: 50,
		verify_code,
	});

	// create usdx account
	const uuId = uuidv4().toString().replace(/-/g, '');
	const usdxId = `X${uuId}`;
	await Usdx.create({
		usdx_id: usdxId,
		user_name: newUser.name,
		user_id: newUser._id,
		usdx_balance: 0,
		usdx_coin: 0,
	});

	// create withdraw details
	await WithdrawDetails.create({
		user_id: newUser._id,
		name: newUser.name,
	});

	// send verify code to user email
	sendEmail({
		email: newUser.email,
		subject: 'Payunx Verification Code',
		message: `Your verification code is ${verify_code}`,
	});

	res.status(201).json({
		success: true,
		message: 'User registered successfully',
		user: newUser,
	});
});

// merchant registration
exports.registerMerchant = catchAsyncErrors(async (req, res, next) => {
	// let random_num = Math.floor(Math.random() * 10000000);
	let random_num = new Date().getTime();
	let customer_id = `P${random_num}X`;
	let merchantProfit = 0;
	const {
		name,
		email,
		password,
		phone_number,
		role,
		nid_number,
		country,
		address,
	} = req.body;

	// unique phone number validation
	const user = await User.findOne({ phone_number });
	if (user) {
		return next(new ErrorHander('Phone number already exists', 400));
	}

	const newUser = await User.create({
		name,
		email,
		phone_number,
		customer_id,
		password,
		role,
		nid_number,
		country,
		address,
		// active_status: false,
		merchant_profit: merchantProfit,
	});

	sendMe({
		subject: 'Merchant Registration',
		message: `name: ${name} \n email: ${email} \n  phone_number: ${phone_number} \n customer_id: ${customer_id} \n date: ${new Date()}`,
	}).catch(console.error);

	res.status(201).json({
		success: true,
		message: 'Merchant registered successfully',
		user: newUser,
	});
});

//======================================
// Login User => /api/v1/login
//======================================
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;
	// console.log(req.body);
	// checking if user has given password and email both

	if (!email || !password) {
		return next(new ErrorHander('Please Enter Email & Password', 400));
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorHander('Invalid email or password', 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHander('Invalid email or password', 401));
	}
	// check if user is email verified
	if (user.is_newUser === true) {
		return next(new ErrorHander('Please verify your email', 401));
	}

	sendToken(user, 200, res);
});

//======================================
// Logout User
//======================================
exports.logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: 'Logged Out',
	});
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// Get ResetPassword Token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${req.protocol}://${req.get(
		'host'
	)}/password/reset/${resetToken}`;

	const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: `Payunx Coin Password Recovery`,
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email} successfully`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHander(error.message, 500));
	}
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	// creating token hash
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.body.token)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHander(
				'Reset Password Token is invalid or has been expired',
				400
			)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHander('Password does not password', 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	res.status(200).json({
		success: true,
		user,
	});
});

// get a User bu another id
exports.getUserBypxcId = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ customer_id: req.body.pxcId });
	console.log(user);
	res.status(200).json({
		success: true,
		user,
	});
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

	if (!isPasswordMatched) {
		return next(new ErrorHander('Old password is incorrect', 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHander('password does not match', 400));
	}

	user.password = req.body.newPassword;

	await user.save();

	sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};

	if (req.body.avatar !== '') {
		const user = await User.findById(req.user.id);

		const imageId = user.avatar.public_id;

		await cloudinary.v2.uploader.destroy(imageId);

		const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: 'avatars',
			width: 150,
			crop: 'scale',
		});

		newUserData.avatar = {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		};
	}

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHander(`User does not exist with Id: ${req.params.id}`)
		);
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
		active_status: req.body.active_status,
		balance: req.body.balance,
		pxc_balance: req.body.pxc_balance,
	};

	await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
		);
	}

	if (user.avatar.public_id) {
		const imageId = user.avatar.public_id;
		await cloudinary.v2.uploader.destroy(imageId);
	}

	await user.remove();

	res.status(200).json({
		success: true,
		message: 'User Deleted Successfully',
	});
});

// update all users balance
exports.updateAllUsersBalance = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();
	let current_price = req.body.current_price;

	users.forEach(async (user) => {
		if (user.balance === 0) {
			return;
		}
		user.balance = user.pxc_balance;

		await user.save();
	});

	res.status(200).json({
		success: true,
		message: 'All users balance updated successfully',
	});
});

// find user by phone number
exports.findUserByPhoneNumber = catchAsyncErrors(async (req, res, next) => {
	const user = await User.find({ phone_number: req.body.phone_number });

	if (!user) {
		return next(
			new ErrorHander(
				`User does not exist with phone number: ${req.body.phone_number}`,
				400
			)
		);
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// update user balance by pxc_price
exports.updateUserBalanceBypxcPrice = catchAsyncErrors(
	async (req, res, next) => {
		const user = await User.findById(req.user._id);
		if (!user) {
			return next(new ErrorHander('User not found', 404));
		}

		if (user.role === 'merchant') {
			user.balance = user.balance + user.merchant_profit;
			// console.log('user.merchant_profit', user.merchant_profit);
		}

		const pxcPrices = await pxcPrice.find();
		let priceLength = pxcPrices.length;
		const currentPrice = await pxcPrices[priceLength - 1].price;

		user.balance = user.pxc_balance * currentPrice;
		await user.save();

		res.status(200).json({
			success: true,
			message: 'User balance updated successfully',
		});
	}
);

// get all users balance === 0
exports.getAllUsersBalance = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();
	const totalUsers = users.length;
	// get all users balance === 0
	const usersBalance0 = users.filter((user) => user.balance <= 0);
	const usersBalance0Length = usersBalance0.length;
	// remove all users balance === 0
	users.forEach(async (user) => {
		if (user.balance <= 0) {
			await user.remove();
		}
	});

	res.status(200).json({
		success: true,
		totalUsers,
		usersBalance0Length,
	});
});

// update pxc_mining_balance && is_pxc_mining && is_completed_pxc_mining for all users
exports.updatepxcMiningBalance = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		user.pxc_mining_balance = 0;
		user.is_pxc_mining = false;
		user.is_completed_pxc_mining = false;
		await user.save();
	}

	res.status(200).json({
		success: true,
		message: 'pxc mining balance updated successfully',
	});
});

// start pxc mining
exports.startpxcMining = catchAsyncErrors(async (req, res, next) => {
	const prices = await pxcPrice.find().sort({ _id: -1 }).limit(1);
	const currentPrice = prices[0].price;

	const pxc = 20 / currentPrice;

	const user = await User.findById(req.user._id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	// check if user is_pxc_mining === true
	if (user.is_pxc_mining === true) {
		return next(new ErrorHander('You are already mining', 400));
	}
	// check if user has enough balance
	if (user.balance < 20) {
		return next(new ErrorHander('You do not have enough balance', 400));
	}

	user.balance = user.balance - 20;
	createTransaction(user._id, 'cashOut', 20, 'pxc Mining', 'Start pxc Mining');
	user.is_pxc_mining = true;
	user.pxc_balance -= pxc;
	createTransaction(user._id, 'cashOut', pxc, 'pxc Mining', 'Start pxc Mining');
	await user.save();

	res.status(200).json({
		success: true,
		message: 'pxc mining started successfully',
	});
});

// is_completed_pxc_mining
exports.isCompletedpxcMining = catchAsyncErrors(async (req, res, next) => {
	const { amount } = req.body;
	const numAmount = Number(amount);

	const user = await User.findById(req.user._id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	// check if user is_pxc_mining === true
	if (user.is_completed_pxc_mining === true) {
		return next(new ErrorHander('You are already mining', 400));
	}

	user.is_completed_pxc_mining = true;
	user.pxc_mining_balance += numAmount;
	createTransaction(
		user._id,
		'cashIn',
		numAmount,
		'pxc Mining',
		'pxc Mining Completed'
	);
	await user.save();

	res.status(200).json({
		success: true,
		message: 'pxc mining completed successfully',
	});
});

// update all users is_completed_pxc_mining === false
exports.updatepxcMining = catchAsyncErrors(async (req, res, next) => {
	//find all users is_pxc_mining === true && role === user
	const users = await User.find({
		is_pxc_mining: true,
		role: 'user',
	});

	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		user.is_completed_pxc_mining = false;
		await user.save();
	}

	res.status(200).json({
		success: true,
		message: 'pxc mining completed successfully',
		users: users.length,
	});
});

// update all users balance = pxc_balance * currentPrice
exports.updateAllUsersBalance2 = catchAsyncErrors(async (req, res, next) => {
	// find all user pxc_balance > 0
	const users = await User.find({ pxc_balance: { $gt: 0 }, role: 'user' });

	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		console.log(' ');
		console.log('=========================================');
		console.log('user Prev Balance', user.name, '=', user.balance);
		console.log('******************************************');

		const pxcPrices = await pxcPrice.find();
		let priceLength = pxcPrices.length;
		const currentPrice = await pxcPrices[priceLength - 1].price;

		// console.log('currentPrice', currentPrice);

		user.balance = user.pxc_balance * currentPrice;
		await user.save();

		console.log('user Current Balance', user.name, '=', user.balance);
		console.log('=========================================');
		console.log(' ');
	}

	res.status(200).json({
		success: true,
		users: users.length,
		message: 'All users balance updated successfully',
	});
});

// verify email address with code
exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
	const { code, email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	if (user.email_verified === true) {
		return next(new ErrorHander('Email already verified', 400));
	}
	if (user.verify_code !== code) {
		return next(new ErrorHander('Invalid code', 400));
	}

	user.email_verified = true;
	user.verify_code = null;
	user.is_newUser = false;
	await user.save();

	res.status(200).json({
		success: true,
		message: 'Email verified successfully',
		user,
	});
});

// resend email verification code
exports.resendEmailVerificationCode = catchAsyncErrors(
	async (req, res, next) => {
		const { email } = req.query;
		const user = await User.findOne({ email });
		if (!user) {
			return next(new ErrorHander('User not found', 404));
		}

		const code = Math.floor(100000 + Math.random() * 900000);
		user.verify_code = code;
		await user.save();

		const message = `Your verification code is ${code}`;
		sendEmail({
			email: user.email,
			subject: 'Email Verification Code',
			message,
		});

		res.status(200).json({
			success: true,
			message: 'Email verification code sent successfully',
		});
	}
);

// update all users is_newUser === false
exports.updateAllUsersIsNewUser = catchAsyncErrors(async (req, res, next) => {
	//find all users is_newUser === true && role === user
	const users = await User.find({
		is_newUser: true,
		role: 'admin',
	});

	for (let i = 0; i < users.length; i++) {
		const user = users[i];

		await user.save();
	}

	res.status(200).json({
		success: true,
		message: 'All users is_newUser updated successfully',
		users: users.length,
	});
});

// remove user where user email is not @gmail.com
exports.removeUserNotGmail = catchAsyncErrors(async (req, res, next) => {
	//find all users is_newUser === true && role === user
	const users = await User.find({
		email: { $not: /gmail.com/ },
		role: 'user',
	});

	console.log('users', users.length);

	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		await user.remove();
	}

	res.status(200).json({
		success: true,
		message: 'All users is_newUser updated successfully',
		users: users.length,
	});
});
