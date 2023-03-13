const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bitcoinTransactionSchema = new Schema(
	{
		amount: {
			type: Number,
			default: 0,
		},
		fee: {
			type: Number,
		},
		totalAmount: {
			type: Number,
		},
		sender_Id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		senderMinId: {
			type: String,
		},
		recipientMinId: {
			type: String,
		},
		transactionFee: {
			type: Number,
			default: 0,
		},

		transactionType: {
			type: String,
			enum: ['deposit', 'withdraw', 'transfer', 'receive', 'send', 'convert'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('BitcoinTransaction', bitcoinTransactionSchema);
