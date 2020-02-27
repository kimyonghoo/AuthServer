const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/success',function(req, res){
    console.log("^ㅇ^success^ㅇ^", res);
    return res.send("success");
});
router.get('/failed',function(req, res){
    console.log("ㅠㅠfailedㅠㅠ", res);
    return res.send("failed");
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