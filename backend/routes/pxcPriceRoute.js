const express = require('express');

const multer = require('multer');

const router = express.Router();
const {
	createpxcPrice,
	getAllpxcPrices,
	getSinglepxcPrice,
	getLastpxcPrice,
	sendpxc,
} = require('../controllers/pxcPriceController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const upload = multer({});

router.post('/pxc-price', upload.none(), createpxcPrice);
router.get('/pxc-prices', getAllpxcPrices);
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
