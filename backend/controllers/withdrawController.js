const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const createTransaction = require('../utils/tnx');
const WithdrawDetails = require('../models/withdrawDetailsModel');
const Company = require('../models/companyModel');
const companyId = process.env.COMPANY_ID;
const sendEmail = require('../utils/sendEmail');
const Withdraw = require('../models/withdraw');
const getPrice = require('../utils/getPrice');

// Create new withdraw request
exports.newWithdrawRequest = catchAsyncErrors(async (req, res, next) => {
	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}
	const { amount, wallet, address } = req.body;
	const numAmount = Number(amount);
	const lastPrice = await getPrice();
	const usd = numAmount * lastPrice;

	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// find withdraw details if not found create new
	let withdrawDetails = await WithdrawDetails.findOne({ user_id: req.user.id });
	if (!withdrawDetails) {
		withdrawDetails = await WithdrawDetails.create({
			user_id: req.user.id,
			name: user.name,
			email: user.email,
		});
	}

	// check if user has enough balance
	if (user.pxc_balance < amount) {
		return next(new ErrorHander('Insufficient balance', 400));
	}

	// check if user has enough balance
	if (user.pxc_balance < usd) {
		return next(new ErrorHander('Insufficient balance', 400));
	}

	// create withdraw request
	const withdraw = await Withdraw.create({
		user_id: req.user.id,
		email: user.email,
		name: user.name,
		amount: numAmount,
		wallet,
		address,
	});

	// update user balance
	user.pxc_balance = user.pxc_balance - numAmount;
	user.balance = user.balance - usd;
	createTransaction(
		user._id,
		'cashOut',
		numAmount,
		'withdraw',
		'New withdraw request'
	);
	await user.save();
	// update company withdraw balance
	company.withdraw.new_withdraw += 1;
	company.withdraw.pending_withdraw_count += 1;
	company.withdraw.pending_withdraw_amount += numAmount;
	await company.save();

	res.status(200).json({
		success: true,
		message: 'Withdraw request created successfully',
	});
});

// logged in user withdraw requests
exports.userWithdrawRequests = catchAsyncErrors(async (req, res, next) => {
	const withdraws = await Withdraw.find({ user_id: req.user.id });
	res.status(200).json({
		success: true,
		withdraws,
	});
});

// get all withdraw requests for admin
exports.allWithdrawRequests = catchAsyncErrors(async (req, res, next) => {
	const withdraws = await Withdraw.find({});
	res.status(200).json({
		success: true,
		withdraws,
	});
});

// update company withdraw balance
exports.updateCompanyWithdrawBalance = catchAsyncErrors(
	async (req, res, next) => {
		const company = await Company.findById(companyId);
		if (!company) {
			return next(new ErrorHander('Company not found', 404));
		}
		// find all pending withdraws
		const withdraws = await Withdraw.find({ status: 'pending' });
		if (!withdraws) {
			return next(new ErrorHander('Withdraws not found', 404));
		}
		for (let i = 0; i < withdraws.length; i++) {
			const withdraw = withdraws[i];
			// update company withdraw balance
			company.withdraw.new_withdraw += 1;
			company.withdraw.pending_withdraw_count += 1;
			company.withdraw.pending_withdraw_amount += withdraw.amount;
			await company.save();
		}

		res.status(200).json({
			success: true,
			message: 'Company withdraw balance updated successfully',
		});
	}
);
