const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const JWT_SECRET = require('../config/jwt');

router.post('/', async (req, res, next) => {
  const body = req.body;
  try {
    const user = await User.findOne({email: body.email}).exec();
    if (!user) {
      return res.status(400).json(['user doesn\'t exist']);
    }
    const match = await bcrypt.compare(body.password, user.password);
    if (!match) {
      return res.status(400).json(['password doesn\'t match']);
    }
    const jwtToken = jsonwebtoken.sign({
      sub: user._id.toString
    }, JWT_SECRET, {
      algorithm: 'HS256'
    });
    if (!jwtToken) {
      throw 'error while creating token';
    }
    res.status(200).json({
      user, // = user: user
      jwtToken // = token: token
    })
  } catch(e) {
    next(e);
  }
});

module.exports = router;