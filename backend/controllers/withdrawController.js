const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const createTransaction = require('../utils/tnx');
const Mining = require('../models/miningModel');
const WithdrawDetails = require('../models/withdrawDetailsModel');
const Usdx = require('../models/usdxModel');
const Company = require('../models/companyModel');
const companyId = process.env.COMPANY_ID;
const Notification = require('../models/notificationModel');

const {
	sendEmail,
	sendMe,
	sendVerificationEmail,
} = require('../utils/sendEmail');
const PXCPrice = require('./../models/PXC_price');
const Withdraw = require('../models/withdraw');
const {
	realtimebidding,
} = require('googleapis/build/src/apis/realtimebidding');
const { find } = require('../models/userModel');

// create withdrawal request for mining
exports.withdraw_with_mining = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// find mining
	const mining = await Mining.findOne({ mining_user: req.user._id });
	if (!mining) {
		return next(new ErrorHander('Mining not found', 404));
	}

	let miningBalance = mining.mining_profit;

	const { amount, account_number } = req.body;
	if (amount < 30) {
		return next(new ErrorHander('Minimum withdraw amount is $30', 400));
	}
	const numAmount = Number(amount);
	const charge = numAmount * 0.025;
	const totalAmount = numAmount + charge;

	if (miningBalance < totalAmount) {
		return next(new ErrorHander('Insufficient balance', 400));
	}

	const withdrawalRequest = await Withdraw.create({
		user_id: user._id,
		userName: user.name,
		account_number: account_number,
		amount: numAmount,
		charge: charge,
		status: 'pending',
	});

	// update user balance

	mining.mining_profit -= totalAmount;
	createTransaction(
		user._id,
		'cashOut',
		totalAmount,
		'withdraw',
		'Withdraw request'
	);
	await mining.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
		message: 'Withdraw request created',
		withdrawalRequest,
	});
});

// =====================================
// create withdraw request for usdx
exports.withdraw = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// user is verified or not
	if (!user.is_identity_verified) {
		return next(new ErrorHander('Only verified accounts can withdraw', 400));
	}

	// company find by company id
	const company = await Company.findById(companyId);

	// check if company is_withdraw is true or not
	if (!company.withdraw.is_withdraw) {
		return next(new ErrorHander('Withdraw is not available', 400));
	}

	// check if user has pending withdraw request or not
	const pendingWithdraw = await Withdraw.findOne({
		user_id: req.user._id,
		status: 'pending',
	});

	if (pendingWithdraw) {
		return next(new ErrorHander('You have pending withdraw request', 400));
	}

	const usdx = await Usdx.findOne({ user_id: req.user._id });
	if (!usdx) {
		return next(new ErrorHander('Usdx not found', 404));
	}

	// find withdraw details
	const withdrawDetails = await WithdrawDetails.findOne({
		user_id: req.user._id,
	});

	if (!withdrawDetails) {
		// create withdraw details
		await WithdrawDetails.create({
			user_id: req.user._id,
			name: user.name,
			w_balance: usdx.usdx_balance,
		});
	}

	const {
		method,
		amount,
		crypto_name,
		wallet_address,
		bank_name,
		branch_name,
		swift_code,
		account_name,
		account_number,
	} = req.body;
	const numAmount = Number(amount);
	let charge = 0;

	// withdraw with crypto
	if (method === 'crypto') {
		charge = 5;
		// check if amount is less than charge + numAmount
		if (usdx.usdx_balance < charge + numAmount) {
			return next(new ErrorHander('Insufficient balance', 400));
		}
		// create withdraw request
		await Withdraw.create({
			user_id: user._id,
			email: user.email,
			name: user.name,
			amount: numAmount,
			charge: charge,
			method: method,
			crypto: {
				crypto_name: crypto_name,
				wallet_address: wallet_address,
			},
			status: 'pending',
		});

		// update usdx balance
		usdx.usdx_balance -= charge + numAmount;
		await usdx.save({ validateBeforeSave: false });

		// update withdraw details
		withdrawDetails.w_balance -= charge + numAmount;
		await withdrawDetails.save({ validateBeforeSave: false });

		// update user balance
		user.w_balance -= charge + numAmount;
		await user.save({ validateBeforeSave: false });

		// create transaction
		createTransaction(
			user._id,
			'cashOut',
			charge + numAmount,
			'withdraw',
			'Withdraw request'
		);
	}

	// withdraw with bank
	if (method === 'bank') {
		charge = 15;

		// check if amount is less than charge + numAmount
		if (usdx.usdx_balance < charge + numAmount) {
			return next(new ErrorHander('Insufficient balance', 400));
		}

		// create withdraw request
		await Withdraw.create({
			user_id: user._id,
			email: user.email,
			name: user.name,
			amount: numAmount,
			charge: charge,
			method: method,
			bank: {
				bank_name: bank_name,
				branch_name: branch_name,
				swift_code: swift_code,
				account_name: account_name,
				account_number: account_number,
			},
			status: 'pending',
		});

		// update usdx balance
		usdx.usdx_balance -= charge + numAmount;
		await usdx.save({ validateBeforeSave: false });

		// update withdraw details
		withdrawDetails.w_balance -= charge + numAmount;
		await withdrawDetails.save({ validateBeforeSave: false });

		// update user balance
		user.w_balance -= charge + numAmount;
		await user.save({ validateBeforeSave: false });

		// create transaction
		createTransaction(
			user._id,
			'cashOut',
			charge + numAmount,
			'withdraw',
			'Withdraw request'
		);
	}

	// update company withdraw details
	company.withdraw.new_withdraw += 1;
	company.withdraw.pending_withdraw_count += 1;
	company.withdraw.pending_withdraw_amount += numAmount;
	await company.save({ validateBeforeSave: false });

	// create notification
	await Notification.create({
		user_id: user._id,
		type: 'withdraw',
		title: 'Withdraw request',
		message: `Your withdraw request with amount ${numAmount} USD is pending`,
	});

	// send email to company email
	sendEmail({
		email: company.email,
		subject: 'New withdraw request',
		message: `You have new withdraw request from ${user.name} with amount ${numAmount} USD`,
	});

	//

	res.status(200).json({
		success: true,
		message: 'Withdraw request created',
	});
});

