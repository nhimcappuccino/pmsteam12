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

exports.getReportByProject = catchAsync(async (req, res, next) => {
    let sqlGenerateReport = ``;
    if (req.body.From_Date === undefined && req.body.To_Date === undefined && req.body.Specific_Date === undefined) {
        sqlGenerateReport = `SELECT * FROM projects left join milestones on projects.Project_ID = milestones.Project_ID left join tasks on tasks.Project_ID = projects.Project_ID WHERE projects.Project_ID =  ${req.body.ID}`;
    } else if (req.body.Specific_Date !== undefined) {
        sqlGenerateReport = `SELECT * FROM projects left join milestones 
        on projects.Project_ID = milestones.Project_ID left join tasks 
        on tasks.Project_ID = projects.Project_ID 
        WHERE projects.Project_ID = ${req.body.ID}  
        AND (tasks.Last_Updated_At = '${req.body.Specific_Date}' OR tasks.Created_At = '${req.body.Specific_Date}')`;
    } else {
        sqlGenerateReport = `SELECT * FROM projects left join milestones 
        on projects.Project_ID = milestones.Project_ID left join tasks 
        on tasks.Project_ID = projects.Project_ID 
        WHERE projects.Project_ID = ${req.body.ID} 
        AND (tasks.Last_Updated_At between '${req.body.From_Date}' and '${req.body.To_Date}' OR tasks.Created_At between '${req.body.From_Date}' and '${req.body.To_Date}')`;
    };
    let requestReportPerson = `${req.session.username.First_Name} ${req.session.username.Last_Name}`;
    let pool = await sql.connect(config);
    let reportByProject = pool.request().query(sqlGenerateReport).then(response => {
        if (response.rowsAffected[0] >= 1) {
            let reportData = response.recordsets[0];
            res.status(200).json({
                status: 'Success',
                requestReportPerson,
                reportData,
            });
        } else {
            res.status(404).json({
                status: 'Not Found',
                message: 'No record that match the criteria!',
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            status: 'Bad Request',
            message: 'An Error occurred while trying to retrieve data from database!',
        });
    });
});


exports.getReportByEmployee = catchAsync(async (req, res, next) => {
    let sqlGenerateReport = ``;
    if (req.body.From_Date === undefined && req.body.To_Date === undefined && req.body.Specific_Date === undefined) {
        sqlGenerateReport = `SELECT * FROM employees left join time_sheet on employees.Employee_ID = time_sheet.Employee_ID WHERE employees.Employee_ID =  ${req.body.ID}`;
    } else if (req.body.Specific_Date !== undefined) {
        sqlGenerateReport = `SELECT * FROM employees left join time_sheet 
        on employees.Employee_ID = time_sheet.Employee_ID
        WHERE employees.Employee_ID = ${req.body.ID}
        AND (cast(time_sheet.Clock_out as date) = '${req.body.Specific_Date}')`;
    } else {
        sqlGenerateReport = `SELECT * FROM employees left join time_sheet 
        on employees.Employee_ID = time_sheet.Employee_ID
        WHERE employees.Employee_ID = ${req.body.ID}
        AND (time_sheet.Clock_out between '${req.body.From_Date}' and '${req.body.To_Date}')`;
    };
    let requestReportPerson = `${req.session.username.First_Name} ${req.session.username.Last_Name}`;
    let pool = await sql.connect(config);
    let reportByEmployee = pool.request().query(sqlGenerateReport).then(response => {
        if (response.rowsAffected[0] >= 1) {
            let reportData = response.recordsets[0];
            res.status(200).json({
                status: 'Success',
                requestReportPerson,
                reportData,
            });
        } else {
            res.status(404).json({
                status: 'Not Found',
                message: 'No record that match the criteria!',
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            status: 'Bad Request',
            message: 'An Error occurred while trying to retrieve data from database!',
        });
    });
});


exports.getReportByExpense = catchAsync(async (req, res, next) => {
    let sqlGenerateReport = ``;
    if (req.body.From_Date === undefined && req.body.To_Date === undefined && req.body.Specific_Date === undefined) {
        sqlGenerateReport = `SELECT * FROM expenses left join projects on expenses.Project_ID = projects.Project_ID WHERE expenses.Project_ID = ${req.body.ID}`;
    } else if (req.body.Specific_Date !== undefined) {
        sqlGenerateReport = `SELECT * FROM expenses left join projects 
        on expenses.Project_ID = projects.Project_ID 
        WHERE expenses.Project_ID = 1 
        AND (cast(expenses.Created_At as date) = '${req.body.Specific_Date}')`;
    } else {
        sqlGenerateReport = `SELECT * FROM expenses left join projects 
        on expenses.Project_ID = projects.Project_ID 
        WHERE expenses.Project_ID = ${req.body.ID} AND 
        (expenses.Created_At between '${req.body.From_Date}' and '${req.body.To_Date}')`;
    };
    let requestReportPerson = `${req.session.username.First_Name} ${req.session.username.Last_Name}`;
    let pool = await sql.connect(config);
    let reportByExpense = pool.request().query(sqlGenerateReport).then(response => {
        if (response.rowsAffected[0] >= 1) {
            let reportData = response.recordsets[0];
            res.status(200).json({
                status: 'Success',
                requestReportPerson,
                reportData,
            });
        } else {
            res.status(404).json({
                status: 'Not Found',
                message: 'No record that match the criteria!',
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            status: 'Bad Request',
            message: 'An Error occurred while trying to retrieve data from database!',
        });
    });
});