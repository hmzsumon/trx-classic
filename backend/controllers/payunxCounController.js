const PayunxCoin = require('../models/payunxCoin');
const User = require('../models/userModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create a new coin
exports.createCoin = catchAsyncErrors(async (req, res, next) => {
	// const user = await User.findById(req.user.id).select('-password');
	const newCoin = new PayunxCoin({
		title: req.body.title,
		coin: Number(req.body.coin).toPrecision(8),
		price: Number(req.body.price).toFixed(2),
	});
	const coin = await newCoin.save();
	res.status(201).json({
		success: true,
		coin,
	});
});

// Get all coins
exports.getAllCoins = catchAsyncErrors(async (req, res, next) => {
	const coins = await PayunxCoin.find();
	res.status(200).json({
		success: true,
		coins,
	});
});

// Get a single coin
exports.getCoin = catchAsyncErrors(async (req, res, next) => {
	const pxc_coin = await PayunxCoin.findById(req.params.id);
	if (!pxc_coin) {
		return next(new ErrorHander('Coin not found', 404));
	}
	res.status(200).json({
		success: true,
		pxc_coin,
	});
});

// Update a coin
exports.updateCoin = catchAsyncErrors(async (req, res, next) => {
	const coin = await PayunxCoin.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!coin) {
		return next(new ErrorHander('Coin not found', 404));
	}
	res.status(200).json({
		success: true,
		coin,
	});
});

// Delete a coin
exports.deleteCoin = catchAsyncErrors(async (req, res, next) => {
	const coin = await PayunxCoin.findByIdAndDelete(req.params.id);
	if (!coin) {
		return next(new ErrorHander('Coin not found', 404));
	}
	res.status(200).json({
		success: true,
		message: 'Coin deleted successfully',
	});
});