// get logged in user withdraw request
exports.getWithdrawRequest = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	const withdraws = await Withdraw.find({ user_id: user._id });
	res.status(200).json({
		success: true,
		withdraws,
	});
});

/*==========================================
 get all withdraw request for admin    
=============================================*/
// gat all withdraw request
exports.getAllWithdrawRequest = catchAsyncErrors(async (req, res, next) => {
	const withdraws = await Withdraw.find();
	res.status(200).json({
		success: true,
		withdraws,
	});
});

/*==========================================
 get all approved withdraw request  
=============================================*/
exports.getAllApprovedWithdraw = catchAsyncErrors(async (req, res, next) => {
	const withdraws = await Withdraw.find({ status: 'approved' });
	res.status(200).json({
		success: true,
		withdraws,
	});
});

// update withdraw request
exports.updateWithdrawRequest = catchAsyncErrors(async (req, res, next) => {
	const withdraw = await Withdraw.findById(req.params.id);
	if (!withdraw) {
		return next(new ErrorHander('Withdraw not found', 404));
	}

	const { status } = req.body;
	if (status === 'approved') {
		withdraw.status = 'approved';
	}

	if (status === 'cancelled') {
		withdraw.status = 'rejected';
	}
	withdraw.status = status;
	await withdraw.save();

	res.status(200).json({
		success: true,
		message: 'Withdraw status updated successfully',
	});
});

// approve pending withdraw request
exports.approvePendingWithdrawRequest = catchAsyncErrors(
	async (req, res, next) => {
		const withdraw = await Withdraw.findById(req.params.id);
		if (!withdraw) {
			return next(new ErrorHander('Withdraw not found', 404));
		}

		withdraw.status = 'approved';
		await withdraw.save();

		res.status(200).json({
			success: true,
			message: 'Withdraw status updated successfully',
		});
	}
);

// cancel pending withdraw request
exports.cancelPendingWithdrawRequest = catchAsyncErrors(
	async (req, res, next) => {
		const withdraw = await Withdraw.findById(req.params.id);

		if (!withdraw) {
			return next(new ErrorHander('Withdraw not found', 404));
		}
		if (withdraw.status === 'cancelled') {
			return next(new ErrorHander('Withdraw already cancelled', 400));
		}
		withdraw.status = 'cancelled';
		await withdraw.save();

		const user = await User.findOne({ _id: withdraw.user_id });
		if (!user) {
			return next(new ErrorHander('User not found', 404));
		}

		// find mining
		const mining = await Mining.findOne({ mining_user: user._id });
		if (!mining) {
			return next(new ErrorHander('Mining not found', 404));
		}

		let { amount, charge } = withdraw;
		mining.mining_profit += amount + charge;
		createTransaction(
			user._id,
			'cashIn',
			amount,
			'withdraw',
			'Withdraw Cancel'
		);
		await mining.save({ validateBeforeSave: false });

		res.status(200).json({
			success: true,
			message: 'Withdraw cancel successfully',
		});
	}
);

