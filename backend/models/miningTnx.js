const mongoose = require('mongoose');

const miningTnxSchema = new mongoose.Schema(
	{
		amount: {
			type: Number,
			default: 0,
		},
		total_amount: {
			type: Number,
			default: 0,
		},
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		miningId: {
			type: mongoose.Types.ObjectId,
			ref: 'Mining',
		},
		miningTnxType: {
			type: String,
			enum: [
				'deposit',
				'withdraw',
				'transfer',
				'referral',
				'reward',
				'bonus',
				'other',
				'refund',
				'charge',
				'payout',
				'payout_failed',
				'convert',
				'send',
			],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('MiningTnx', miningTnxSchema);
