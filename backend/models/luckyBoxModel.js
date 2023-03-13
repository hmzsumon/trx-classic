const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const luckyBoxSchema = new Schema(
	{
		luckyUser: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		luckyMan: {
			type: String,
		},
		ticketId: {
			type: Schema.Types.ObjectId,
			ref: 'Ticket',
			required: true,
		},
		luckyAmount: {
			type: Number,
			required: true,
			default: 0,
		},
		openDate: {
			type: Date,
		},
		status: {
			type: String,
			enum: ['open', 'pending', 'cancelled', 'expired'],
			default: 'pending',
		},
		isOpen: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const LuckyBox = mongoose.model('LuckyBox', luckyBoxSchema);
module.exports = LuckyBox;
