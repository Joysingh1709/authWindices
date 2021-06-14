const { create, getUser, loginUser } = require('./user.service');
const { generateAcessToken, generateRefreshToken } = require('../auth/generateToken');
// const { genSaltSync } = require('bcrypt'); //hashSync
const Tokens = require('../auth/tokens');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
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
    },
    userLogin: (req, res) => {
        if (!req.body.username, !req.body.password) res.sendStatus(403)
        const user = { username: req.body.username, password: req.body.password }
        loginUser(user, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'Database error',
                    error: err
                });
            }
            if (result.length !== 0) {
                const accessToken = generateAcessToken(user);
                const refreshToken = generateRefreshToken(user);
                Tokens.push(refreshToken);
                return res.status(200).json({
                    success: true,
                    data: result,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "There is no user to corresponding credentials, please check and try again"
                });
            }
        })
    }
}