const express = require('express');
const multer = require('multer');
const {
	newWithdrawRequest,
	userWithdrawRequests,
	updateCompanyWithdrawBalance,
	allWithdrawRequests,
} = require('../controllers/withdrawController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();
const upload = multer({});

router
	.route('/new/withdraw')
	.post(upload.none(), isAuthenticatedUser, newWithdrawRequest);
// user withdraw requests
router.route('/user/withdraws').get(isAuthenticatedUser, userWithdrawRequests);

// update company withdraw balance
router.route('/update/company/withdraw').put(updateCompanyWithdrawBalance);

// get all withdraw requests for admin
router
	.route('/admin/withdraws')
	.get(isAuthenticatedUser, authorizeRoles('admin'), allWithdrawRequests);

module.exports = router;
