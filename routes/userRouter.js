const express = require('express');
const router = express.Router();
const User = require('../schemas/User');
const passport  = require('passport');

router.get('/', async (req, res)=>{
    try {
        res.send('user servlet home');
    } catch (err) {
        res.send(err);
    }
});

router.get('/search', passport.authenticate('jwt', {session: false}), async (req, res)=>{
    try {
        const result = await User.find({});
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;