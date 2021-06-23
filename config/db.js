const { createPool } = require('mysql');
const mysql = require('mysql');

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

// const con = mysql.createConnection({
//     host: process.env.RDS_HOSTNAME,
//     user: process.env.RDS_USERNAME,
//     password: process.env.RDS_PASSWORD,
//     port: process.env.RDS_PORT
// })

// con.connect(function (err) {
//     if (err) {
//         console.error('Database connection failed: ' + err.stack);
//         console.log(err);
//         return;
//     }

//     console.log('Connected to database, ThreadId : ', con.threadId);
// });

// con.end();

module.exports = { pool };