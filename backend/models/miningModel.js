// Minings mode
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const miningSchema = new Schema(
	{
		mining_id: {
			type: String,
		},
		user_name: {
			type: String,
		},
		mining_balance: {
			type: Number,
			default: 0,
		},
		mining_investment: {
			type: Number,
			default: 0,
			_v: false,
		},
		mining_revenue: {
			type: Number,
			default: 0,
		},
		mining_profit: {
			type: Number,
			default: 0,
		},
		mining_profit_percent: {
			type: Number,
			default: 0,
		},
		mining_profit_percent_last: {
			type: Number,
			default: 0,
		},
		mining_status: {
			type: String,
			default: 'inactive',
		},
		mining_startAt: {
			type: Date,
		},
		mining_endAt: {
			type: Date,
		},
		mining_user: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
		mining_coin: {
			type: Schema.Types.ObjectId,
			ref: 'coins',
		},
		mining_package: {
			name: {
				type: String,
			},
			price: {
				type: Number,
			},
		},
		wallet: {
			type: String,
		},
		isStart: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Mining', miningSchema);
