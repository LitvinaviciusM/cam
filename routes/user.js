const jwt = require('jsonwebtoken');
const express = require('express');

// Models
const { User, validate } = require('../models/user');

const router = express.Router();

router.post('/create', async (req, res) => {
  // validate request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // check if such user exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('Such user already exists');
  } else {
    // insert the new user
    user = new User({
        email: req.body.email,
        password: req.body.password
    });
    await user.save();

    const token = jwt.sign({ _id: user._id }, 'PrivateKey');
    res.status(200).cookie('token', token).send(user);
  }
});

module.exports = router;