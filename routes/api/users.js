const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
var ObjectID = require("mongodb").ObjectID;

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    console.log(user);
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        balance: 5000,
        stocks: [],
        transactions: []
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.use("/updateStock", function(req, res, next) {

  next();
});

router.post("/updateStock", (req, res) => {
  const id = req.body.id;
  const details = { _id: new ObjectID(id) };

  // Find user by email
  User.findOne(details).then(user => {

    if (!user) {
      return res.status(404).json({ error: "Could not update" });
    }
    user.balance -= req.body.cost;
    User.updateOne(details, user, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("yay we got here");
        return res
          .status(200)
          .json({ response: "Success", balance: user.balance });
      }
    });
  });
});

router.use("/login", function(req, res, next) {
  console.log("Got this far");
  console.log(req.body);
  next();
});

router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          balance: user.balance,
          stocks: user.stocks,
          transactions: user.transactions
        };
        console.log(payload);

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 120000 // 1 year in seconds 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;

