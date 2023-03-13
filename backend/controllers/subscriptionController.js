const Subscription = require('../models/subscriptionModel');
const ErrorHander = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create Subscription  -- Admin
exports.createSubscription = catchAsyncErrors(async (req, res, next) => {
	req.body.user = req.user.id;
	const subscription = await Subscription.create(req.body);

	res.status(201).json({
		success: true,
		subscription,
	});
});

// Get All Subscription
exports.getAllSubscription = catchAsyncErrors(async (req, res, next) => {
	const subscriptions = await Subscription.find();

	res.status(200).json({
		success: true,
		subscriptions,
	});
});

// Get Subscription  Details
exports.subscriptionDetails = catchAsyncErrors(async (req, res, next) => {
	const subscription = await Subscription.findById(req.params.id);

	if (!subscription) {
		return next(new ErrorHander('Subscription not found', 404));
	}

	res.status(200).json({
		success: true,
		subscription,
	});
});

// Update Subscription -- Admin

exports.updateSubscription = catchAsyncErrors(async (req, res, next) => {
	let subscription = await Subscription.findById(req.params.id);

	if (!subscription) {
		return next(new ErrorHander('Subscription not found', 404));
	}

	subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		subscription,
	});
});

// Delete Subscription

exports.deleteSubscription = catchAsyncErrors(async (req, res, next) => {
	const subscription = await Subscription.findByIdAndDelete(req.params.id);

	if (!subscription) {
		return next(new ErrorHander('Subscription not found', 404));
	}

	await subscription.remove();

	res.status(200).json({
		success: true,
		message: 'Subscription Delete Successfully',
	});
});
