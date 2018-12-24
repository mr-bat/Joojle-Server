const express = require('express');
const router  = express.Router();
const User    = require('../controllers/user');


router.post('/sign_up', User.signUp);

router.post('/sign_in', User.signIn);

module.exports = router;