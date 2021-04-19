const express = require('express');
const authController = require('../controllers/authController');
const Employee = require('../controllers/employeeController');
const router = express.Router();
const multer = require('multer');


router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/getAllEmployees', Employee.getAllEmployees);
router.get('/getEmployeesBy/:keywords?/:department?', Employee.getEmployeesBy);
router.get('/getEmployeeDetail/:id', Employee.getEmployeeDetail);
router.get('/getAllManagers', Employee.getAllManagers);
router.post('/createNewEmployee', Employee.createNewEmployee);
router.patch('/updateEmployeeInformation/:id', Employee.updateEmployeeInformation);
router.patch('/updateEmployeePhotoName/:id', Employee.uploadEmployeePhoto, Employee.updateEmployeePhotoName);
module.exports = router;