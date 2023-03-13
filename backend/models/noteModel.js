const mongoose = require('mongoose');
const User = require('../models/userModel');

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Note', noteSchema);
