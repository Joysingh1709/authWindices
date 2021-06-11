const {
    createUser,
    getAllUsers,
    userLogin
} = require('./user.controller');
const router = require('express').Router();
const authenticateToken = require('../auth/authenticateToken');

router.post('/', createUser);
router.get('/', authenticateToken, getAllUsers);
router.post('/login', userLogin);

module.exports = router;