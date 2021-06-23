const {
    createUser,
    createNewUser,
    getAllUsers,
    getLoggedInUser,
    userLogin
} = require('./user.controller');
const router = require('express').Router();
const authenticateToken = require('../auth/authenticateToken');

router.post('/', createUser);
router.post('/sign-up', createNewUser);
router.get('/user', authenticateToken, getLoggedInUser);
router.get('/', authenticateToken, getAllUsers);
router.post('/login', userLogin);

module.exports = router;