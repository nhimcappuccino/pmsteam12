const catchAsync = require('./../utils/catchAsync');
const config = require('./../dbconfig');
const sql = require('mssql');
const router = require('../routes/projectRoutes');


const formatDateTime = (input) => {
    let output;
    return output = `${input.getMonth()}/${input.getDate()}/${input.getFullYear()} ${input.getHours()}:${input.getMinutes()}:${input.getSeconds()}`;

};

exports.createNewTask = catchAsync(async (req, res, next) => {
    let sqlCreateTask = `INSERT INTO dbo.tasks -- tasks with associated projects & milestones
	(Task_Name, Task_Description,Priority,Task_Planned_Start_Date, Task_Planned_End_Date, Task_Status, Employee_ID, Project_ID, Milestone_ID)
	VALUES
	('${req.body.Task_Name}', '${req.body.Task_Description}',${req.body.Priority},'${req.body.Task_Planned_Start_Date}','${req.body.Task_Planned_End_Date}','Started', ${req.body.Employee_ID}, ${req.body.Project_ID},${req.body.Milestone_ID})
    `;
    let sqlFindMilestone = `SELECT * FROM milestones WHERE milestones.ID = ${req.body.Milestone_ID} `;
    let isMilestoneExist = false;
    let pool = await sql.connect(config);

    let foundMilestone = await pool.query(sqlFindMilestone).then(found => {
        if (found.rowsAffected[0] === 1) {

            isMilestoneExist = true;
        } else if (found.rowsAffected[0] < 1) {
            res.status(400).json({
                status: 'Bad Request',
                message: `Unable to create new task! Milestone does not exist`,
                err,
            });
        };
    });
    if (isMilestoneExist === true) {
        let result = await pool.query(sqlCreateTask).then(response => {
            if (response.rowsAffected[0] > 0) {
                res.status(200).json({
                    status: 'Success',
                    message: `Successfully created a new Task: ${req.body.Task_Name} For Employee: ${req.body.Employee_ID}`
                });
            } else {
                res.status(400).json({
                    status: 'Bad Request',
                    message: `Unable to create new task!`
                });
            };
        }).catch(err => {
            console.log(err);
            res.status(400).json({
                status: 'Bad Request',
                message: `Unable to create new task! An error occurred while trying to connect to the database`,
                err,
            });
        });
    } else {
        res.status(400).json({
            status: 'Bad Request',
            message: `Unable to create new task! An error occurred while trying to connect to the database`,
            err,
        });
    };


    sql.close();
});


exports.removeMilestoneById = catchAsync(async (req, res, next) => {
    let sqlRemoveMilestoneById = `DELETE milestones where milestones.ID = ${req.params.id}`;
    let pool = await sql.connect(config);
    let result = await pool.request().query(sqlRemoveMilestoneById).then(response => {
        if (response.rowsAffected[0] === 1) {
            res.status(204).json({
                status: 'Success',
                message: null,
            });
        } else {
            res.status(400).json({
                status: 'Bad Request',
                message: 'Milestone Not Found!',
            });
        };
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            status: 'Bad Request',
            message: 'Milestone Not Found!',
            err,
        });
    });
    sql.close();

});


exports.createNewMilestone = catchAsync(async (req, res, next) => {
    let sqlCreateNewMilestone = `INSERT INTO dbo.milestones 
	(Project_ID, Milestones_Name, Milestones_Expiration_Date)
    VALUES
    (${req.body.Project_ID}, '${req.body.Milestones_Name}', '${req.body.Milestones_Expiration_Date}')
    `

    let pool = await sql.connect(config);
    let result = await pool.query(sqlCreateNewMilestone).then(response => {
        if (response.rowsAffected[0] > 0) {
            res.status(200).json({
                status: 'Success',
                message: `Successfully created a new project: ${req.body.Milestones_Name}`
            });
        } else {
            res.status(400).json({
                status: 'Bad Request',
                message: `Unable to create new milestone!`

            });

        };
    }).catch(err => {
        res.status(400).json({
            status: 'Bad Request',
            message: `Unable to create new milestone! An error occurred while trying to connect to the database`,
        });
    });
    sql.close();
});


