var GoogleStrategy = require('passport-google-oauth20').Strategy;
const { create, getUserByEmail } = require('../api/user.service');
const passport = require('passport');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback"
},
    function (accessToken, refreshToken, profile, next) {
        // getUserByEmail({ email: profile.emails[0].value }, (err, data) => {
        // create({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value }, (err, user) => {
        //     console.log(err);
        return next(null, profile);
        // });
        // })
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});