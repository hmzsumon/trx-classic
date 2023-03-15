const express = require('express');
const multer = require('multer');
const {
	startMining,
	getUserTrxcMining,
} = require('../controllers/trxcMiningController');
const router = express.Router();

const upload = multer({});

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// start mining
router.route('/start-trxc/mining').post(isAuthenticatedUser, startMining);

// get logged in user mining
router
	.route('/get-user-trxc-mining')
	.get(isAuthenticatedUser, getUserTrxcMining);

module.exports = router;
