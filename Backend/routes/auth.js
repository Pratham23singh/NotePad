const express = require('express');
const User = require("../models/User")
const router = express.Router();
const { body, validationResult } = require('express-validator'); // express validator
const bcrypt = require('bcryptjs');// bcrypt for password security
const jwt = require('jsonwebtoken');
// const { findOne } = require('../models/User');
const fetchuser = require("../middleware/fetchuser")
const JWT_SECRET = "Prashantisabadboy"


// Route 1: create a user using: post "api/auth/createuser". No login Required:
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }), //validating through express validator
  body('email', 'Enter a valid email').isEmail({ min: 5, }), //validating through express validator
  body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),//validating through express validator
], async (req, res) => {
  //If there are an error, return bad request and error:
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });//finding exesting user from server
    if (user) {
      return res.status(400).json({ error: "Sorry user of this email already Exists" })
    }

    //Using bcrypt in password for maximizing security
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)


    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })

    const data = {
      user: {
        id: user.id
      }
    }
    //implementing authtoken in createUser
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken })

    //catching an errors
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error:");
  }

})


//Route 2: Login a user using: post "api/auth/login". Login Required:

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(), //validating through express validator
  body('password', 'Password cannot be black').exists(), //validating through express validator
], async (req, res) => {
  //If there are an error, return bad request and error:
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body; //using destructuring for getting email and password from body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ email: "Please login with correct Credentials" })
    }

    //comparing entered password from server password
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ email: "Please login with correct Credentials" })
    }
    const data = {
      user: {
        id: user.id
      }
    }
    //implementing authtoken in login
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken })

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error:");
  }
})

//Route 3: getUser a user using: post "api/auth/getuser". Login Required:
router.post('/getuser', fetchuser, async (req, res) => {
  userId = req.user.id;
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error:");
  }
})
module.exports = router