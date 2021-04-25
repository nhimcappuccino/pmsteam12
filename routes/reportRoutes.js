const express = require('express');
const router = express.Router();
const reportController = require('./../controllers/reportController');

router.get('/generalReport/:period/:from?/:to?', reportController.getGeneralReport);
router.post('/getReportByProject', reportController.getReportByProject);
router.post('/getReportByEmployee', reportController.getReportByEmployee);
router.post('/getReportByExpense', reportController.getReportByExpense);
module.exports = router;