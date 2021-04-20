const express = require('express');
const router = express.Router();
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const employeeController = require('./../controllers/employeeController');

router.get('/', viewController.getIndex);
router.get('/dashboard', authController.roleCheck, viewController.getDashboard);
router.get('/projects', viewController.getProject);
<<<<<<< HEAD
router.get('/employees', authController.roleCheck, viewController.getEmployeeManagement);
router.get('/addEmployees', authController.roleCheck, viewController.addEmployees);
=======
router.get('/employees', viewController.getEmployeeManagement);
router.get('/addEmployees', viewController.addEmployees);
router.get('/statistics', viewController.getStatistics);
>>>>>>> f3b5e130813222c4c954ed9132772e5cd1fe19d4
module.exports = router;