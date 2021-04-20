const express = require('express');
const authController = require('../controllers/authController');
const Customer = require('../controllers/customerController');
const router = express.Router();



router.get('/getAllCustomers', Customer.getAllCustomers);


module.exports = router;