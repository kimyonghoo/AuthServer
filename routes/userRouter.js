const express = require('express');
const router = express.Router();
const User = require('../schemas/User');

router.get('/', async (req, res)=>{
    try {
        res.send('user servlet home');
    } catch (err) {
        res.send(err);
    }
});

router.get('/search', async (req, res)=>{
    try {
        const result = await User.find({});
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;