const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		amount: { type: Number, required: true },

		transactionType: {
			type: String,
			enum: ['cashIn', 'cashOut'],
			required: true,
		},
		purpose: { type: String },
		isCashIn: {
			type: Boolean,
			default: false,
		},
		isCashOut: {
			type: Boolean,
			default: false,
		},

		price: { type: Number },

		currency: { type: String, default: 'USD' },
		description: { type: String, default: 'Transaction' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
