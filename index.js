require('dotenv').config();
const express = require('express');
const Tokens = require('./auth/tokens');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors')
const querystring = require('querystring');
const userRoute = require('./api/user.router');
const { generateAcessToken, generateRefreshToken } = require('./auth/generateToken');
const googleRoute = require('./api/google.router');
const { getAllUsers } = require('./api/user.controller');
const authenticateToken = require('./auth/authenticateToken');
var cookieParser = require('cookie-parser')
const passport = require('passport');
var session = require("express-session")
// var session = require('cookie-session');
require('./config/passportConfig')

const port = process.env.PORT || 3030;

/** for Authorized origins add url here :
 * let corsOptions = { origin: 'http://127.0.0.1:5500', credentials: true }
 */

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }))
app.use(cookieParser())
app.use(session({
    secret: 'cat',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/users', userRoute);
app.use('/google', googleRoute);

// base routes
app.get('/', (req, res) => {
    res.send('This is a REST Service for authentication based on JWT for Windices')
})

app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'This is the base api enpoint'
    })
})

app.get('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401)
    if (!Tokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAcessToken({ name: user.username })
        res.json({ success: true, accessToken: accessToken })
    })
})

app.delete('/token', (req, res) => {
    Tokens = Tokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

/**
 * 
 */

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})