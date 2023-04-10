const Price = require('./../models/pxcPrice');

const getPrice = () => {
	return new Promise((resolve, reject) => {
		Price.findOne()
			.sort({ createdAt: -1 })
			.then((price) => {
				resolve(price.price);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

module.exports = getPrice;
