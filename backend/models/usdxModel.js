const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usdxSchema = new Schema(
	{
		usdx_id: {
			type: String,
		},
		user_name: {
			type: String,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
		usdx_balance: {
			type: Number,
			default: 0,
		},
		usdx_coin: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Usdx', usdxSchema);