// update all user with balance

exports.updateAllUsersWithBalance = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	users.forEach(async (user) => {
		user.withdrawal_balance = user.balance * 0.1;
		await user.save();
	});

	res.status(200).json({
		success: true,
		message: 'All users balance updated successfully',
	});
});

// update single user with balance
exports.updateSingleUserWithBalance = catchAsyncErrors(
	async (req, res, next) => {
		const user = await User.findById(req.params.id);

		if (!user) {
			return next(
				new ErrorHander(`User does not exist with Id: ${req.params.id}`)
			);
		}

		user.withdrawal_balance = (user.balance * 0.1).toFixed(2);
		await user.save();

		res.status(200).json({
			success: true,
			message: 'User balance updated successfully',
		});
	}
);

// create withdraw Details for all user
exports.createWithdrawDetails = catchAsyncErrors(async (req, res) => {
	const users = await User.find().select('-resetPasswordToken');
	for (let i = 0; i < users.length; i++) {
		const user = users[i];

		// console.log('user', user);
		// get Usdx by user_id

		const usdx = await Usdx.findOne({ user_id: user._id }).select(
			'usdx_balance'
		);
		if (!usdx) {
			continue;
		}

		const ex_withdrawDetails = await WithdrawDetails.findOne({
			user_id: user._id,
		});

		if (ex_withdrawDetails) {
			continue;
		}

		await WithdrawDetails.create({
			user_id: user._id,
			name: user.name,
			w_balance: usdx.usdx_balance,
		});

		// update user with balance
		user.w_balance = usdx.usdx_balance;
		await user.save();
	}

	res.status(200).json({
		success: true,
		message: 'testing Ok',
		users,
	});
});

// if user has no withdraw details create one
exports.createWithdrawDetailsForSingleUser = catchAsyncErrors(
	async (req, res, next) => {
		const user = await User.findById(req.user._id);
		if (!user) {
			return next(new ErrorHander('User not found', 404));
		}

		const ex_withdrawDetails = await WithdrawDetails.findOne({
			user_id: user._id,
		});

		if (ex_withdrawDetails) {
			return next(new ErrorHander('Withdraw details already exist', 400));
		}

		// get Usdx by user_id
		const usdx = await Usdx.findOne({ user_id: user._id }).select(
			'usdx_balance'
		);
		if (!usdx) {
			return next(new ErrorHander('Usdx not found', 404));
		}

		await WithdrawDetails.create({
			user_id: user._id,
			name: user.name,
			w_balance: usdx.usdx_balance,
		});

		// update user with balance
		user.w_balance = usdx.usdx_balance;
		await user.save();

		res.status(200).json({
			success: true,
			message: 'Withdraw details created successfully',
		});
	}
);
/*==========================================
 get a single withdraw by id    
=============================================*/

