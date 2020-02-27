const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/success',function(req, res){
    //로그인 된 ID 정보를 전달해야 함
    // return res.send("success");
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

module.exports = router;