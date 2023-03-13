const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const companyId = process.env.COMPANY_ID;

// create company
exports.createCompany = catchAsyncErrors(async (req, res, next) => {
	await Company.create({
		name: 'Paynx Coin',
		email: 'payunxgetway@gmail.com',
		phone: '+13369157846',
		address: '26th Street,New York, NY',
		city: 'New York',
		state: 'NY',
		zipCode: '10001',

		about:
			'Paynx Coin is a cryptocurrency that is used to pay for services on the Paynx platform.',
		website: 'https://paynxcoin.com',
		companyLogo: 'https://paynxcoin.com/images/logo.png',
	});
	res.status(201).json({
		success: true,
		message: 'Company created successfully',
	});
});

// get company
exports.getCompanyAdmin = catchAsyncErrors(async (req, res, next) => {
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}
	res.status(200).json({
		success: true,
		company,
	});
});

// clear dailyWork todayWorkUsers
exports.clearDailyWorkTodayWorkUsers = catchAsyncErrors(
	async (req, res, next) => {
		const company = await Company.findById(companyId);
		if (!company) {
			return next(new ErrorHander('No company found', 404));
		}

		company.update({ $set: { 'dailyWork.todayWorkUsers': [] } });
		res.status(200).json({
			success: true,
			message: 'Company updated',
		});
	}
);
