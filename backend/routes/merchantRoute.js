const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
	newMerchant,
	getAllMerchant,
	getMerchant,
	approveMerchant,
	cancelMerchant,
} = require('../controllers/merchantController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const upload = multer({});
// new merchant request
router.route('/new-merchant').post(isAuthenticatedUser, newMerchant);

// get all merchants only admin
router
	.route('/all-merchants')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getAllMerchant);

// get merchant by id
router.route('/merchant/:id').get(isAuthenticatedUser, getMerchant);

// approve merchant
router
	.route('/approve-merchant/:id')
	.put(isAuthenticatedUser, authorizeRoles('admin'), approveMerchant);

// cancel merchant
router
	.route('/cancel-merchant')
	.put(
		upload.none(),
		isAuthenticatedUser,
		authorizeRoles('admin'),
		cancelMerchant
	);

module.exports = router;
