const express   = require('express');
const router    = express.Router();
const Poll      = require('../controllers/poll');

router.post('/', Poll.create);

module.exports = router;