const express = require('express');
const router = express.Router();

router.post('/sign_up', async (req, res, next) => {

  let username = req.body.username;
  let email = req.body.email;

  let user = new User({
    username,
    email
  });

  try {
    await user.save();
    res.send({
      success: true,
      message: 'User has been added successfully.'
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: 'Internal server error.'
    });
  }
});

router.post('/sign_in', async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  let user = User.find({username});
  if(password == user.password) {
    // set cookie
    res.send({
      user
    });
  }
});

module.exports = router;