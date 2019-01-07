const express = require('express');
const router  = express.Router();
const PollItem    = require('../controllers/pollItem');

router.post('/', PollItem.create);
router.post('/comment', PollItem.comment);
router.post('/comment/fetch', PollItem.fetch);

module.exports = router;
