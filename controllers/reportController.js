const catchAsync = require('./../utils/catchAsync');
const config = require('./../dbconfig');
const sql = require('mssql');

function resolveDates(date) {
    if (date.length === 7) {
        return date.substring(0, 2) + '/' + date.substring(2, 3) + '/' + date.substring(3, date.length);
    }
    else {
        return date.substring(0, 2) + '/' + date.substring(2, 4) + '/' + date.substring(4, date.length);
    }
};

exports.getGeneralReport = catchAsync(async (req, res, next) => {
    let pool = await sql.connect(config);
    const activeEmployees = await pool.request().query(`SELECT COUNT(*) FROM employees WHERE Employee_Status ='Employed'`);
    const totalProject = await pool.request().query(`SELECT COUNT(*) FROM projects WHERE projects.Project_Status_ID = 2`);
    const tasksInprogress = await pool.request().query(`SELECT COUNT(*) FROM tasks WHERE tasks.Task_Status='Processing'`);
    const totalCost = await pool.request().query(`SELECT SUM(projects.Money_spent) FROM projects `);
    let todayReport = new Object();
    todayReport.activeEmployees = activeEmployees.recordsets[0];
    todayReport.totalProject = totalProject.recordsets[0];
    todayReport.tasksInprogress = tasksInprogress.recordsets[0];
    todayReport.totalCost = totalCost.recordsets[0];
    res.status(200).json({
        status: 'Sucess',
        todayReport
    });
});

