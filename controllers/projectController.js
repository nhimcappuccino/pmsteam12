const catchAsync = require('./../utils/catchAsync');
const config = require('./../dbconfig');
const sql = require('mssql');
const router = require('../routes/projectRoutes');



exports.createNewProject = catchAsync(async (req, res, next) => {
    sqlCreateNewProject = `INSERT INTO dbo.projects
	(Project_Name, Project_Description, Project_Manager_ID, Customer_ID, Budget, Planned_Start_Date, Planned_End_Date, Created_By)
	VALUES
    ('${req.body.Project_Name}','${req.body.Project_Description}', ${req.body.Project_Manager_ID}, ${req.body.Customer_ID}, ${req.body.Budget}, '${req.body.Planned_Start_Date}', '${req.body.Planned_End_Date}', ${req.body.Created_By})`;
    console.log(req.body);
    console.log(sqlCreateNewProject);
    let pool = await sql.connect(config);
    let result = await pool.query(sqlCreateNewProject).then(response => {
        console.log(response);
        if (response.rowsAffected[0] === 1) {
            console.log(response);
            res.status(200).json({
                status: 'Success',
                message: `Successfully created a new project: ${req.body.Project_Name}`
            });
        } else {
            res.status(400).json({
                status: 'Bad Request',
                message: `Unable to create new project!`

            });

        };
    }).catch(err => {
        res.status(400).json({
            status: 'Bad Request',
            message: `Unable to create new project! Error occurred while trying to retrieve data from the database`,
            Error: err,
        });
    });
    sql.close();

});


exports.getAllActiveProjects = catchAsync(async (req, res, next) => {
    if (req.session.isLoggedIn) {

        let sqlGetAllProjects = `SELECT * FROM projects LEFT JOIN employees on  employees.Employee_ID = projects.Project_Manager_ID WHERE projects.Project_Status_ID = 2 `
        let pool = await sql.connect(config);
        let projects = await pool.request().query(sqlGetAllProjects).then(response => {

            if (response.rowsAffected[0] === 0) {
                res.status(404).json({
                    status: 'Not Found',
                    message: `There is no project that currently Active!`,
                });

            } else {
                res.status(200).json({
                    status: 'Success',
                    projectData: response,
                });

            };
        }).catch(err => {
            res.status(404).json({
                status: 'Failed',
                message: `Error occurred while trying to retrieve data from the database`,
                err,
            });
        });

        sql.close();

    } else {
        res.redirect('/');
    };
});


exports.getAllCompletedProjects = catchAsync(async (req, res, next) => {
    if (req.session.isLoggedIn) {

        let sqlGetAllProjects = `SELECT * FROM projects LEFT JOIN employees on  employees.Employee_ID = projects.Project_Manager_ID WHERE projects.Project_Status_ID = 4 `
        let pool = await sql.connect(config);
        let projects = await pool.request().query(sqlGetAllProjects).then(response => {

            if (response.rowsAffected[0] === 0) {
                res.status(404).json({
                    status: 'Not Found',
                    message: `There is no project that match the criteria!`,
                });

            } else {
                res.status(200).json({
                    status: 'Success',
                    projectData: response,
                });

            };
        }).catch(err => {
            res.status(400).json({
                status: 'Failed',
                message: `Error occurred while trying to retrieve data from the database`,
                err,
            });
        });

        sql.close();

    } else {
        res.redirect('/');
    };
});

exports.getAllOtherProjects = catchAsync(async (req, res, next) => {
    if (req.session.isLoggedIn) {
        let sqlGetAllProjects = `SELECT * FROM projects LEFT JOIN employees on  employees.Employee_ID = projects.Project_Manager_ID WHERE projects.Project_Status_ID <> 2 AND projects.Project_Status_ID <> 4 `
        let pool = await sql.connect(config);
        let projects = await pool.request().query(sqlGetAllProjects).then(response => {

            if (response.rowsAffected[0] === 0) {
                res.status(404).json({
                    status: 'Not Found',
                    message: `There is no project that match the criteria!`,
                });

            } else {
                res.status(200).json({
                    status: 'Success',
                    projectData: response,
                });

            };
        }).catch(err => {
            res.status(400).json({
                status: 'Failed',
                message: `Error occurred while trying to retrieve data from the database`,
                err,
            });
        });

        sql.close();

    } else {
        res.redirect('/');
    };
});

