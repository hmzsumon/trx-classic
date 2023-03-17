const User = require('../models/userModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Share = require('../models/shareModel');
const ShareDetails = require('../models/shareDetails');
const Price = require('./../models/pxcPrice');
const createTransaction = require('../utils/tnx');

// Create a new share
exports.createShare = catchAsyncErrors(async (req, res, next) => {
	const { title, share_price } = req.body;

	const newShare = await Share.create({
		title,
		share_price,
	});

	res.status(201).json({
		success: true,
		message: 'Share created successfully',
		share: newShare,
	});
});

// buy a share
exports.buyShare = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	const { qty } = req.body;
	const numQty = Number(qty);

	// find is_active share
	const share = await Share.findOne({ is_active: true });
	if (!share) {
		return next(new ErrorHander('Share not found', 404));
	}

	const pxcPrices = await Price.find();
	if (!pxcPrices) {
		return next(new ErrorHander('No pxc price found', 404));
	}
	let priceLength = pxcPrices.length;
	const currentPrice = await pxcPrices[priceLength - 1].price;

	// check if user has enough balance
	if (user.balance < numQty * share.share_price) {
		return next(new ErrorHander('Insufficient balance', 400));
	}

	const pxcAmount = (numQty * share.share_price) / currentPrice;

	// update user balance
	user.balance = user.balance - numQty * share.share_price;
	user.pxc_balance = user.pxc_balance - pxcAmount;
	createTransaction(
		user._id,
		'cashOut',
		numQty * share.share_price,
		'share',
		`Share bought for ${numQty * share.share_price} and ${pxcAmount} trxc`
	);
	await user.save();

	// find share details
	const shareDetails = await ShareDetails.findOne({ user_id: req.user.id });
	// if share details not found then create new share details
	if (!shareDetails) {
		const newShareDetails = await ShareDetails.create({
			user_id: req.user.id,
			email: user.email,
			name: user.name,
			total_shares: numQty,
			total_amount: numQty * share.share_price,
		});

		res.status(201).json({
			success: true,
			message: 'Share bought successfully',
			shareDetails: newShareDetails,
		});
	} else {
		// if share details found then update the share details
		shareDetails.total_shares += numQty;
		shareDetails.total_amount += numQty * share.share_price;
		await shareDetails.save();

		res.status(201).json({
			success: true,
			message: 'Share bought successfully',
			shareDetails,
		});
	}
});

// get logged in user share details
exports.getShareDetails = catchAsyncErrors(async (req, res, next) => {
	const shareDetails = await ShareDetails.findOne({ user_id: req.user.id });
	if (!shareDetails) {
		return next(new ErrorHander('Share details not found', 404));
	}

	res.status(200).json({
		success: true,
		shareDetails,
	});
});
