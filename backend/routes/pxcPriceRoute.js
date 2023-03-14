const express = require('express');

const multer = require('multer');

const router = express.Router();
const {
	createPrice,
	getAllPrices,
	getSinglepxcPrice,
	getLastpxcPrice,
	sendpxc,
} = require('../controllers/priceController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const upload = multer({});

router.post('/create-price', upload.none(), createPrice);

router.get('/pxc-prices', getAllPrices);
router.get('/pxc-price/last', getLastpxcPrice);
router.get('/pxc-price/:id', getSinglepxcPrice);

router.post(
	'/send/pxc',
	upload.none(),
	isAuthenticatedUser,
	authorizeRoles('user'),
	sendpxc
);

module.exports = router;
