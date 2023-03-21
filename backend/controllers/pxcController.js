const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const createTransaction = require('../utils/tnx');
const Price = require('./../models/pxcPrice');
const Usdx = require('../models/usdxModel');

// buy pxc by usdx
exports.buypxc = catchAsyncErrors(async (req, res, next) => {
	const pxcPrices = await Price.find();
	let priceLength = pxcPrices.length;
	const currentPrice = await pxcPrices[priceLength - 1].price;
	const { amount } = req.body;

	if (!amount) {
		return next(new ErrorHander('Please enter amount', 400));
	}
	const numAmount = Number(amount);
	const user = await User.findById(req.user._id);
	const usdx = await Usdx.findOne({ user_id: req.user._id });

	// check if user has enough usdx
	if (usdx.usdx_balance < numAmount) {
		return next(new ErrorHander('Insufficient usdt balance', 400));
	}

	// update usdx balance
	usdx.usdx_balance = usdx.usdx_balance - numAmount;
	createTransaction(user._id, 'cashOut', numAmount, 'usdt', 'TRXC Purchase');
	await usdx.save();

	// update pxc balance
	const pxc = numAmount / currentPrice;
	user.balance = user.balance + numAmount;
	user.pxc_balance = user.pxc_balance + pxc;
	createTransaction(user._id, 'cashIn', numAmount, 'TRXC', 'TRXC Purchase');
	await user.save();

	res.status(200).json({
		success: true,
		massage: 'TRXC purchase successful',
	});
});

// sell pxc for usdx
exports.sellpxc = catchAsyncErrors(async (req, res, next) => {
	const pxcPrices = await Price.find();
	let priceLength = pxcPrices.length;
	const currentPrice = await pxcPrices[priceLength - 1].price;
	const { amount } = req.body;

	if (!amount) {
		return next(new ErrorHander('Please enter amount', 400));
	}
	const numAmount = Number(amount);
	const user = await User.findById(req.user._id);
	const usdx = await Usdx.findOne({ user_id: req.user._id });

	// check if user has enough pxc
	if (user.balance < numAmount) {
		return next(new ErrorHander('Insufficient TRXC balance', 400));
	}

	// update pxc balance
	const pxc = numAmount / currentPrice;
	user.pxc_balance = user.pxc_balance - pxc;
	user.balance = user.balance - numAmount;
	createTransaction(user._id, 'cashOut', numAmount, 'TRXC', 'TRXC Sale');
	await user.save();

	// update usdx balance

	usdx.usdx_balance = usdx.usdx_balance + numAmount - numAmount * 0.02;
	createTransaction(
		user._id,
		'cashIn',
		numAmount - numAmount * 0.02,
		'usdt',
		'TRXC Sale'
	);
	await usdx.save();

	res.status(200).json({
		success: true,
		massage: 'pxc sale successful',
	});
});
