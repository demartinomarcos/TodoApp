const joi = require('joi');
const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router()

router.post('/signup', async (req, res) => {
  const schema = joi.object({
    name: joi.string().min(6).max(10).required(),
    password: joi.string().min(6).max(10).required()
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ name: req.body.name });
    if (user) return res.status(400).send('Username already exist');

    let { name, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    user = await new User({ name, password }).save();

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({ _id: user._id, name: user.name }, secretKey);

    res.send(token);

  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

module.exports = router;