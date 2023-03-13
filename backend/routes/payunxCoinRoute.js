const express = require('express');
const multer = require('multer');
const {
	createCoin,
	getAllCoins,
	getCoin,
	updateCoin,
	deleteCoin,
} = require('../controllers/payunxCounController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

const upload = multer({});

router.get('/coins', isAuthenticatedUser, getAllCoins);
router.get('/coins/:id', isAuthenticatedUser, getCoin);
router.put(
	'/coins/update/:id',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	updateCoin
);
router.delete(
	'/coins/delete/:id',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	deleteCoin
);

router.post(
	'/coin/new',
	upload.none(),
	isAuthenticatedUser,
	authorizeRoles('admin'),
	createCoin
);

module.exports = router;
