var GoogleStrategy = require('passport-google-oauth20').Strategy;
const { create, getUserByName } = require('../api/user.service');
const passport = require('passport');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback"
},
    function (accessToken, refreshToken, profile, next) {
        getUserByName({ name: profile.displayName }, (err, data) => {
            if (data.length !== 0) {
                u = { user: data[0], Googleprofile: profile, accessToken: accessToken, refreshToken: refreshToken };
                return next(err, u);
            } else {
                create({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value }, (err, user) => {
                    console.log(err, accessToken, refreshToken);
                    u = { user: user, Googleprofile: profile, accessToken: accessToken, refreshToken: refreshToken };
                    return next(err, u);
                });
            }
        })
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});