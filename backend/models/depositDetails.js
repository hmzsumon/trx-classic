const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const depositDetailsSchema = new Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		total_deposit: {
			type: Number,
			default: 0,
		},
		last_deposit: {
			type: Number,
			default: 0,
		},
		total_cancel_deposit: {
			type: Number,
			default: 0,
		},
		last_deposit_date: {
			type: Date,
		},
		deposit_ids: [],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('DepositDetails', depositDetailsSchema);
