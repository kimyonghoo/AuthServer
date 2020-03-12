const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get('/signInSuccess', function(req, res){
    const token = jwt.sign(req.user.email, process.env.JWT_SECRET);
    const user = req.user.email;
    const status = true;
    return res.json({status, user, token});

});
router.get('/signInfailed',function(req, res){
    const status = false;
    const message = req.flash('signinMessage')[0];
    return res.json({status, message});
});
router.get('/checkFailed',function(req, res){
    return res.status(401).send({
        "error": {
            "code": "401",
            "message": "Authorization failed\nPlease login first"
        }
    });
});
router.get('/checkSuccess',function(req, res){
    return res.send('success');
});
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/auth/signInSuccess',
    failureRedirect: '/auth/signInfailed',
    failureFlash: true
}));
router.get('/check', passport.authenticate('jwt', {
    successRedirect: '/auth/checkSuccess',
    failureRedirect: '/auth/checkFailed',
}));
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/auth');
});
module.exports = router;