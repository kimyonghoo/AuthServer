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
/*
router.get('/check', function (req, res){
    // read the token from header or url 
    const token = req.headers['x-access-token'] || req.query.token

    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if token is valid, it will respond with its info
    const respond = (token) => {
        res.json({
            success: true,
            info: token
        })
    }

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then(respond).catch(onError)
});
*/
router.get('/check', passport.authenticate('jwt-check',{
    successRedirect: '/auth/check/success',
    failureRedirect: '/auth/check/failed',
    failureFlash: true
}));
router.get('/check/success',function(req, res){
    console.log('hi');

});
module.exports = router;