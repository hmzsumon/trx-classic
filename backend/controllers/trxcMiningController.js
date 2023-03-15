const User = require('../models/userModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const TrxcMining = require('../models/trxcMining');
const cron = require('node-cron');

// start mining
exports.startMining = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// check if user has already started mining
	const isMiningStarted = await TrxcMining.findOne({ user_id: req.user.id });
	if (isMiningStarted) {
		return next(new ErrorHander('You have already started mining', 400));
	}

	// create new mining
	const newMining = await TrxcMining.create({
		user_id: req.user.id,
		email: user.email,
		name: user.name,
		start_date: new Date(),
	});

	res.status(200).json({
		success: true,
		message: 'Mining started successfully',
	});
});

// get logged in user mining
exports.getUserTrxcMining = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// check if user has already started mining
	const isMiningStarted = await TrxcMining.findOne({ user_id: req.user.id });
	if (!isMiningStarted) {
		return next(
			new ErrorHander(
				'You have not started mining please start your free mining!  ',
				400
			)
		);
	}

	res.status(200).json({
		success: true,
		trxcMining: isMiningStarted,
	});
});

// cron job to update mining profit every 10 usd in 24 hours
cron
	.schedule('*/1 * * * *', async () => {
		const trxcMining = await TrxcMining.find({ status: 'active' });
		const oneDayProfit = 10;
		const oneHourProfit = oneDayProfit / 24;
		const oneMinuteProfit = oneHourProfit / 60;
		for (let i = 0; i < trxcMining.length; i++) {
			const mining = trxcMining[i];
			mining.profit = mining.profit + oneMinuteProfit;
			await mining.save();

			// console.log(mining.profit, mining.name);
		}
		// console.log(oneMinuteProfit);
	})
	.start();
