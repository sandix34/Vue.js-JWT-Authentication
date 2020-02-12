const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const JWT_SECRET = require('../config/jwt');
const moment = require('moment');

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
      sub: user._id
    }, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '15min'
    });
    if (!jwtToken) {
      throw 'error while creating token';
    }
    res.status(200).json({
      user, // = user: user
      jwtToken // = jwtToken: jwtToken
    })
  } catch(e) {
    next(e);
  }
});

router.get("/refresh-token", async (req, res) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    const decodedToken = jsonwebtoken.verify(token, JWT_SECRET, {
      ignoreExpiration: true
    });
    if (moment(decodedToken.exp * 1000) > moment().subtract(7, "d")) {
      const user = await User.findById(decodedToken.sub).exec();
      const jwtToken = jsonwebtoken.sign(
        {
          sub: user._id.toString()
        },
        JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "15min"
        }
      );
      return res.status(200).json({
        user,
        jwtToken
      });
    } else {
      return res.status(403).json("token too old");
    }
  } else {
    return res.status(403).json("no token");
  }
});

module.exports = router;