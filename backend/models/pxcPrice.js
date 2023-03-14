const mongoose = require('mongoose');

const pxcPriceSchema = new mongoose.Schema(
	{
		price: {
			type: Number,
			default: 0.0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Price', pxcPriceSchema);
