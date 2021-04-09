const express = require('express');
const authController = require('../controllers/authController');
const Employee = require('../controllers/employeeController');
const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/getAllEmployees', Employee.getAllEmployees);
router.get('/getEmployeesBy/:keywords?/:department?', Employee.getEmployeesBy);
router.get('/getEmployeeDetail/:id', Employee.getEmployeeDetail);
module.exports = router;