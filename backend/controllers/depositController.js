const Deposit = require('../models/depositModel');
const User = require('../models/userModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const PXCPrice = require('./../models/pxcPrice');
const createTransaction = require('../utils/tnx');
const Company = require('../models/companyModel');
const companyId = process.env.COMPANY_ID;
const DepositDetails = require('../models/depositDetails');
const {
	sendEmail,
	sendMe,
	sendVerificationEmail,
} = require('../utils/sendEmail');

// Create a new deposit
exports.createDeposit = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// company find by company id
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}

	// find DepositDetails
	const depositDetails = await DepositDetails.findOne({ userId: req.user.id });
	if (!depositDetails) {
		// create new deposit details
		await DepositDetails.create({
			user_id: req.user.id,
			name: user.name,
			email: user.email,
		});
	}

	// console.log(req.body);
	const { amount, transactionId, walletName, walletAddress } = req.body;

	// amount to number
	const numAmount = Number(amount);

	// unique transactionId
	const isTransactionIdExist = await Deposit.findOne({ transactionId });
	if (isTransactionIdExist) {
		return next(new ErrorHander('Transaction ID is already in use', 400));
	}
	const newDeposit = await Deposit.create({
		userId: req.user.id,
		username: user.name,
		customerId: user.customerId,
		transactionId,
		amount,
		walletName,
		walletAddress,
	});

	// update company balance
	company.deposit.new_deposit_amount += numAmount;
	company.deposit.new_deposit_count += 1;
	await company.save();

	sendEmail({
		email: user.email,
		subject: 'Request for Deposit',
		message: `Dear ${user.name},\n\nYour request for deposit has been received. We will process your request as soon as possible.\n\nThank you for choosing us.\n\nRegards,\n${company.name}`,
	});

	res.status(201).json({
		success: true,
		deposit: newDeposit,
	});
});

// Get all deposits
exports.getAllDeposits = catchAsyncErrors(async (req, res, next) => {
	const deposits = await Deposit.find();
	res.status(200).json({
		success: true,
		deposits,
	});
});

// Get a single deposit
exports.getSingleDeposit = catchAsyncErrors(async (req, res, next) => {
	const deposit = await Deposit.findById(req.params.id);
	if (!deposit) {
		return next(new ErrorHander('No deposit found with that ID', 404));
	}
	res.status(200).json({
		success: true,
		deposit,
	});
});

// Update a single deposit
exports.updateDeposit = catchAsyncErrors(async (req, res, next) => {
	const deposit = await Deposit.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!deposit) {
		return next(new ErrorHander('No deposit found with that ID', 404));
	}
	res.status(200).json({
		success: true,
		deposit,
	});
});

// get logged in user's deposits
exports.getUserDeposits = catchAsyncErrors(async (req, res, next) => {
	const deposits = await Deposit.find({ userId: req.user._id });
	res.status(200).json({
		success: true,
		deposits,
	});
});

// delete a single deposit
exports.deleteDeposit = catchAsyncErrors(async (req, res, next) => {
	const deposit = await Deposit.findByIdAndDelete(req.params.id);
	if (!deposit) {
		return next(new ErrorHander('No deposit found with that ID', 404));
	}
	res.status(204).json({
		success: true,
	});
});

