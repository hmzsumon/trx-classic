const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shareDetailsSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		email: {
			type: String,
			required: [true, 'Please enter your email'],
		},
		name: {
			type: String,
			trim: true,
		},
		total_shares: {
			type: Number,
			default: 0,
		},
		total_amount: {
			type: Number,
			default: 0,
		},
		profit: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const ShareDetails = mongoose.model('ShareDetails', shareDetailsSchema);
module.exports = ShareDetails;
