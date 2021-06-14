const router = require('express').Router();
const passport = require('passport');

router.get('/',
    passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline', approvalPrompt: 'force' })
);

router.get('/callback',
    passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline', approvalPrompt: 'force', failureRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log("Successfull login with google auth")
        res.redirect('/google/success');
    });

router.get('/success', isLoggedIn, (req, res) => {
    res.send("Successfully logged in");
    console.log(req.user);
    console.log("Email : ", req.user.Googleprofile.emails[0]);
})

router.get('/logout', (req, res) => {
    console.log("LOGGED OUT");
    req.session = null;
    req.logout()
    res.redirect('/')
})

function isLoggedIn(req, res, next) {
    if (req.user) { next() } else { res.sendStatus(401) }
}

module.exports = router;