// confirm a single deposit
exports.approveDeposit = catchAsyncErrors(async (req, res, next) => {
	const admin = await User.findById(req.user.id);
	if (!admin) {
		return next(new ErrorHander('Admin not found', 404));
	}

	const deposit = await Deposit.findById(req.params.id);
	if (!deposit) {
		return next(new ErrorHander('No deposit found with that ID', 404));
	}
	// check if deposit is already approved
	if (deposit.status === 'success') {
		return next(new ErrorHander('Deposit already approved', 400));
	}
	const PXCPrices = await PXCPrice.find();
	if (!PXCPrices) {
		return next(new ErrorHander('No PXC price found', 404));
	}
	let priceLength = PXCPrices.length;
	const currentPrice = await PXCPrices[priceLength - 1].price;

	// find user
	const user = await User.findById(deposit.userId);
	if (!user) {
		return next(new ErrorHander('No user found with that ID', 404));
	}

	// find deposit details
	const depositDetails = await DepositDetails.findOne({ user_id: user._id });
	if (!depositDetails) {
		return next(new ErrorHander('No deposit details found with that ID', 404));
	}

	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('No company found with that ID', 404));
	}

	deposit.status = 'success';
	deposit.confirmedAt = Date.now();
	await deposit.save();
	user.balance = user.balance + deposit.amount;
	createTransaction(
		user._id,
		'cashIn',
		deposit.amount,
		'deposit',
		'Approved Deposit'
	);
	let PXC = deposit.amount / currentPrice;
	user.PXC_balance = user.PXC_balance + PXC;
	deposit.update_by.id = admin._id;
	deposit.update_by.name = admin.name;
	await user.save();

	// update deposit details
	depositDetails.total_deposit += deposit.amount;
	depositDetails.last_deposit += deposit.amount;
	depositDetails.last_deposit_date = Date.now();
	depositDetails.deposit_ids.push(deposit._id);
	await depositDetails.save();

	// update company balance
	company.deposit.totalDepositAmount += deposit.amount;
	company.deposit.totalDepositCount += 1;
	company.deposit.todayDepositAmount += deposit.amount;
	company.deposit.todayDepositCount += 1;
	company.deposit.new_deposit_amount -= deposit.amount;
	company.deposit.new_deposit_count -= 1;
	await company.save();

	// send email to user
	sendEmail({
		email: user.email,
		subject: 'Deposit Approved',
		message: `Dear ${user.name},\n\nYour deposit of ${deposit.amount} has been approved. Your account has been credited with ${deposit.amount}.\n\nThank you for choosing us.\n\nRegards,\n${company.name}`,
	});
	// send email to admin
	sendEmail({
		email: 'hmzwork22@gmail.com',
		subject: 'Deposit Approved',
		message: `Dear Admin,\n\n${user.name} has made a deposit of ${deposit.amount}. His account has been credited with ${deposit.amount}.\n\nRegards,\n${company.name}`,
	});
	res.status(200).json({
		success: true,
		amount: deposit.amount,
	});
});

// cancel a single deposit
exports.cancelDeposit = catchAsyncErrors(async (req, res, next) => {
	const admin = await User.findById(req.user.id);
	if (!admin) {
		return next(new ErrorHander('Admin not found', 404));
	}
	const deposit = await Deposit.findById(req.body.id);
	if (!deposit) {
		return next(new ErrorHander('No deposit found with that ID', 404));
	}
	// check if deposit is already cancelled
	if (deposit.status === 'cancelled') {
		return next(new ErrorHander('Deposit already cancelled', 400));
	}
	// find user
	const user = await User.findById(deposit.userId);
	if (!user) {
		return next(new ErrorHander('No user found with that ID', 404));
	}

	// find deposit details
	const depositDetails = await DepositDetails.findOne({ user_id: user._id });
	if (!depositDetails) {
		return next(new ErrorHander('No deposit details found with that ID', 404));
	}

	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('No company found with that ID', 404));
	}

	deposit.status = 'cancelled';
	deposit.cancelledAt = Date.now();
	deposit.reason = req.body.reason;
	deposit.update_by.id = admin._id;
	deposit.update_by.name = admin.name;
	await deposit.save();

	// update deposit details
	depositDetails.total_cancel_deposit += deposit.amount;
	await depositDetails.save();

	// update company balance
	company.deposit.new_deposit_amount -= deposit.amount;
	company.deposit.new_deposit_count -= 1;
	company.deposit.total_cancel_deposit += deposit.amount;
	await company.save();

	// send email to user
	sendEmail({
		email: user.email,
		subject: 'Deposit Cancelled',
		message: `Dear ${user.name},\n\nYour deposit of ${deposit.amount} has been cancelled. Your account has not been credited with ${deposit.amount}.\n\nReason: ${deposit.reason}\n\nThank you for choosing us.\n\nRegards,\n${company.name}`,
	});

	res.status(200).json({
		success: true,
	});
});

// delete all pending deposits
exports.deleteAllPendingDeposits = catchAsyncErrors(async (req, res, next) => {
	const pendingDeposits = await Deposit.find({ status: 'pending' });
	if (pendingDeposits.length === 0) {
		return next(new ErrorHander('No pending deposits found', 404));
	}
	for (let i = 0; i < pendingDeposits.length; i++) {
		await pendingDeposits[i].remove();
	}
	res.status(200).json({
		success: true,
	});
});
