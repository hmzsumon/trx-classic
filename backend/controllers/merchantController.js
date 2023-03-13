const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const companyId = process.env.COMPANY_ID;
const createTransaction = require('../utils/tnx');
const Loan = require('../models/loanModel');
const pxcPrice = require('./../models/pxcPrice');
const Merchant = require('../models/merchantModel');

const {
	sendEmail,
	sendMe,
	sendVerificationEmail,
} = require('../utils/sendEmail');

// new merchant request
exports.newMerchant = catchAsyncErrors(async (req, res, next) => {
	// find user
	const user = await User.findById(req.user.id).select('-password');
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	// check user.is_identity_verified
	if (!user.is_identity_verified) {
		return next(new ErrorHander(' User is not Verified', 404));
	}
	// check if user is already merchant
	if (user.is_merchant) {
		return next(new ErrorHander('User is already a merchant', 400));
	}
	// create new merchant
	// check user has enough balance
	if (user.balance < 500) {
		return next(new ErrorHander('Not enough balance', 400));
	}

	// find company
	const company = await Company.findById(companyId).select('-password');
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}

	const {
		merchant_name,
		merchant_email,
		merchant_phone,
		address,
		country,
		city,
		state,
		zip,
	} = req.body;

	console.log(req.body);

	// create new merchant
	const merchant = await Merchant.create({
		user_id: user._id,
		name: user.name,
		email: user.email,
		merchant_name,
		merchant_email,
		merchant_phone,
		address,
		country,
		city,
		state,
		zip,
	});

	// update user
	user.merchant_request = true;
	await user.save();

	// update company merchant options
	company.merchant.pending_request += 1;
	await company.save();

	res.status(201).json({
		status: true,
		message: 'Merchant created successfully',
	});
});

// get all merchant requests for admin
exports.getAllMerchant = catchAsyncErrors(async (req, res, next) => {
	const merchants = await Merchant.find();
	if (merchants.length < 0) {
		return next(new ErrorHander('Merchant not found', 404));
	}
	res.status(200).json({
		status: true,
		message: 'Merchant requests fetched successfully',
		merchants,
	});
});

// get a single merchant by id
exports.getMerchant = catchAsyncErrors(async (req, res, next) => {
	const merchant = await Merchant.findById(req.params.id);
	if (!merchant) {
		return next(new ErrorHander('Merchant not found', 404));
	}
	res.status(200).json({
		status: true,
		message: 'Merchant fetched successfully',
		merchant,
	});
});

// approved merchant by admin
exports.approveMerchant = catchAsyncErrors(async (req, res, next) => {
	const merchant = await Merchant.findById(req.params.id);
	if (!merchant) {
		return next(new ErrorHander('Merchant not found', 404));
	}
	// check if user is already approved
	if (merchant.approved) {
		return next(new ErrorHander('Merchant already approved', 400));
	}
	// find user by merchant user_id
	const user = await User.findById(merchant.user_id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	// check if user has enough balance
	if (!user) {
		return next(new ErrorHander('User Nor Found', 400));
	}
	// find company
	const company = await Company.findById(companyId).select('-password');
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}

	// update user
	merchant.status = 'approved';
	merchant.approved_at = Date.now();
	merchant.is_approved = true;
	await merchant.save();

	// update user
	user.merchant_request = false;
	user.is_merchant = true;
	user.merchant_id = merchant._id;
	await user.save();

	// update company merchant options
	company.merchant.total_merchant += 1;
	company.merchant.pending_request -= 1;
	await company.save();

	res.status(200).json({
		status: true,
		message: 'Merchant approved successfully',
	});
});

// cancel a single merchant
exports.cancelMerchant = catchAsyncErrors(async (req, res, next) => {
	const merchant = await Merchant.findById(req.body.id);
	if (!merchant) {
		return next(new ErrorHander('Merchant not found', 404));
	}
	// check if user is already approved
	if (merchant.approved) {
		return next(new ErrorHander('Merchant already approved', 400));
	}
	// find user by merchant user_id
	const user = await User.findById(merchant.user_id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	// check if user has enough balance
	if (!user) {
		return next(new ErrorHander('User Nor Found', 400));
	}
	// find company
	const company = await Company.findById(companyId).select('-password');
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}

	// update user
	merchant.status = 'cancelled';
	merchant.reason = req.body.reason;
	await merchant.save();

	// update user
	user.merchant_request = false;
	await user.save();

	// update company merchant options
	company.merchant.pending_request -= 1;
	await company.save();

	res.status(200).json({
		status: true,
		message: 'Merchant approved successfully',
	});
});
