const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shareSchema = new Schema(
	{
		title: {
			type: String,
		},
		share_price: {
			type: Number,
		},
		profit: {
			type: Number,
			default: 0,
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
		},
		is_active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

const Share = mongoose.model('Share', shareSchema);
module.exports = Share;
