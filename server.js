"use strict";
const app = require('./app');
const path = require('path');
const dotenv = require('dotenv');
const config = require('./dbconfig');
const sql = require('mssql');
const { response } = require('express');
dotenv.config({ path: `${__dirname}/config.env` });
const PORT = process.env.PORT;

const DBconnect = sql.connect(config, (err) => {
    if (err) {
        console.log(err);
    } else {

        console.log('Connection to database has been established successfully!');
    }
});

const server = app.listen(PORT, () => {
    console.log(`Application is running on ${PORT}...`);
});