const jwt = require('jsonwebtoken');
const express = require('express');

// Models
const { User, validate } = require('../models/user');

const router = express.Router();
 
router.post('/login', async (req, res) => {
    // validate HTTP request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // find user
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('No such user');
    }
 
    // validate the Credentials in MongoDB match
    if (req.body.password !== user.password) {
        return res.status(400).send('Incorrect email or password.');
    }
 
    // generate token
    const token = jwt.sign({ _id: user._id }, 'PrivateKey');
    res.status(200).cookie('token', token).send(user);
});
 
module.exports = router; 