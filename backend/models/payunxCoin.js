const mongoose = require('mongoose');

const payunxCoinSchema = new mongoose.Schema(
	{
		price: {
			type: mongoose.Types.Decimal128,
			default: 0.0,
		},
		oldPrice: {
			type: mongoose.Types.Decimal128,
			dates: [],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('PayunxCoin', payunxCoinSchema);
