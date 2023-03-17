const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({});

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const {
	createShare,
	buyShare,
	getShareDetails,
} = require('../controllers/shareController');

// create a new share
router.route('/share').post(
	upload.none(),
	isAuthenticatedUser,
	// authorizeRoles('admin'),
	createShare
);

// buy a share
router.route('/share/buy').post(upload.none(), isAuthenticatedUser, buyShare);

// get share details
router.route('/share/details').get(isAuthenticatedUser, getShareDetails);

module.exports = router;
