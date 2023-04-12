const mongoose = require('mongoose');
const User = require('../models/userModel');
const { stringify } = require('uuid');

const withdrawSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
		email: {
			type: String,
			require: true,
		},
		name: {
			type: String,
			require: true,
		},
		amount: {
			type: Number,
			require: true,
		},
		charge: {
			type: Number,
			require: true,
		},
		wallet: {
			type: String,
		},
		address: {
			type: String,
		},
		status: {
			type: String,
			enum: ['pending', 'failed', 'cancelled', 'approved'],
			default: 'pending',
		},
		// approved
		update_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
		approved_at: {
			type: Date,
		},
		is_approved: {
			type: Boolean,
		},
		cancelled_at: {
			type: Date,
		},
		is_cancelled: {
			type: Boolean,
		},
		cancelled_reason: {
			type: String,
			default: 'Not specified',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Withdraw', withdrawSchema);
