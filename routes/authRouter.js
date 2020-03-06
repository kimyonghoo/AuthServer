const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get('/success', function(req, res){
    const token = jwt.sign(req.user.email, process.env.JWT_SECRET);
    const user = req.user.email;
    const status = true;
    return res.json({status, user, token});

});
router.get('/failed',function(req, res){
    const status = false;
    const message = req.flash('signinMessage')[0];
    return res.json({status, message});
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failed',
    failureFlash: true
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/auth');
});
router.get('/check', function authenticateJwt(req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) return next(err);
        if (!user) return res.status(401).send({
            "error": {
                "code": "401",
                "message": "Authorization failed\nPlease login first"
            }
        });
        req.user = user;
        next();
    })(req, res, next);
});

module.exports = router;