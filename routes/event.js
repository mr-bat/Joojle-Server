const express = require('express');
const router  = express.Router();
const eventController    = require('../controllers/event');

router.get('/', eventController.read);
router.post('/', eventController.create);
router.put('/close', eventController.close);
router.put('/open', eventController.open);

module.exports = router;