const express   = require('express');
const router    = express.Router();
const Poll      = require('../controllers/poll');

router.post('/', Poll.create);
router.post('/vote', Poll.vote);

module.exports = router;