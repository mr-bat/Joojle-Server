const express = require('express');
const router  = express.Router();
const eventController    = require('../controllers/event');

router.get('/', eventController.read);
router.post('/', eventController.create);
router.put('/', eventController.close);

module.exports = router;