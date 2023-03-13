const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const merchantSchema = new Schema(
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
		merchant_name: {
			type: String,
		},
		merchant_email: {
			type: String,
		},
		merchant_phone: {
			type: String,
		},
		address: {
			type: String,
		},
		city: {
			type: String,
		},
		state: {
			type: String,
		},
		country: {
			type: String,
		},
		zip: {
			type: String,
		},
		status: {
			type: String,
			default: 'pending',
		},
		is_approved: {
			type: Boolean,
			default: false,
		},
		approved_at: {
			type: Date,
		},
		merchant_profit: {
			type: Number,
			default: 0,
		},
		total_send_amount: {
			type: Number,
			default: 0,
		},
		total_receive_amount: {
			type: Number,
			default: 0,
		},
		reason: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Merchant', merchantSchema);
