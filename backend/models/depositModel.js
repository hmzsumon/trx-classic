const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		username: {
			type: String,
		},
		customerId: {
			type: String,
		},
		amount: {
			type: Number,
			required: [true, 'Amount is required'],
		},

		transactionId: {
			type: String,
			unique: [true, 'Transaction ID is already in use'],
			required: [true, 'Transaction ID is required'],
		},
		walletName: {
			type: String,
		},
		walletAddress: {
			type: String,
		},
		status: {
			type: String,
			enum: ['pending', 'success', 'rejected', 'cancelled'],
			default: 'pending',
		},
		paidAt: {
			type: Date,
			default: Date.now,
		},
		reason: {
			type: String,
		},
		confirmedAt: {
			type: Date,
		},
		canceledAt: {
			type: Date,
		},
		update_by: {
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			name: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Deposit', depositSchema);
