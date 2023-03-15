const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trxcMiningSchema = new Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
		},

		profit: {
			type: Number,
			default: 0,
		},
		start_date: {
			type: Date,
		},
		end_date: {
			type: Date,
		},
		status: {
			type: String,
			enum: ['active', 'inactive', 'expired'],
			default: 'active',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('TrxcMining', trxcMiningSchema);
