const catchAsync = require('./../utils/catchAsync');
const config = require('./../dbconfig');
const sql = require('mssql');
const router = require('../routes/projectRoutes');

exports.getAllCustomers = catchAsync(async (req, res, next) => {
    sqlGetAllCustomers = `SELECT * FROM customers`;
    let pool = await sql.connect(config);
    let customers = await pool.request().query(sqlGetAllCustomers).then(response => {
        if (response.rowsAffected[0] === 0) {
            res.status(404).json({
                status: 'Not Found',
                message: `No available customers to choose!`
            });
        } else {
            res.status(200).json({
                status: 'Success',
                customers: response.recordsets[0],
            });
        };
    }).catch(err => {
        res.status(400).json({
            status: 'Failed',
            message: `Bad request made to the database!`
        });
    });


});