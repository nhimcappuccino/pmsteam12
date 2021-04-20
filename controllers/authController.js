const catchAsync = require('./../utils/catchAsync');
const config = require('./../dbconfig');
const sql = require('mssql');
const Employee = require('./../models/employeeModel');
const { user } = require('./../dbconfig');

exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    let sqlQuery = `SELECT * FROM employees WHERE UserID='${username}' AND UserPassword='${password}'`;
    let pool = await sql.connect(config);
    let auth = await pool.request().query(sqlQuery).then(result => {
        if (result.recordset[0] === undefined) {

            res.status(401).json({
                status: 'Failed',
                message: 'Login Failed! Your username and/ or password is incorrect!',
            });
        } else {
            const employee_first_name = result.recordset[0].First_Name;
            const employee_last_name = result.recordset[0].Last_Name;
            const employee_role = result.recordset[0].Role_ID;
            const loggedInUserID = result.recordset[0].Employee_ID;
            const userPhoto = result.recordset[0].Employee_Photo.toLowerCase();
            const userData = result.recordset[0];

            req.session.isLoggedIn = true;
            req.session.username = userData;
            req.session.userRole = employee_role;
            req.session.loggedInUserID = loggedInUserID;
            req.session.userPhoto = userPhoto;
            if (result.recordset[0].Employee_Status === 'EMPLOYED') {
                res.status(200).json({
                    status: 'Success',
                    message: `Login Successfully! Logging you in as ${employee_first_name} ${employee_last_name}`,
                    data: {
                        userData
                    }
                });

            } else {
                res.status(401).json({
                    status: 'Failed',
                    message: 'Your account has been disabled/ deleted! Please contact your administrator for more information.',
                })
            };
        };
    }).catch(err => {
        res.status(401).json({
            status: 'Failed',
            message: 'Unable to log you in! Please contact your administrator for more information.',
        })
    });
    sql.close();
});

exports.roleCheck = catchAsync(async (req, res, next) => {
    const data = req.session.username;
    const user_full_name = data.First_Name + ' ' + data.Last_Name;
    const user_photo = req.session.userPhoto;
    const loggedInUserID = req.session.loggedInUserID;
    const userRole = req.session.userRole;
    if (userRole <= 3) {
        next();
    } else {
        res.status(400).render(`notAllowed`, {
            user: user_full_name,
            user_photo,
            loggedInUserID,
        });

    };
});


exports.logout = catchAsync(async (req, res, next) => {
    req.session.destroy();
    res.status(200).redirect('/');
});