exports.getProjectDetail = catchAsync(async (req, res, next) => {
    const data = req.session.username;
    const user_full_name = data.First_Name + ' ' + data.Last_Name;
    const user_photo = req.session.userPhoto;
    const loggedInUserID = req.session.loggedInUserID;

    let sqlGetProjectDetail = `SELECT * FROM projects left join milestones on milestones.Project_ID = projects.Project_ID WHERE projects.Project_ID = ${req.params.id}`;
    let sqlGetEmployeeInProject = `SELECT * FROM tasks left join employees on employees.Employee_ID = tasks.Employee_ID WHERE tasks.Project_ID = ${req.params.id}`

    let projectDetail;
    let noAssignedTasks = 0;
    let inProgress = 0;
    let completed = 0;
    let participantList = new Array();
    let newPerson = new Object();
    let flags = [];
    let output = [];
    let l;
    let i;
    let returnResult;
    let pool = await sql.connect(config);
    let project = await pool.request().query(sqlGetProjectDetail).then(response => {
        returnResult = response;
        if (response.rowsAffected[0] === 0) {
            res.status(404).json({
                status: 'Not Found',
                message: 'Cannot find detail for this project!',
            });
        } else if (response.rowsAffected[0] > 0) {
            projectDetail = response.recordsets[0];

            projectDetail.forEach(milestone => {
                if (milestone.Milestones_Status === 'No Assigned Tasks') {
                    noAssignedTasks++;
                } else if (milestone.Milestones_Status === 'In Progress') {
                    inProgress++;
                } else if (milestone.Milestones_Status === 'Completed') {
                    completed++;
                };
            });
        };
    });
    let workOnEmployee = await pool.request().query(sqlGetEmployeeInProject).then(participant => {
        participant.recordsets[0].forEach(person => {
            newPerson.Employee_ID = person.Employee_ID[0];
            newPerson.First_Name = person.First_Name;
            newPerson.Last_Name = person.Last_Name;
            newPerson.Employee_Photo = person.Employee_Photo;
            participantList.push(newPerson);
        });
        l = participantList.length;
        for (i = 0; i < l; i++) {
            if (flags[participantList[i].Employee_ID]) continue;
            flags[participantList[i].Employee_ID] = true;
            output.push(participantList[i]);
        };
    });
    res.status(200).render(`projectDetail`, {
        title: `PMS - Project Detail`,
        page: `Project Detail`,
        project: returnResult,
        user: user_full_name,
        user_photo,
        loggedInUserID,
        participant: output,
        noAssignedTasks,
        inProgress,
        completed,
        projectDetail,
    });


    sql.close();
});


exports.getAllTasks = catchAsync(async (req, res, next) => {
    let sqlGetAllRelatedTasks = `SELECT * FROM tasks left join milestones on tasks.Milestone_ID = milestones.ID where Milestone_ID =${req.params.id}`;

    let pool = await sql.connect(config);
    let tasks = await pool.request().query(sqlGetAllRelatedTasks).then(response => {
        if (response.rowsAffected[0] === 0) {
            res.status(404).json({
                status: 'Not Found',
                message: 'No Tasks Related to This Milestone',
            });
        } else {
            res.status(200).json({
                status: 'Success',
                tasks: response.recordsets[0],
            });
        };
    }).catch(err => {
        res.status(400).json({
            status: 'Bad Request',
            message: 'Error occurred while trying to retrieve data from the database',
        });
    })
    sql.close();

});