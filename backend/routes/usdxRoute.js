const express = require('express');
const multer = require('multer');
const {
	getUsdxDetails,
	createUsdxForUsers,
	sendUsdx,
} = require('../controllers/usdxController');
const router = express.Router();

const upload = multer({});

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// get logged in user usdx details
router.route('/usdx').get(isAuthenticatedUser, getUsdxDetails);

// create all usdx details
router.route('/create/usdx').post(createUsdxForUsers);

// send usdx to another usdx
router.route('/send/usdx').post(upload.none(), isAuthenticatedUser, sendUsdx);

module.exports = router;
