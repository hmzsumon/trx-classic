const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drawSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		winners: [
			{
				ticket_number: {
					type: Number,
				},
				winner_name: {
					type: String,
				},
				position: {
					type: Number,
				},
				result: {
					type: String,
				},
				prize: {
					type: Number,
				},
			},
		],
		drawDate: {
			type: Date,
			default: Date.now,
		},
		total_tickets: {
			type: Number,
			default: 0,
		},
		total_winners: {
			type: Number,
			default: 0,
		},
		losers: {
			type: Number,
			default: 0,
		},
		total_prize: {
			type: Number,
		},

		profit: {
			type: Number,
		},
		prizes: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
);

const Draw = mongoose.model('Draw', drawSchema);
module.exports = Draw;