exports.createNewProject = catchAsync(async (req, res, next) => {
    let sqlCreateNewProject = `INSERT INTO dbo.projects
	(Project_Name, Project_Description, Project_Manager_ID, Customer_ID, Budget, Planned_Start_Date, Planned_End_Date, Created_By)
	VALUES
    ('${req.body.Project_Name}','${req.body.Project_Description}', ${req.body.Project_Manager_ID}, ${req.body.Customer_ID}, ${req.body.Budget}, '${req.body.Planned_Start_Date}', '${req.body.Planned_End_Date}', ${req.body.Created_By})`;
    let pool = await sql.connect(config);
    let result = await pool.query(sqlCreateNewProject).then(response => {
        if (response.rowsAffected[0] === 1) {
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
    let startedDate;
    let today = new Date();
    let timeLeftTillDue;
    let timeLeftTillDueString;
    startedDate = new Date(returnResult.recordset[0].Planned_End_Date);
    if (today > startedDate) {
        timeLeftTillDue = (today - startedDate) / (1000 * 3600 * 24);
        Math.ceil(timeLeftTillDue) > 1 ? timeLeftTillDueString = `Project is ${Math.ceil(timeLeftTillDue)} Days Overdue!` : timeLeftTillDueString = `Project is ${Math.ceil(timeLeftTillDue)} Day Overdue!`;
    } else if (today < startedDate) {
        timeLeftTillDue = (startedDate - today) / (1000 * 3600 * 24);
        Math.ceil(timeLeftTillDue) > 1 ? timeLeftTillDueString = `${Math.ceil(timeLeftTillDue)} Days Until This Project is Due` : timeLeftTillDueString = `${Math.ceil(timeLeftTillDue)} Day Until This Project is Due`;;
    };


    let workOnEmployee = await pool.request().query(sqlGetEmployeeInProject).then(participant => {
        participant.recordsets[0].forEach(person => {
            let newPerson = new Object();
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
        timeLeftTillDueString,
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


exports.updateTasksInfomation = catchAsync(async (req, res, next) => {
    let sqlCurrentState = `SELECT * FROM tasks WHERE tasks.Task_ID = ${req.params.id}`;
    let currentTaskState;
    let sqlUpdateTasks;

    let pool = await sql.connect(config);

    let currentStateTask = await pool.request().query(sqlCurrentState).then(currentState => {
        currentTaskState = currentState.recordsets[0];
    });
    let today = new Date();
    let Total_Minutes, total_time;

    if (req.params.status === 'Processing') {
        Total_Minutes = Math.floor(((today - currentTaskState[0].Created_At) / 3600) % 24);
        total_time = Math.floor(currentTaskState[0].Created_At / 3600 % 24) + Total_Minutes;
        sqlUpdateTasks = `UPDATE dbo.tasks SET 
    tasks.Task_Status = '${req.body.Task_Status}', 
    tasks.Total_Minutes = ${total_time}, 
    tasks.Last_Changed_By = ${req.body.Last_Changed_By}, 
    tasks.Actual_Start_Date='${formatDateTime(today)}'
    WHERE tasks.Task_ID = ${req.params.id} AND tasks.Milestone_ID = ${req.body.Milestone_ID} `;
    } else if (req.params.status === 'Completed') {
        Total_Minutes = Math.floor(((today - currentTaskState[0].Last_Updated_At) / 3600) % 24);
        total_time = Math.floor(currentTaskState[0].Last_Updated_At / 3600 % 24) + Total_Minutes;
        sqlUpdateTasks = `UPDATE dbo.tasks SET 
        tasks.Task_Status = '${req.body.Task_Status}', 
        tasks.Total_Minutes = ${total_time}, 
        tasks.Last_Changed_By = ${req.body.Last_Changed_By}, 
        tasks.Actual_End_Date='${formatDateTime(today)}'
        WHERE tasks.Task_ID = ${req.params.id} AND tasks.Milestone_ID = ${req.body.Milestone_ID} `;
    } else if (req.params.status === 'NeedSupport') {
        Total_Minutes = Math.floor(((today - currentTaskState[0].Last_Updated_At) / 3600) % 24);
        total_time = Math.floor(currentTaskState[0].Last_Updated_At / 3600 % 24) + Total_Minutes;
        sqlUpdateTasks = `UPDATE dbo.tasks SET 
        tasks.Task_Status = 'Need Support', 
        tasks.Total_Minutes = ${total_time}, 
        tasks.Last_Changed_By = ${req.body.Last_Changed_By}
        WHERE tasks.Task_ID = ${req.params.id} AND tasks.Milestone_ID = ${req.body.Milestone_ID} `;
    } else {
        Total_Minutes = Math.floor(((today - currentTaskState[0].Last_Updated_At) / 3600) % 24);
        total_time = Math.floor(currentTaskState[0].Last_Updated_At / 3600 % 24) + Total_Minutes;
        sqlUpdateTasks = `UPDATE dbo.tasks SET 
        tasks.Task_Status = '${req.body.Task_Status}', 
        tasks.Total_Minutes = ${total_time}, 
        tasks.Last_Changed_By = ${req.body.Last_Changed_By}
        WHERE tasks.Task_ID = ${req.params.id} AND tasks.Milestone_ID = ${req.body.Milestone_ID} `;
    }
    let sqlUpdateTask = await pool.request().query(sqlUpdateTasks).then(response => {
        if (response.rowsAffected[0] <= 0) {
            res.status(400).json({
                status: 'Bad Request',
                message: 'Unable to update task',
            });
        } else {
            res.status(200).json({
                status: 'Success',
                message: 'Successfully update task data',
            });
        };
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            status: 'Bad Request',
            message: 'Error occurred while trying to update data for the task',
        });
    })
    sql.close();
});


exports.deactivateProject = catchAsync(async (req, res, next) => {
    let sqlDeactivateRequest = `UPDATE projects SET projects.Project_Status_ID = 5 WHERE projects.Project_ID = ${req.params.id}`;

    let pool = await sql.connect(config);
    let deactivateResult = await pool.request().query(sqlDeactivateRequest).then(response => {
        if (response.rowsAffected[0] >= 1) {
            res.status(204).json({
                status: 'Success',
                message: null,
            });
        } else {
            res.status(404).json({
                status: 'Not Found',
                message: 'Could NOT find the project you requested!',
            });
        }
    }).catch(err => {
        res.status(400).json({
            status: 'Bad Request',
            message: `Unable to deactivate the Project ${req.params.id}`,
        })
    })

});

exports.createNewExpense = catchAsync(async (req, res, next) => {
    let sqlNewExpense = `
    INSERT INTO dbo.expenses
	(Expense_Name, Expense_Description, Cost, Project_ID, Created_By)
	VALUES
	('${req.body.Expense_Name}', '${req.body.Expense_Description}',${req.body.Cost},${req.body.Project_ID},${req.body.Created_By})`;
    let pool = await sql.connect(config);
    let expenseApproval = await pool.request().query(sqlNewExpense).then(response => {
        if (response.rowsAffected[0] >= 1) {
            res.status(200).json({
                status: 'Success',
                message: `Successfully created a new expense: ${req.body.Expense_Name}`
            });
        } else {
            res.status(400).json({
                status: 'Bad Request',
                message: `Unable to create new Expense!`,
            });
        };
    }).catch(err => {
        res.status(400).json({
            status: 'Bad Request',
            message: `Unable to create new Expense!`
        });
    });

});