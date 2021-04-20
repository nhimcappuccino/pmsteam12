const config = require('./../dbconfig');
const sql = require('mssql');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { get, post } = require('../routes/projectRoutes');

exports.updateEmployeeInformation = catchAsync(async (req, res, next) => {

    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;


    let sqlUpdateInformation = `UPDATE dbo.employees
    SET First_Name='${req.body.First_Name}', Last_Name='${req.body.Last_Name}',Middle_Name='${req.body.Middle_Name}',Date_of_Birth='${req.body.Date_of_Birth}',
    Gender=${req.body.Gender}, Phone_Number=${req.body.Phone_Number},Email='${req.body.Email}',
    House_Number=${req.body.House_Number},Street_Name='${req.body.StreetName}',City='${req.body.City}',States='${req.body.States}',
    Zipcode=${req.body.Zipcode},Employee_Status='${req.body.EmployeeStatus}',UserID='${req.body.UserID}',UserPassword='${req.body.Password}',
    Role_ID=${req.body.RoleID},Department_ID=${req.body.Department},Payrate=${req.body.PayRate},Last_Changed_By='${req.session.username.First_Name} ${req.session.username.Last_Name}',Last_Updated_At=GETDATE()
    WHERE Employee_ID=${req.body.getEmployeeID}`;
    let pool = await sql.connect(config);
    let updateRequest = await pool.request().query(sqlUpdateInformation).then(response => {
        if (response.rowsAffected[0] === 1) {
            res.status(200).json({
                status: 'Success',
                message: `Successfully updated ${req.body.First_Name} ${req.body.Last_Name}'s Information!`,
            });
        } else if (response.rowsAffected[0] === 0) {
            res.status(400).json({
                status: 'Failed',
                message: `Failed to update ${req.body.First_Name} ${req.body.Last_Name}'s Information! Please contact your administrator for more detail!`,
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            status: 'Failed',
            message: `Failed to update ${req.body.First_Name} ${req.body.Last_Name}'s Information! Please contact your administrator for more detail!`,
        });
    });
    sql.close();

});

exports.getAllEmployees = catchAsync(async (req, res, next) => {
    let sqlQueryEmployees = `SELECT * FROM employees LEFT JOIN departments ON employees.Department_ID = departments.Department_ID LEFT JOIN roles ON employees.Role_ID = roles.Role_ID`;
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
    let sqlQueryOneEmployee = `SELECT * FROM employees LEFT JOIN roles ON employees.Role_ID=roles.Role_ID LEFT JOIN departments ON employees.Department_ID=departments.Department_ID LEFT JOIN (SELECT Employee_ID as Manager_ID, Department_ID FROM department_managers) AS Manager ON Manager.Department_ID=employees.Department_ID WHERE employees.Employee_ID=${req.params.id}`;
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
    let sqlQueryEmployeesBy;
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


exports.createNewEmployee = catchAsync(async (req, res, next) => {
    if (req.session.isLoggedIn) {
        let createNewEmployee = `INSERT INTO dbo.employees
    (First_Name,Last_Name,Middle_Name,Date_of_Birth,Gender,Phone_Number,Email,House_Number,Street_Name,City,States,Zipcode,UserID,UserPassword,Role_ID,Department_ID,Payrate)
    VALUES
    ('${req.body.First_Name}','${req.body.Last_Name}','${req.body.Middle_Name}','${req.body.Date_of_Birth}',${req.body.Gender},${req.body.Phone_Number},'${req.body.Email}',
    ${req.body.House_Number},'${req.body.StreetName}',
    '${req.body.City}', '${req.body.States}',
    ${req.body.Zipcode}, '${req.body.UserID}', ${req.body.Password}, ${req.body.RoleID}, ${req.body.Department}, ${req.body.PayRate})`;
        let pool = await sql.connect(config);
        let result = await pool.query(createNewEmployee).then(response => {
            if (response.rowsAffected[0] === 1) {
                res.status(200).json({
                    status: 'Success',
                    message: `Successfully Created a New Employee`,
                });
            } else {
                res.status(400).json({
                    status: 'Bad Resquest',
                    message: `Failed to Create a New Employee`,
                });
            };
        }).catch(error => {
            res.status(400).json({
                status: 'Bad Resquest',
                message: `Failed to Create a New Employee! Contact your Database Administrator for more information.`,
            });
        })
        sql.close();
    } else {
        res.redirect('/');
    }
});




const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);

    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);

    } else {
        cb(`Not An Image! Please upload only .jpg photo.`, false);
    }
};

const upload = multer({
    storage: multerStorage,
});


exports.uploadEmployeePhoto = upload.single('photo');

exports.updateEmployeePhotoName = catchAsync(async (req, res, next) => {
    if (req.session.isLoggedIn) {
        let sqlUpdatePhotoQuery = `UPDATE dbo.employees SET employees.Employee_Photo = '${req.file.originalname.replace('.jpg', '')}' WHERE employees.Employee_ID =${parseInt(req.body.Employee_ID)}`;
        let pool = await sql.connect(config);
        let updateProcess = await pool.request().query(sqlUpdatePhotoQuery).then(response => {
            if (response.rowsAffected[0] === 1) {
                res.status(200).json({
                    status: 'Success',
                    message: `Successfully updated user's photo! Refreshing the page for the changes to take effect...`,
                });

            } else {
                res.status(400).json({
                    status: 'Failed',
                    message: `Failed to update user's Photo! Please contact your administrator for more detail!`,
                });
            };

        }).catch(err => {
            res.status(400).json({
                status: 'Failed',
                message: `Failed to update user's Photo! Please contact your administrator for more detail!`,
                error: err,
            });
        });
    } else {
        res.redirect('/');
    };
    sql.close();
});



exports.getAllManagers = catchAsync(async (req, res, next) => {
    let sqlQueryEmployees = `SELECT * FROM employees where employees.Role_ID=1 OR employees.Role_ID=2`;
    let pool = await sql.connect(config);
    let managers = await pool.request().query(sqlQueryEmployees).then(response => {
        if (response.recordset[0] === undefined) {
            res.status(404).json({
                status: 'Not Found',
                message: 'No Manager that match the criteria',
            });
        } else {
            res.status(200).json({
                managers: response.recordsets[0],
            });
        };
    });
    sql.close();
});


