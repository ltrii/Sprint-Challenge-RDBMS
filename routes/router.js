const projects = require('./projectRouter');
const actions = require('./actionRouter');
const express = require('express');
const router = express.Router();

router.use('/api/projects/', projects);
router.use('/api/actions/', actions);

module.exports = router;