exports.getSingleWithdraw = catchAsyncErrors(async (req, res, next) => {
	const withdraw = await Withdraw.findById(req.params.id);
	if (!withdraw) {
		return next(new ErrorHander('Withdraw not found', 404));
	}
	// get withdraw details
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

/*==========================================
 approve withdraw     
=============================================*/

exports.approveWithdraw = catchAsyncErrors(async (req, res, next) => {
	const { id, cryptoName, cryptoAddress, cryptoTnxId } = req.body;

	//admin
	const admin = await User.findById(req.user._id);
	if (!admin) {
		return next(new ErrorHander('Admin not found', 404));
	}
	// get withdraw by id
	const withdraw = await Withdraw.findById(id);
	if (!withdraw) {
		return next(new ErrorHander('Withdraw not found', 404));
	}

	// get withdraw details
	const withdrawDetails = await WithdrawDetails.findOne({
		user_id: withdraw.user_id,
	});

	if (!withdrawDetails) {
		return next(new ErrorHander('Withdraw details not found', 404));
	}

	// get user
	const user = await User.findById(withdraw.user_id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// company find by company id
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}

	// update withdraw
	withdraw.status = 'approved';
	withdraw.approved_crypto.crypto_name = cryptoName;
	withdraw.approved_crypto.wallet_address = cryptoAddress;
	withdraw.approved_crypto.tnx_id = cryptoTnxId;
	withdraw.approved_by = admin._id;
	withdraw.approved_at = Date.now();
	withdraw.is_approved = true;
	await withdraw.save();

	// update withdraw details
	withdrawDetails.total_withdraw += withdraw.amount;
	withdrawDetails.last_withdraw_amount = withdraw.amount;
	withdrawDetails.last_withdraw_date = Date.now();
	await withdrawDetails.save();

	// update company withdraw
	company.withdraw.totalWithdraw += withdraw.amount;
	company.withdraw.totalWithdrawCount += 1;
	company.withdraw.todayWithdraw += withdraw.amount;
	company.withdraw.total_w_charge += withdraw.charge;
	company.withdraw.pending_withdraw_count -= 1;
	company.withdraw.pending_withdraw_amount -= withdraw.amount;
	company.withdraw.todayWithdrawCount += 1;
	await company.save();

	// send email to user
	const message = `Your withdraw request of ${withdraw.amount} has been approved. Please check your withdraw details for more information.`;

	sendEmail({
		email: user.email,
		subject: 'Withdraw Approved',
		message,
	});

	// send email to admin
	const adminMessage = `Withdraw request of ${withdraw.amount} has been approved by ${admin.name}. Please check withdraw details for more information.`;

	sendEmail({
		email: company.email,
		subject: 'Withdraw Approved',
		message: adminMessage,
	});

	// create notification
	await Notification.create({
		user_id: user._id,
		type: 'withdraw',
		title: 'Withdraw Approved',
		message,
	});

	res.status(200).json({
		success: true,
		message: 'Withdraw approved successfully',
	});
});

/*=======================
// cancel withdraw
========================= */
exports.cancelWithdraw = catchAsyncErrors(async (req, res, next) => {
	const { id, reason } = req.body;

	//admin
	const admin = await User.findById(req.user._id);
	if (!admin) {
		return next(new ErrorHander('Admin not found', 404));
	}
	// get withdraw by id
	const withdraw = await Withdraw.findById(id);
	if (!withdraw) {
		return next(new ErrorHander('Withdraw not found', 404));
	}

	// get usdx
	const usdx = await Usdx.findOne({ user_id: withdraw.user_id });
	if (!usdx) {
		return next(new ErrorHander('Usdx not found', 404));
	}

	// get withdraw details
	const withdrawDetails = await WithdrawDetails.findOne({
		user_id: withdraw.user_id,
	});

	if (!withdrawDetails) {
		return next(new ErrorHander('Withdraw details not found', 404));
	}

	// get user
	const user = await User.findById(withdraw.user_id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// company find by company id
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}

	// update withdraw
	withdraw.status = 'cancelled';
	withdraw.cancelled_by = admin._id;
	withdraw.cancelled_at = Date.now();
	withdraw.is_cancelled = true;
	withdraw.cancelled_reason = reason;
	withdraw.comment = reason;
	await withdraw.save();

	// update usdx
	usdx.usdx_balance += withdraw.amount + withdraw.charge;
	// create transaction
	createTransaction(
		user._id,
		'cashIn',
		withdraw.amount + withdraw.charge,
		'withdraw cancelled',
		`Withdraw cancelled for ${reason}.`
	);
	await usdx.save();

	// update withdraw details
	withdrawDetails.last_cancel_withdraw_date = Date.now();
	withdrawDetails.last_cancel_withdraw_amount = withdraw.amount;
	withdrawDetails.total_cancel_withdraw += withdraw.amount;
	await withdrawDetails.save();

	// update company withdraw
	company.withdraw.pending_withdraw_count -= 1;
	company.withdraw.pending_withdraw_amount -= withdraw.amount;
	company.withdraw.total_c_w_amount += withdraw.amount;
	await company.save();

	// send email to user
	const message = `Your withdraw request of ${withdraw.amount} has been cancelled for ${reason}. Please check your withdraw details for more information.`;

	sendEmail({
		email: user.email,
		subject: 'Withdraw Cancelled',
		message,
	});

	// send email to admin
	const adminMessage = `Withdraw request of ${withdraw.amount} has been cancelled by ${admin.name}. Please check withdraw details for more information.`;

	sendEmail({
		email: company.email,
		subject: 'Withdraw Cancelled',
		message: adminMessage,
	});

	// create notification
	await Notification.create({
		user_id: user._id,
		title: 'Withdraw Cancelled',
		message,
	});

	res.status(200).json({
		success: true,
		message: 'Withdraw cancelled successfully',
	});
});
