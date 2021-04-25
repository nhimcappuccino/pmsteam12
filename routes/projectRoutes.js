const express = require('express');
const authController = require('../controllers/authController');
const Project = require('../controllers/projectController');
const router = express.Router();

router.get('/getAllActiveProjects', Project.getAllActiveProjects);
router.get('/getAllCompletedProjects', Project.getAllCompletedProjects);
router.get('/getAllOtherProjects', Project.getAllOtherProjects);
router.get('/getProjectDetail/:id', Project.getProjectDetail);
router.get('/getAllTasks/:id', Project.getAllTasks);
router.post('/createNewProject', Project.createNewProject);
router.post('/createNewMilestone', Project.createNewMilestone);
router.post('/createNewTask', Project.createNewTask);
router.post('/createNewExpense', Project.createNewExpense);
router.patch('/updateTasksInfomation/:id/:status', Project.updateTasksInfomation);
router.delete('/removeMilestoneById/:id', Project.removeMilestoneById);
router.delete('/deactivateProject/:id', Project.deactivateProject);
module.exports = router;