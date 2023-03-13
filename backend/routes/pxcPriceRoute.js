const express = require('express');

const multer = require('multer');

const router = express.Router();
const {
	createPXCPrice,
	getAllPXCPrices,
	getSinglePXCPrice,
	getLastPXCPrice,
	sendPXC,
} = require('../controllers/PXCPriceController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const upload = multer({});

router.post('/PXC-price', upload.none(), createPXCPrice);
router.get('/PXC-prices', getAllPXCPrices);
router.get('/PXC-price/last', getLastPXCPrice);
router.get('/PXC-price/:id', getSinglePXCPrice);

router.post(
	'/send/PXC',
	upload.none(),
	isAuthenticatedUser,
	authorizeRoles('user'),
	sendPXC
);

module.exports = router;
