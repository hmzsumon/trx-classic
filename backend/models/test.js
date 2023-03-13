const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
	balance: {
		type: Number,
		default: 0.0, // 0.00000000
	},
});

module.exports = mongoose.model('Transaction', transactionSchema);
