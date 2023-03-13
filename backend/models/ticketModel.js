const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
	{
		serialNumber: {
			type: Number,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		ownerName: {
			type: String,
		},
		status: {
			type: String,
			enum: [
				'sold',
				'pending',
				'success',
				'failed',
				'cancelled',
				'expired',
				'winner',
				'loser',
				'cart',
				'refunded',
				'draw',
			],
		},

		ticketNumber: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		firstPrize: {
			type: Number,
			required: true,
		},
		isSold: {
			type: String,
			enum: ['sold', 'pending', 'draw'],
			default: 'pending',
		},
		isWinner: {
			type: Boolean,
			default: false,
		},
		nextDrawDate: {
			type: Date,
			required: true,
		},
		nextDrawTime: {
			type: String,
			required: true,
		},
		buyDate: {
			type: Date,
		},
		drawDate: {
			type: Date,
		},
		position: {
			type: Number,
			default: 0,
		},
		prize: {
			type: Number,
			default: 0,
		},
		result: {
			type: String,
			default: 'pending',
		},
	},
	{ timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
