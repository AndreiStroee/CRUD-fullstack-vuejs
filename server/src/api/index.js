/* eslint-disable linebreak-style */
const express = require('express');

const emojis = require('./emojis');
const tickets = require('./tickets');
const auth = require('./auth');
const users = require('./users');
const middlewares = require('../middlewares');

const { verifyToken } = middlewares;
const { isAdmin } = middlewares.isAdmin;

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/auth', auth);
router.use('/tickets', tickets);
router.use('/users', users);

module.exports = router;
