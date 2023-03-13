const Note = require('../models/noteModel');
const ErrorHander = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create Note
exports.creatNote = catchAsyncErrors(async (req, res, next) => {
	req.body.user = req.user.id;

	const note = await Note.create(req.body);

	res.status(201).json({
		success: true,
		note,
	});
});

// Get All Notes
exports.getAllNotes = catchAsyncErrors(async (req, res, next) => {
	const notes = await Note.find().populate('user', 'name email');
	res.status(200).json({
		success: true,
		notes,
	});
});

// get logged in user  Notes
exports.myNotes = catchAsyncErrors(async (req, res, next) => {
	const notes = await Note.find({ user: req.user._id });
	const totalNotes = notes.length;

	res.status(200).json({
		success: true,
		notes,
		totalNotes,
	});
});

// Get Single Note
exports.getSingleNote = catchAsyncErrors(async (req, res, next) => {
	const note = await Note.findById(req.params.id);

	if (!note) {
		return next(new ErrorHander('Note not found', 404));
	}

	res.status(200).json({
		success: true,
		note,
	});
});

// Update Note
exports.updateNote = catchAsyncErrors(async (req, res, next) => {
	let note = await Note.findById(req.params.id);

	if (!note) {
		return next(new ErrorHander('Note not found', 404));
	}

	note = await Note.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		note,
	});
});

// Delete Note
exports.deleteNote = catchAsyncErrors(async (req, res, next) => {
	const note = await Note.findById(req.params.id);

	if (!note) {
		return next(new ErrorHander('Product not found', 404));
	}

	await note.remove();

	res.status(200).json({
		success: true,
		message: 'Note Delete Successfully',
	});
});
