const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });


const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_SERVER,
    database: process.env.DATABASE_NAME,
    options: {
        trustedconnection: true,
        enableArithAbort: true,
    }
}
module.exports = config;