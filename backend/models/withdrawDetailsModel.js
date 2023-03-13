const mongoose = require('mongoose');

const withdrawDetailsSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
		name: {
			type: String,
		},
		w_balance: {
			type: Number,
			default: 0,
		},
		total_withdraw: {
			type: Number,
			default: 0,
		},
		last_withdraw_amount: {
			type: Number,
			default: 0,
		},
		total_cancel_withdraw: {
			type: Number,
			default: 0,
		},
		last_cancel_withdraw_amount: {
			type: Number,
			default: 0,
		},

		last_cancel_withdraw_date: {
			type: Date,
		},
		last_withdraw_date: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('WithdrawDetails', withdrawDetailsSchema);
