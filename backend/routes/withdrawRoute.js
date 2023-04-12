const express = require('express');
const multer = require('multer');
const {
	newWithdrawRequest,
	userWithdrawRequests,
} = require('../controllers/withdrawController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();
const upload = multer({});

router
	.route('/new/withdraw')
	.post(upload.none(), isAuthenticatedUser, newWithdrawRequest);

router.route('/user/withdraws').get(isAuthenticatedUser, userWithdrawRequests);

module.exports = router;
