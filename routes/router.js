const projects = require('./projectRouter');
const actions = require('./actionRouter');
const express = require('express');
const router = express.Router();

router.use('/', projects);
router.use('/', actions);

module.exports = router;