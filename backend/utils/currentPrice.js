const PXCPrice = require('../models/PXC_price');

const getCurrentPrice = async () => {
	try {
		const currentPrice = await PXCPrice.find().sort({ _id: -1 }).limit(1);
		// console.log(currentPrice[0].price);
		return currentPrice[0].price;
	} catch (error) {
		console.log(error);
	}
};

module.exports = getCurrentPrice;
