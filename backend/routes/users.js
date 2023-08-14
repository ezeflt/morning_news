var express = require('express'); // require express library
var router = express.Router(); // is used to create routes

require('../models/connection'); 
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');     // is used to generate a token
const bcrypt = require('bcrypt');  // is used to hash the password


/**
 * Description :
 * register the user to database
 * 
 * @param {any} req require the user datas
 * @param {any} res is the route response in json format
 */
router.post('/signup', (req, res) => {

  // if user data is empty, stop the function
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hash,
        token: uid2(32),
        canBookmark: true,
      });
      // save the user to the database, then send the token
      newUser.save().then(newDoc => res.json({ result: true, token: newDoc.token }) );
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

/**
 * Description :
 * login the user to database
 * 
 * @param {any} req require the user datas
 * @param {any} res is the route response in json format
 */
router.post('/signin', (req, res) => {

  // if user data is empty, stop the function
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // check if the user already exists
  User.findOne({ username: req.body.username }).then(data => {
    // compare the require password with the password hash
    if (data && bcrypt.compareSync(req.body.password, data.password)) {

      // send the token
      res.json({ result: true, token: data.token }); 
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

/**
 * Description :
 * GET the user bookmarks by user token
 * 
 * @param {any} req require user token
 * @param {any} res is the route response in json format
 */
router.get('/canBookmark/:token', (req, res) => {
  User.findOne({ token: req.params.token }).then(data => {
    if (data) {
      res.json({ result: true, canBookmark: data.canBookmark });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});

module.exports = router;
