const Package = require('../models/packageModel');
const ErrorHander = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// create a package
exports.createPackage = catchAsyncErrors(async (req, res, next) => {
	req.body.user = req.user.id;

	const package = await Package.create(req.body);

	res.status(201).json({
		success: true,
		package,
	});
});
