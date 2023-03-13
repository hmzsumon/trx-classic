const mongoose = require('mongoose');

const PXCPriceSchema = new mongoose.Schema(
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

module.exports = mongoose.model('PXCPrice', PXCPriceSchema);
