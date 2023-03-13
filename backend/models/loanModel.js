const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		nid: {
			type: String,
		},
		occupation: {
			type: String,
		},
		father_name: {
			type: String,
		},
		mother_name: {
			type: String,
		},
		present_address: {
			address_line1: {
				type: String,
			},
			address_line2: {
				type: String,
			},
			country: {
				type: String,
			},
			city: {
				type: String,
			},
			state: {
				type: String,
			},
			zip: {
				type: String,
			},
		},
		permanent_address: {
			address_line1: {
				type: String,
			},
			address_line2: {
				type: String,
			},
			country: {
				type: String,
			},
			city: {
				type: String,
			},
			state: {
				type: String,
			},
			zip: {
				type: String,
			},
		},
		status: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
		approved_by: {
			user_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			name: {
				type: String,
			},
		},
		loan_start_at: {
			type: Date,
		},
		loan_end_at: {
			type: Date,
		},
		loan_duration: {
			type: Number,
		},
		loan_approved_at: {
			type: Date,
		},
		loan_rejected_at: {
			type: Date,
		},
		remaining_amount: {
			type: Number,
			default: 0,
		},
		reason: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Loan', loanSchema);
