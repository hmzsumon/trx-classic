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
		last_price: lastPrice,
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

// get single withdraw request for admin
exports.getSingleWithdrawRequest = catchAsyncErrors(async (req, res, next) => {
	const withdraw = await Withdraw.findById(req.params.id);
	if (!withdraw) {
		return next(new ErrorHander('Withdraw not found', 404));
	}

	// find withdraw details
	const withdrawDetails = await WithdrawDetails.findOne({
		user_id: withdraw.user_id,
	});
	if (!withdrawDetails) {
		return next(new ErrorHander('Withdraw details not found', 404));
	}
	res.status(200).json({
		success: true,
		withdraw,
		withdrawDetails,
	});
});

// approve withdraw request by id
exports.approveWithdrawRequest = catchAsyncErrors(async (req, res, next) => {
	const { id, cryptoName, cryptoAddress, cryptoTnxId } = req.body;
	console.log(req.body);
	// find withdraw request
	const withdraw = await Withdraw.findById(id);
	if (!withdraw) {
		return next(new ErrorHander('Withdraw not found', 404));
	}

	// find withdraw details
	const withdrawDetails = await WithdrawDetails.findOne({
		user_id: withdraw.user_id,
	});
	if (!withdrawDetails) {
		return next(new ErrorHander('Withdraw details not found', 404));
	}

	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}

	// update withdraw request
	withdraw.status = 'approved';
	withdraw.update_by = req.user.id;
	withdraw.approved_at = Date.now();
	withdraw.is_approved = true;
	withdraw.approved_wallet = cryptoName;
	withdraw.approved_wallet_address = cryptoAddress;
	withdraw.approved_tnx_id = cryptoTnxId;
	await withdraw.save();

	// update withdraw details
	withdrawDetails.total_withdraw += withdraw.amount;
	withdrawDetails.last_withdraw_amount = withdraw.amount;
	withdrawDetails.last_withdraw_date = Date.now();
	await withdrawDetails.save();

	// update company withdraw balance
	company.withdraw.totalWithdraw += withdraw.amount;
	company.withdraw.totalWithdrawCount += 1;
	company.withdraw.new_withdraw -= 1;
	company.withdraw.pending_withdraw_count -= 1;
	company.withdraw.pending_withdraw_amount -= withdraw.amount;
	await company.save();

	res.status(200).json({
		success: true,
		message: 'Withdraw request approved successfully',
	});
});

// cancel withdraw request by id
exports.cancelWithdrawRequest = catchAsyncErrors(async (req, res, next) => {
	const { id, reason } = req.body;

	// find withdraw request
	const withdraw = await Withdraw.findById(id);
	if (!withdraw) {
		return next(new ErrorHander('Withdraw not found', 404));
	}

	// find user
	const user = await User.findById(withdraw.user_id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// find withdraw details
	const withdrawDetails = await WithdrawDetails.findOne({
		user_id: withdraw.user_id,
	});
	if (!withdrawDetails) {
		return next(new ErrorHander('Withdraw details not found', 404));
	}

	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}

	// update withdraw request
	withdraw.status = 'cancelled';
	withdraw.update_by = req.user.id;
	withdraw.cancelled_at = Date.now();
	withdraw.is_cancelled = true;
	withdraw.cancelled_reason = reason;
	await withdraw.save();

	// update user balance
	user.pxc_balance = user.pxc_balance + withdraw.amount;
	user.balance = user.balance + withdraw.amount * withdraw.last_price;
	createTransaction(
		user._id,
		'cashIn',
		withdraw.amount,
		'Withdraw Cancelled',
		`Withdraw Cancelled, Amount: TRC${withdraw.amount} and ${
			withdraw.last_price * withdraw.amount
		} USD`
	);
	await user.save();

	// update withdraw details
	withdrawDetails.total_cancel_withdraw += withdraw.amount;
	withdrawDetails.last_cancel_withdraw_amount = withdraw.amount;
	withdrawDetails.last_cancel_withdraw_date = Date.now();
	await withdrawDetails.save();

	// update company withdraw balance
	company.withdraw.new_withdraw -= 1;
	company.withdraw.pending_withdraw_count -= 1;
	company.withdraw.pending_withdraw_amount -= withdraw.amount;
	company.withdraw.total_c_w_amount -= withdraw.amount;
	await company.save();

	res.status(200).json({
		success: true,
		message: 'Withdraw request cancelled successfully',
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

// update all withdraw requests last price
exports.updateAllWithdrawRequestsLastPrice = catchAsyncErrors(
	async (req, res, next) => {
		const lastPrice = await getPrice();
		if (!lastPrice) {
			return next(new ErrorHander('Price not found', 404));
		}

		// find all withdraws
		const withdraws = await Withdraw.find({});
		if (!withdraws) {
			return next(new ErrorHander('Withdraws not found', 404));
		}
		for (let i = 0; i < withdraws.length; i++) {
			const withdraw = withdraws[i];
			withdraw.last_price = lastPrice;
			await withdraw.save();
		}

		res.status(200).json({
			success: true,
			message: 'All withdraw requests last price updated successfully',
		});
	}
);
