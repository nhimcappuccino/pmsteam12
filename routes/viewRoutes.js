const express = require('express');
const router = express.Router();
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const employeeController = require('./../controllers/employeeController');

router.get('/', viewController.getIndex);
router.get('/dashboard', authController.roleCheck, viewController.getDashboard);
router.get('/projects', viewController.getProject);
router.get('/employees', authController.roleCheck, viewController.getEmployeeManagement);
router.get('/addEmployees', authController.roleCheck, viewController.addEmployees);
module.exports = router;