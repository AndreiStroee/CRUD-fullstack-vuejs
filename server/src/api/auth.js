const express = require('express');
const mongoose = require('mongoose');
// const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to users DB!'));
const router = express.Router();

router.post('/register', async (req, res) => {
  // validate
  const { error } = registerValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // check if user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email already exists!');

  // hash pass
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  // put in DB
  try {
    const savedUser = await user.save();
    res.json({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

function createTokenSendResponse(user, res) {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  // create+assign token
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' });
  res.header('token', token).json({ token, _id: user._id, email: user.email });
}

router.post('/login', async (req, res, next) => {
  try {
  // validate
    const { error } = loginValidation(req.body);
    if (error) res.status(400).send(error.details[0].message);

    // check if email already exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Unable to login!');
    // check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Email or password is wrong!');

    createTokenSendResponse(user, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
