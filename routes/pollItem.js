const express = require('express');
const router  = express.Router();
const PollItem    = require('../controllers/pollItem');

router.post('/', PollItem.create);
router.post('/comment', PollItem.comment);

module.exports = router;