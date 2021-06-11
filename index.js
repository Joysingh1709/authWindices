require('dotenv').config();
const express = require('express');
const Tokens = require('./auth/tokens');
const jwt = require('jsonwebtoken');
const app = express();
const userRoute = require('./routes/user.router');
const { generateAcessToken } = require('./auth/generateToken');

const port = 3030 || process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})