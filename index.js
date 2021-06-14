require('dotenv').config();
const express = require('express');
const Tokens = require('./auth/tokens');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors')
const userRoute = require('./api/user.router');
const googleRoute = require('./api/google.router');
const { generateAcessToken } = require('./auth/generateToken');
const passport = require('passport');
var session = require("express-session")
require('./config/passportConfig')

const port = process.env.PORT || 3030;


// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json());
app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: true,
    keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());

// routes
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

app.use('/api/users', userRoute);

app.use('/google', googleRoute);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})