const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please Enter product Name'],
		trim: true,
	},
	description: {
		type: String,
		required: [true, 'Please Enter product Description'],
	},
	price: {
		type: Number,
		required: [true, 'Please Enter product Price'],
		maxLength: [8, 'Price cannot exceed 8 characters'],
	},

	category: {
		type: String,
		trim: true,
	},
	noteLimit: {
		type: Number,
		required: [true, 'Please Enter product Stock'],
		maxLength: [4, 'Stock cannot exceed 4 characters'],
		default: 0,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
