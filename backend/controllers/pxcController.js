const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const createTransaction = require('../utils/tnx');
const PXCPrice = require('./../models/pxcPrice');
const Usdx = require('../models/usdxModel');

// buy PXC by usdx
exports.buyPXC = catchAsyncErrors(async (req, res, next) => {
	const PXCPrices = await PXCPrice.find();
	let priceLength = PXCPrices.length;
	const currentPrice = await PXCPrices[priceLength - 1].price;
	const { amount } = req.body;

	if (!amount) {
		return next(new ErrorHander('Please enter amount', 400));
	}
	const numAmount = Number(amount);
	const user = await User.findById(req.user._id);
	const usdx = await Usdx.findOne({ user_id: req.user._id });

	// check if user has enough usdx
	if (usdx.usdx_balance < numAmount) {
		return next(new ErrorHander('Insufficient usdx balance', 400));
	}

	// update usdx balance
	usdx.usdx_balance = usdx.usdx_balance - numAmount;
	createTransaction(user._id, 'cashOut', numAmount, 'usdx', 'PXC Purchase');
	await usdx.save();

	// update PXC balance
	const PXC = numAmount / currentPrice;
	user.balance = user.balance + numAmount;
	user.PXC_balance = user.PXC_balance + PXC;
	createTransaction(user._id, 'cashIn', numAmount, 'PXC', 'PXC Purchase');
	await user.save();

	res.status(200).json({
		success: true,
		massage: 'PXC purchase successful',
	});
});

// sell PXC for usdx
exports.sellPXC = catchAsyncErrors(async (req, res, next) => {
	const PXCPrices = await PXCPrice.find();
	let priceLength = PXCPrices.length;
	const currentPrice = await PXCPrices[priceLength - 1].price;
	const { amount } = req.body;

	if (!amount) {
		return next(new ErrorHander('Please enter amount', 400));
	}
	const numAmount = Number(amount);
	const user = await User.findById(req.user._id);
	const usdx = await Usdx.findOne({ user_id: req.user._id });

	// check if user has enough PXC
	if (user.balance < numAmount) {
		return next(new ErrorHander('Insufficient PXC balance', 400));
	}

	// update PXC balance
	const PXC = numAmount / currentPrice;
	user.PXC_balance = user.PXC_balance - PXC;
	user.balance = user.balance - numAmount;
	createTransaction(user._id, 'cashOut', numAmount, 'PXC', 'PXC Sale');
	await user.save();

	// update usdx balance

	usdx.usdx_balance = usdx.usdx_balance + numAmount - numAmount * 0.02;
	createTransaction(
		user._id,
		'cashIn',
		numAmount - numAmount * 0.02,
		'usdx',
		'PXC Sale'
	);
	await usdx.save();

	res.status(200).json({
		success: true,
		massage: 'PXC sale successful',
	});
});
