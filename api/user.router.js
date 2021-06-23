const {
    createUser,
    createNewUser,
    getAllUsers,
    getLoggedInUser,
    getUserById,
    userLogin
} = require('./user.controller');
const router = require('express').Router();
const authenticateToken = require('../auth/authenticateToken');

router.post('/', createUser);
router.post('/sign-up', createNewUser);
router.get('/user', authenticateToken, getLoggedInUser);
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.post('/login', userLogin);

router.get('/logout', (req, res) => {
    console.log("USER LOGGED OUT");
    req.session.destroy();
    req.logout();
    res.redirect('http://127.0.0.1:5500/')
})

module.exports = router;