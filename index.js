require('dotenv').config();
const express = require('express');
// const nodemailer = require("nodemailer");
const app = express();

//route imports
const userRoute = require('./routes/user.router');

const port = 3030 || process.env.PORT;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('This is a REST Service for authentication based on JWT for Windices')
})

app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'This is the /api enpoint'
    })
})

app.use('/api/users', userRoute);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})