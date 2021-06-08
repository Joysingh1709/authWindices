const { create, getUser } = require('./user.service');

const { genSaltSync } = require('bcrypt'); //hashSync

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        create(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'Database error',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                data: result
            });
        });
    },
    getAllUsers: (req, res) => {
        getUser((err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'Database error',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                data: result
            });
        });
    }
}