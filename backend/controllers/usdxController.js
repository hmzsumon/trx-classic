const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const Usdx = require('../models/usdxModel');
const createTransaction = require('../utils/tnx');
const { v4: uuidv4 } = require('uuid');

// get logged in user usdx details
exports.getUsdxDetails = catchAsyncErrors(async (req, res, next) => {
	const usdx = await Usdx.findOne({ user_id: req.user.id });
	if (!usdx) {
		return next(new ErrorHander('No usdx found with this ID', 404));
	}

	res.status(200).json({
		success: true,
		usdx: usdx,
	});
});

// create all usdx details
exports.createUsdxForUsers = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();
	for (let i = 0; i < users.length; i++) {
		const usdx = await Usdx.findOne({ user_id: users[i].id });
		if (!usdx) {
			const uuId = uuidv4().toString().replace(/-/g, '');
			const usdxId = `X${uuId}`;
			await Usdx.create({
				usdx_id: usdxId,
				user_name: users[i].name,
				user_id: users[i].id,
				usdx_balance: 1,
				usdx_coin: 0,
			});

			console.log(`usdx created for ${users[i].name}`);
		}
	}

	res.status(200).json({
		success: true,
		message: 'usdx created successfully',
	});
});

// send usdx to another usdx
exports.sendUsdx = catchAsyncErrors(async (req, res, next) => {
	const userId = req.user.id;
	const user = await User.findById(userId);
	if (!user) {
		return next(new ErrorHander('No user found with this ID', 404));
	}
	const { usdx_id, amount } = req.body;

	// check usdx id is valid
	if (!usdx_id || !amount) {
		return next(new ErrorHander('Please enter usdx id and amount', 400));
	}

	// sender usdx details
	const senderUsdx = await Usdx.findOne({ user_id: userId });
	if (!senderUsdx) {
		return next(new ErrorHander('No usdx found with this ID', 404));
	}

	// check usdx id itself
	if (senderUsdx.usdx_id === usdx_id) {
		return next(new ErrorHander('You cannot send usdx to yourself', 400));
	}

	// receiver usdx details
	const receiverUsdx = await Usdx.findOne({ usdx_id: usdx_id });

	if (!receiverUsdx) {
		return next(new ErrorHander('No usdx found with this ID', 404));
	}

	// receiver user
	const receiverUser = await User.findById(receiverUsdx.user_id);

	if (!receiverUser) {
		return next(new ErrorHander('No user found with this ID', 404));
	}

	// amount to number
	const amountToNumber = Number(amount);

	if (senderUsdx.usdx_balance < amountToNumber) {
		return next(new ErrorHander('Insufficient balance', 400));
	}

	// update sender usdx balance
	senderUsdx.usdx_balance = senderUsdx.usdx_balance - amountToNumber;
	createTransaction(
		userId,
		'cashOut',
		amountToNumber,
		'usdx',
		`Sent ${amountToNumber} usdx to ${receiverUser.name}`
	);
	await senderUsdx.save();

	// update receiver usdx balance
	receiverUsdx.usdx_balance = receiverUsdx.usdx_balance + amountToNumber;
	createTransaction(
		receiverUsdx.user_id,
		'cashIn',
		amountToNumber,
		'usdx',
		`Received ${amountToNumber} usdx from ${user.name}`
	);

	await receiverUsdx.save();

	res.status(200).json({
		success: true,
		message: 'usdx sent successfully',
	});
});
