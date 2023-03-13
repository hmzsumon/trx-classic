const PXCPrice = require('../models/PXC_price');
const User = require('../models/userModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const createTransaction = require('../utils/tnx');
const Merchant = require('../models/merchantModel');

// create a PXC price
exports.createPXCPrice = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();
	const newPXCPrice = new PXCPrice({
		price: req.body.price,
	});
	const PXCPrice = await newPXCPrice.save();

	users.forEach(async (user) => {
		if (user.balance === 0) {
			return;
		}
		user.balance = user.PXC_balance * PXCPrice.price;
		await user.save();
	});

	res.status(201).json({
		success: true,
		PXCPrice,
	});
});

// get all PXC prices by date
exports.getAllPXCPrices = catchAsyncErrors(async (req, res, next) => {
	const prices = await PXCPrice.find();
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

//get last PXC price
exports.getLastPXCPrice = catchAsyncErrors(async (req, res, next) => {
	const PXCPrices = await PXCPrice.find();
	const priceLength = PXCPrices.length;
	const lastPrice = PXCPrices[priceLength - 1];
	res.status(200).json({
		success: true,
		lastPrice,
	});
});

// get PXC price data by date
exports.getPXCPriceByDate = catchAsyncErrors(async (req, res, next) => {
	const PXCPrice = await PXCPrice.findOne({ date: req.params.date });
	if (!PXCPrice) {
		return next(new ErrorHander('No PXC price found with that date', 404));
	}
	res.status(200).json({
		success: true,
		PXCPrice,
	});
});

// get single PXC price
exports.getSinglePXCPrice = catchAsyncErrors(async (req, res, next) => {
	const PXCPrice = await PXCPrice.findById(req.params.id);
	if (!PXCPrice) {
		return next(new ErrorHander('No PXC price found with that id', 404));
	}
	res.status(200).json({
		success: true,
		PXCPrice,
	});
});

// send PXC
exports.sendPXC = catchAsyncErrors(async (req, res, next) => {
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
	const PXCPrices = await PXCPrice.find();
	const priceLength = PXCPrices.length;
	const lastPrice = PXCPrices[priceLength - 1];
	const PXC = numAmount / lastPrice.price;
	const PXCRecipient = numAmount / lastPrice.price;

	// update sender balance
	sender.balance = sender.balance - netAmount;
	sender.PXC_balance = sender.PXC_balance - PXC;
	await sender.save();
	createTransaction(
		sender._id,
		'cashOut',
		netAmount,
		'Send PXC',
		`Send PXC To ${recipient.name}`,
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
		const PXCProfit = profit / lastPrice.price;
		sender.balance += profit;
		sender.PXC_balance += PXCProfit;
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
	recipient.PXC_balance = recipient.PXC_balance + PXCRecipient;
	await recipient.save();
	createTransaction(
		recipient._id,
		'cashIn',
		numAmount,
		'Receive PXC',
		`Receive PXC From ${sender.name}`,
		lastPrice.price
	);

	res.status(200).json({
		success: true,
		message: 'PXC sent successfully',
	});
});
