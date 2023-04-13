const express = require("express");
const router = express.Router();
const {
    getAddressBalance,
    getAddressTransactions
} = require('../controllers/addressController');

// get transaction for specific adress
router.get('/search', getAddressTransactions)

router.get('/balance', getAddressBalance);


module.exports = router