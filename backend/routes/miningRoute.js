const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
	createMining,
	getLoggedInUserMining,
	getSpecificMining,
	activeMining,
	startMining,
	updateMining,
	sendMiningBalance,
	removeMiningId,
	getAllInvestments,
	convertMiningToCredits,
	convertMiningBalanceToPXC,
} = require('../controllers/miningsController');
const { isAuthenticatedUser } = require('../middleware/auth');

const upload = multer({});

// create a mining
router.post('/mining', upload.none(), isAuthenticatedUser, createMining);

// get a mining
router.get('/mining/me', isAuthenticatedUser, getLoggedInUserMining);

// get specific mining
router.get('/mining/:id', isAuthenticatedUser, getSpecificMining);

// activate the mining
router.put('/mining/activate/:id', isAuthenticatedUser, activeMining);

// start mining
router.post('/mining/start', upload.none(), isAuthenticatedUser, startMining);

// update profit
router.put('/mining/update-profit', isAuthenticatedUser, updateMining);

// send mining balance
router.put(
	'/mining/send-balance',
	upload.none(),
	isAuthenticatedUser,
	sendMiningBalance
);

// remove mining
router.put('/mining/remove', isAuthenticatedUser, removeMiningId);

// convert mining to credits
router.put(
	'/mining/convert',
	upload.none(),
	isAuthenticatedUser,
	convertMiningToCredits
);

// convert mining balance to PXC coin
router.put(
	'/mining/convert-balance',
	upload.none(),
	isAuthenticatedUser,
	convertMiningBalanceToPXC
);

module.exports = router;
