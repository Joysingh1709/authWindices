const { pool } = require('../config/db');

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into user(name, email) values(?,?)`,
            [
                data.name,
                data.email
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getUser: callback => {
        pool.query(
            `select name, email from user`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    loginUser: (data, callback) => {
        pool.query(
            `select * from user where name = ? AND password = ?`,
            [
                data.username,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getUserByEmail: (data, callback) => {
        pool.query(
            `select * from user where email = ?`,
            [data.email],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    }
}
