const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const Usdx = require('../models/usdxModel');
const createTransaction = require('../utils/tnx');
const PXCPrice = require('./../models/pxcPrice');
const Deposit = require('../models/depositModel');

// convert to PXC
exports.convertUsdtToPXC = catchAsyncErrors(async (req, res, next) => {
	const PXCPrices = await PXCPrice.find();
	let priceLength = PXCPrices.length;
	const currentPrice = await PXCPrices[priceLength - 1].price;
	const user = await User.findById(req.user._id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	// check user has atlast 1 Deposit
	const deposits = await Deposit.find({ userId: req.user._id });
	if (deposits.length < 1) {
		return next(
			new ErrorHander(
				'25% of bonus account must be deposit on Payunx Coin account.',
				400
			)
		);
	}
	const usdtBalance = user.bonus_balance;
	const minAmount = usdtBalance * 0.25;

	// check user balance < amount of 25%
	if (user.balance < minAmount) {
		return next(
			new ErrorHander(
				'Your Main balance is less than 25% of the amount you want to convert',
				400
			)
		);
	}

	const PXC = usdtBalance / currentPrice;
	user.balance = user.balance + usdtBalance;
	user.PXC_balance = user.PXC_balance + PXC;
	createTransaction(
		user._id,
		'cashIn',
		usdtBalance,
		'PXC',
		`USDT to PXC Conversion`
	);
	user.bonus_balance = 0;
	await user.save();

	res.status(200).json({
		success: true,
		massage: 'USDT to PXC Conversion successful',
	});
});
