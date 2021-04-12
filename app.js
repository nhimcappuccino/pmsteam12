"use strict";

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const employeeRouter = require('./routes/employeeRoutes');
const viewRouter = require('./routes/viewRoutes');
const reportRouter = require('./routes/reportRoutes');

app.use(express.json()); //middleware to parse all req res to json type
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_STRING,
    resave: false,
    saveUninitialized: false,
}));


app.set('view engine', 'pug');
app.set('views', path.join(`${__dirname}/views`));
app.use(express.static(`${__dirname}/public`));


//ROUTES

app.use('/', viewRouter);
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/report', reportRouter);

module.exports = app;