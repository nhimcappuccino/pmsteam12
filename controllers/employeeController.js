const config = require('./../dbconfig');
const sql = require('mssql');
const catchAsync = require('../utils/catchAsync');


exports.getAllEmployees = catchAsync(async (req, res, next) => {
    sqlQueryEmployees = `SELECT * FROM employees LEFT JOIN departments ON employees.Department_ID = departments.Department_ID LEFT JOIN roles ON employees.Role_ID = roles.Role_ID`;
    let pool = await sql.connect(config);
    let employee = await pool.request().query(sqlQueryEmployees).then(result => {
        if (result.recordset[0] === undefined) {
            res.status(404).json({
                status: 'Not Found',
                message: 'No employees that match the criteria',
            });
        } else {
            res.status(200).json({
                data: result,
            });
        };
    });
    sql.close();
});
function formatPhoneNumber(phoneNumberString) {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        let intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}


exports.getEmployeeDetail = catchAsync(async (req, res, next) => {
    sqlQueryOneEmployee = `SELECT * FROM employees LEFT JOIN roles ON employees.Role_ID=roles.Role_ID LEFT JOIN departments ON employees.Department_ID=departments.Department_ID LEFT JOIN (SELECT Employee_ID as Manager_ID, Department_ID FROM department_managers) AS Manager ON Manager.Department_ID=employees.Department_ID WHERE employees.Employee_ID=${req.params.id}`;


    if (req.session.isLoggedIn) {
        const data = req.session.username;
        const user_full_name = data.First_Name + ' ' + data.Last_Name;
        const user_photo = data.Employee_Photo;
        const loggedInUserID = req.session.loggedInUserID;


        let pool = await sql.connect(config);
        let employee = await pool.request().query(sqlQueryOneEmployee).then(result => {
            if (result.recordset[0] === undefined) {
                res.status(404).json({
                    status: 'Not Found',
                    message: 'No employees that match the criteria',
                });
            } else {
                let phoneNumber = formatPhoneNumber(result.recordset[0].Phone_Number);
                res.status(200).render(`employeeDetail`, {
                    title: `PMS - Projects Management`,
                    page: `Projects Management`,
                    user: user_full_name,
                    user_photo,
                    data: result,
                    phoneNumber,
                    loggedInUserID
                });
            };
        });
        sql.close();

    } else {
        res.redirect('/');
    }
});



exports.getEmployeesBy = catchAsync(async (req, res, next) => {
    if (req.params.department === 'ISNOTNULL') {
        sqlQueryEmployeesBy = `SELECT * FROM employees LEFT JOIN departments ON employees.Department_ID = departments.Department_ID LEFT JOIN roles ON employees.Role_ID = roles.Role_ID WHERE employees.First_Name LIKE '%${req.params.keywords}%' AND employees.Department_ID IS NOT NULL`;
    } else if (req.params.keywords === 'ISNOTNULL') {
        sqlQueryEmployeesBy = `SELECT * FROM employees LEFT JOIN departments ON employees.Department_ID = departments.Department_ID LEFT JOIN roles ON employees.Role_ID = roles.Role_ID WHERE employees.First_Name IS NOT NULL AND employees.Department_ID=${req.params.department}`
    } else {
        sqlQueryEmployeesBy = `SELECT * FROM employees LEFT JOIN departments ON employees.Department_ID = departments.Department_ID LEFT JOIN roles ON employees.Role_ID = roles.Role_ID WHERE employees.First_Name LIKE '%${req.params.keywords}%' AND employees.Department_ID=${req.params.department}`
    };
    let pool = await sql.connect(config);
    let employees = await pool.request().query(sqlQueryEmployeesBy).then(result => {
        if (result.recordset[0] === undefined) {
            res.status(404).json({
                status: 'Not Found',
                message: 'No employees that match the Keywords',
            });
        } else {
            res.status(200).json({
                data: result,
            });
        };
    });
    sql.close();
});
