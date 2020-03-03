const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get('/success', function(req, res){
    const token = jwt.sign(req.user.email, process.env.JWT_SECRET);
    const user = req.user.email;
    return res.json({user, token});

});
router.get('/failed',function(req, res){
    res.send(req.flash('signinMessage')[0]);
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
router.get('/check', passport.authenticate('jwt', {session: false}), async (req, res)=>{
    res.send('success');
});
module.exports = router;