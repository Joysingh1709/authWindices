const router = require('express').Router();
const passport = require('passport');
const Tokens = require('../auth/tokens');
const querystring = require('querystring');
const { generateAcessToken,
    generateRefreshToken } = require('../auth/generateToken');

const { getUserByEmail } = require('./user.service')

router.get('/',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/callback',
    passport.authenticate('google', { scope: ['profile', 'email'], failureRedirect: 'http://127.0.0.1:5500/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        if (!req.user) res.sendStatus(403)
        console.log(req.user);

        // checking if user exists in db
        getUserByEmail({ email: req.user.emails[0].value }, (err, data) => {
            console.log(err)
            console.log(data[0])
            if (err) res.sendStatus(403)
            if (!data.length == 0) {
                const user = {
                    name: req.user.displayName,
                    email: req.user.emails[0].value,
                    ...req.user
                }
                const accessToken = generateAcessToken(user);
                const refreshToken = generateRefreshToken(user);
                Tokens.push(refreshToken);
                const query = querystring.stringify({
                    "p": req.user.provider,
                    "n": req.user.displayName,
                    "e": req.user.emails[0].value,
                    "t": accessToken,
                    "r": refreshToken
                });
                res.redirect('http://127.0.0.1:5500/success.html?' + query);
            } else {
                const query = querystring.stringify({
                    "p": req.user.provider,
                    "n": req.user.displayName,
                    "e": req.user.emails[0].value
                });
                res.redirect('http://127.0.0.1:5500/signUp.html?' + query);
            }
        });

    });

module.exports = router;