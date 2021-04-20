const express = require('express');
const router = express.Router();
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const employeeController = require('./../controllers/employeeController');

router.get('/', viewController.getIndex);
router.get('/dashboard', authController.roleCheck, viewController.getDashboard);
router.get('/projects', viewController.getProject);
router.get('/employees', viewController.getEmployeeManagement);
router.get('/addEmployees', viewController.addEmployees);
router.get('/statistics', viewController.getStatistics);
module.exports = router;