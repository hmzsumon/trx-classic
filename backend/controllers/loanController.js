const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const companyId = process.env.COMPANY_ID;
const createTransaction = require('../utils/tnx');
const Loan = require('../models/loanModel');
const PXCPrice = require('./../models/pxcPrice');

const {
	sendEmail,
	sendMe,
	sendVerificationEmail,
} = require('../utils/sendEmail');

// new Loan Request
exports.newLoanRequest = catchAsyncErrors(async (req, res, next) => {
	const userId = req.user.id;
	const user = await User.findById(userId);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	// check if user has any pending loan request
	const pendingLoan = await Loan.findOne({
		user_id: userId,
		status: 'pending',
	});
	if (pendingLoan) {
		return next(new ErrorHander('You have a pending loan request', 400));
	}
	// check user PXC balance is greater than 250
	if (user.balance < 250) {
		return next(
			new ErrorHander(
				'You need at least 250$ PXC Balance to request a loan',
				400
			)
		);
	}
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}

	// find PXC price and last price
	const PXCPrices = await PXCPrice.find();
	let priceLength = PXCPrices.length;
	const currentPrice = await PXCPrices[priceLength - 1].price;

	if (!currentPrice) {
		return next(new ErrorHander('PXC Price not found', 404));
	}

	const PXC = 250 / currentPrice;

	const { personalInfo, address1, address2 } = req.body;
	const { fullName, fatherName, motherName, phone, email, occupation, nid } =
		personalInfo;
	const { addressLine1, country, addressLine2, city, state, zip } = address1;
	const {
		addressLine1: addressLine1_2,
		addressLine2: addressLine2_2,
		country: country_2,
		city: city_2,
		state: state_2,
		zip: zip_2,
	} = address2;

	const loan = await Loan.create({
		user_id: userId,
		name: fullName,
		father_name: fatherName,
		mother_name: motherName,
		phone,
		email,
		occupation,
		nid,
		amount: 1000,
		present_address: {
			address_line1: addressLine1,
			address_line2: addressLine2,
			country,
			city,
			state,
			zip,
		},
		permanent_address: {
			address_line1: addressLine1_2,
			address_line2: addressLine2_2,
			country: country_2,
			city: city_2,
			state: state_2,
			zip: zip_2,
		},
	});

	// update user PXC balance
	user.balance = user.balance - 250;
	user.PXC_balance = user.PXC_balance - PXC;
	user.is_loan_request = true;
	createTransaction(userId, 'cashOut', 250, 'Loan Request', 'Loan Request');
	await user.save();

	// update company
	company.loan.pending_request += 1;
	await company.save();

	res.status(200).json({
		success: true,
		message: 'Loan Request',
	});
});

// get all loan requests
exports.getAllLoanRequests = catchAsyncErrors(async (req, res, next) => {
	const loans = await Loan.find();
	res.status(200).json({
		success: true,
		loans,
	});
});

// get single loan request
exports.getSingleLoanRequest = catchAsyncErrors(async (req, res, next) => {
	const loan = await Loan.findById(req.params.id);
	if (!loan) {
		return next(new ErrorHander('Loan not found', 404));
	}
	res.status(200).json({
		success: true,
		loan,
	});
});

// approve loan request
exports.approveLoanRequest = catchAsyncErrors(async (req, res, next) => {
	//find admin
	const admin = await User.findById(req.user.id);
	if (!admin) {
		return next(new ErrorHander('Admin not found', 404));
	}
	// find loan
	const loan = await Loan.findById(req.params.id);
	if (!loan) {
		return next(new ErrorHander('Loan not found', 404));
	}
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}

	// find user
	const user = await User.findById(loan.user_id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// loan end date calculation
	const loanEndDate = new Date();
	loanEndDate.setMonth(loanEndDate.getMonth() + 12);

	// update loan status
	loan.status = 'approved';
	loan.approved_by.user_id = admin._id;
	loan.approved_by.name = admin.name;
	loan.loan_approved_at = Date.now();
	loan.loan_start_at = Date.now();
	loan.loan_end_at = loanEndDate;
	loan.loan_duration = 12;
	await loan.save();

	// update company
	company.loan.pending_request -= 1;
	company.loan.total_loan_amount += loan.amount;
	company.loan.total_loan_count += 1;
	await company.save();

	// update user
	user.is_loan_request = false;
	user.is_loan = true;
	user.loan_balance += loan.amount;
	await user.save();

	// send email to user
	const message = `Your loan request has been approved. You can now use your loan amount from mining.`;
	sendEmail({
		email: user.email,
		subject: 'Loan Request Approved',
		message,
	});

	res.status(200).json({
		success: true,
		message: 'Loan Request Approved',
	});
});

// reject loan request
exports.rejectLoanRequest = catchAsyncErrors(async (req, res, next) => {
	// find admin
	const admin = await User.findById(req.user.id);
	if (!admin) {
		return next(new ErrorHander('Admin not found', 404));
	}

	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}

	// find loan
	const loan = await Loan.findById(req.params.id);
	if (!loan) {
		return next(new ErrorHander('Loan not found', 404));
	}

	// find user
	const user = await User.findById(loan.user_id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// find PXC price and last price
	const PXCPrices = await PXCPrice.find();
	if (!PXCPrices) {
		return next(new ErrorHander('PXC price not found', 404));
	}
	let priceLength = PXCPrices.length;
	const currentPrice = await PXCPrices[priceLength - 1].price;
	const PXC = 250 / currentPrice;

	// update loan status
	loan.status = 'rejected';
	loan.loan_rejected_at = Date.now();
	loan.reason = req.body.reason;
	await loan.save();

	// update user
	user.is_loan_request = false;
	user.balance = user.balance + 250;
	user.PXC_balance = user.PXC_balance + PXC;
	createTransaction(
		user._id,
		'cashIn',
		250,
		'Loan Request Rejected',
		'Loan Request Rejected'
	);
	await user.save();

	// update company
	company.loan.pending_request -= 1;
	await company.save();

	// send email to user
	const message = `Your loan request has been rejected. Please contact with support team.`;
	sendEmail({
		email: user.email,
		subject: 'Loan Request Rejected',
		message,
	});

	res.status(200).json({
		success: true,
		message: 'Loan Request Rejected',
	});
});
