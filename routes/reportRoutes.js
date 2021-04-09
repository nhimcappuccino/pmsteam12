const express = require('express');
const router = express.Router();
const reportController = require('./../controllers/reportController');

router.get('/generalReport/:period/:from?/:to?', reportController.getGeneralReport);
module.exports = router;