const { create, getUser, loginUser, getUserByUserId } = require('./user.service');
const { generateAcessToken, generateRefreshToken } = require('../auth/generateToken');
const { genSaltSync, hashSync } = require('bcryptjs'); //hashSync
const Tokens = require('../auth/tokens');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        if (!body) res.status(500)
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
    createNewUser: (req, res) => {
        const salt = genSaltSync(10);
        const hashP = hashSync(req.body.password, salt);
        const body = {
            nameOfOrganisation: req.body.nameOfOrganisation,
            nameOfOwner: req.body.nameOfOwner,
            designation: req.body.designation,
            typeOfFirm: req.body.typeOfFirm,
            numberOfemployee: req.body.numberOfemployee,
            companyUniqueCode: req.body.companyUniqueCode,
            role: req.body.role,
            username: req.body.username,
            email: req.body.email,
            password: hashP,
            id: 'newUserId'
        };

    },
    getUserById: (req, res) => {
        const userId = req.params.id;
        getUserByUserId({ id: userId }, (err, result) => {
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
    getLoggedInUser: (req, res) => {
        console.log(req.user)
        if (!req.user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: req.user
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