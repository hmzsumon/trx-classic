const pxcPrice = require('../models/pxcPrice');
const User = require('../models/userModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const createTransaction = require('../utils/tnx');
const Merchant = require('../models/merchantModel');

// create a pxc price
exports.createpxcPrice = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();
	const newpxcPrice = new pxcPrice({
		price: req.body.price,
	});
	const pxcPrice = await newpxcPrice.save();

	users.forEach(async (user) => {
		if (user.balance === 0) {
			return;
		}
		user.balance = user.pxc_balance * pxcPrice.price;
		await user.save();
	});

	res.status(201).json({
		success: true,
		pxcPrice,
	});
});

// get all pxc prices by date
exports.getAllpxcPrices = catchAsyncErrors(async (req, res, next) => {
	const prices = await pxcPrice.find();
	const priceLength = await prices.length;
	const currentPrice = await prices[priceLength - 1];
	const lastPrice = await prices[priceLength - 2];
	res.status(200).json({
		success: true,
		prices,
		currentPrice,
		lastPrice,
	});
});

//get last pxc price
exports.getLastpxcPrice = catchAsyncErrors(async (req, res, next) => {
	const pxcPrices = await pxcPrice.find();
	const priceLength = pxcPrices.length;
	const lastPrice = pxcPrices[priceLength - 1];
	res.status(200).json({
		success: true,
		lastPrice,
	});
});

// get pxc price data by date
exports.getpxcPriceByDate = catchAsyncErrors(async (req, res, next) => {
	const pxcPrice = await pxcPrice.findOne({ date: req.params.date });
	if (!pxcPrice) {
		return next(new ErrorHander('No pxc price found with that date', 404));
	}
	res.status(200).json({
		success: true,
		pxcPrice,
	});
});

// get single pxc price
exports.getSinglepxcPrice = catchAsyncErrors(async (req, res, next) => {
	const pxcPrice = await pxcPrice.findById(req.params.id);
	if (!pxcPrice) {
		return next(new ErrorHander('No pxc price found with that id', 404));
	}
	res.status(200).json({
		success: true,
		pxcPrice,
	});
});

// send pxc
exports.sendpxc = catchAsyncErrors(async (req, res, next) => {
	const sender = await User.findById(req.user._id);
	const { recipientId, amount } = req.body;
	const recipient = await User.findOne({ customer_id: recipientId });
	if (!recipient) {
		return next(new ErrorHander('No user found with that id', 404));
	}

	const numAmount = Number(amount);

	const fee = amount * 0.005;

	const netAmount = Number(numAmount + fee);
	// console.log(netAmount);

	// check if sender has enough balance
	if (sender.balance < netAmount) {
		return next(new ErrorHander('Insufficient balance', 404));
	}
	const pxcPrices = await pxcPrice.find();
	const priceLength = pxcPrices.length;
	const lastPrice = pxcPrices[priceLength - 1];
	const pxc = numAmount / lastPrice.price;
	const pxcRecipient = numAmount / lastPrice.price;

	// update sender balance
	sender.balance = sender.balance - netAmount;
	sender.pxc_balance = sender.pxc_balance - pxc;
	await sender.save();
	createTransaction(
		sender._id,
		'cashOut',
		netAmount,
		'Send pxc',
		`Send pxc To ${recipient.name}`,
		lastPrice.price
	);

	if (sender.is_merchant) {
		const profit = numAmount * 0.05;
		// get merchant
		const merchant = await Merchant.findById(sender.merchant_id);
		// update merchant balance
		merchant.merchant_profit += profit;
		merchant.total_send_amount += numAmount;
		await merchant.save();
		// user
		const pxcProfit = profit / lastPrice.price;
		sender.balance += profit;
		sender.pxc_balance += pxcProfit;
		createTransaction(
			sender,
			'cashIn',
			profit,
			'Merchant Profit',
			`Receive Merchant Profit From ${recipient.name}`,
			lastPrice.price
		);
		await sender.save();
	}
	// update recipient balance
	recipient.balance = recipient.balance + numAmount;
	recipient.pxc_balance = recipient.pxc_balance + pxcRecipient;
	await recipient.save();
	createTransaction(
		recipient._id,
		'cashIn',
		numAmount,
		'Receive pxc',
		`Receive pxc From ${sender.name}`,
		lastPrice.price
	);

	res.status(200).json({
		success: true,
		message: 'pxc sent successfully',
	});
});
