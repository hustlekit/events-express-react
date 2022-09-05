const express = require('express');
const router = express.Router();

const eventsController = require('../controller/events-controller');

router.post('/', eventsController.saveEvent);

module.exports = router;